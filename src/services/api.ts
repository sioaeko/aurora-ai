import { Message, Model } from '../types';

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class ApiService {
  private apiKey: string;
  private abortController: AbortController | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  private getErrorMessage(error: any): string {
    // API 키 관련 에러
    if (error?.status === 401) {
      return 'API 키가 유효하지 않습니다.';
    }
    
    // 레이트 리밋 에러
    if (error?.status === 429) {
      return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    }

    // 기본 에러 메시지
    return '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }

  public async streamChat(
    messages: Message[],
    model: Model,
    onUpdate: (content: string) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    this.abortController = new AbortController();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({
          model,
          messages: messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          stream: true,
          temperature: 0.7,
          max_tokens: 4096
        }),
        signal: this.abortController.signal
      });

      if (!response.ok) {
        const error = new Error(this.getErrorMessage({ status: response.status }));
        throw error;
      }

      if (!response.body) {
        throw new Error('응답을 받을 수 없습니다.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onUpdate(content);
            }
          } catch (e) {
            console.error('Failed to parse stream data');
          }
        }
      }

      if (buffer) {
        const line = buffer.trim();
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const parsed = JSON.parse(line.slice(6));
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onUpdate(content);
            }
          } catch (e) {
            console.error('Failed to parse stream data');
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        onError(error);
      }
    } finally {
      this.abortController = null;
    }
  }
}