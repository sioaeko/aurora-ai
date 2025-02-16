import React from 'react';
import { Message } from '../types';
import { Bot, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ChatMessageProps {
  message: Message;
  isThinking?: boolean;
  userProfileImage?: string;
  assistantProfileImage?: string;
}

export function ChatMessage({ message, isThinking = false, userProfileImage, assistantProfileImage }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  
  return (
    <div className={`group w-full text-gray-100 border-b border-gray-800/50 ${
      isUser ? 'bg-transparent' : 'bg-gray-800/30 backdrop-blur-sm'
    }`}>
      <div className="max-w-3xl mx-auto py-4 lg:py-6 flex gap-4 lg:gap-6 px-3 lg:px-0">
        <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
          isUser ? 'bg-violet-500/80' : 'bg-teal-500/80'
        }`}>
          {isUser ? (
            userProfileImage ? (
              <img src={userProfileImage} alt="User" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            )
          ) : (
            assistantProfileImage ? (
              <img src={assistantProfileImage} alt="Assistant" className="w-full h-full object-cover" />
            ) : (
              <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            )
          )}
        </div>
        <div className="min-h-[20px] flex-1 relative">
          {!isUser && !isThinking && (
            <button
              onClick={handleCopy}
              className={`absolute right-0 top-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-700/50 transition-all duration-200 ${
                copied ? 'text-green-400' : 'text-gray-400 hover:text-gray-300'
              }`}
              aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <Check className="w-4 h-4 lg:w-5 lg:h-5" />
              ) : (
                <Copy className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
            </button>
          )}
          <div className="prose prose-invert max-w-none">
            {isUser ? (
              message.content.split('\n').map((line, i) => (
                line.trim() ? (
                  <p key={i} className="mb-3 last:mb-0 text-[13px] lg:text-[15px] leading-6 lg:leading-7">
                    {line}
                  </p>
                ) : null
              ))
            ) : isThinking ? (
              <div className="flex items-center gap-2 text-[13px] lg:text-[15px] text-gray-400">
                <span>생각하는 중</span>
                <span className="inline-flex gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            ) : (
              <div className="text-[13px] lg:text-[15px] leading-6 lg:leading-7">
                {message.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-3 last:mb-0">{children}</p>
                      ),
                      a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">
                          {children}
                        </a>
                      ),
                      code: ({ inline, children }) => (
                        inline ? (
                          <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-[12px] lg:text-[14px] text-violet-200">
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-800/50 p-3 lg:p-4 rounded-lg overflow-x-auto">
                            <code className="text-[12px] lg:text-[14px] text-violet-200">
                              {children}
                            </code>
                          </pre>
                        )
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-4 mb-3 space-y-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-4 mb-3 space-y-1">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-[13px] lg:text-[15px]">{children}</li>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-xl lg:text-2xl font-bold mb-3 mt-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg lg:text-xl font-bold mb-3 mt-4">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base lg:text-lg font-bold mb-2 mt-3">{children}</h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-violet-400/50 pl-3 italic text-gray-300 mb-3">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto mb-3">
                          <table className="min-w-full border-collapse">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-gray-700 px-4 py-2 bg-gray-800/50 font-medium">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-gray-700 px-4 py-2">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : null}
                {isThinking && (
                  <span className="inline-block w-1 h-4 bg-violet-400 animate-pulse ml-0.5" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}