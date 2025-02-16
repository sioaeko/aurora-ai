import { ChevronDown, Brain, Eye, FileText, Star, Cpu, Code, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Model } from '../types';

interface ModelSelectProps {
  model: Model;
  onModelChange: (model: Model) => void;
}

const MODEL_OPTIONS = [
  {
    value: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    description: { ko: '다목적 대형 언어 모델', en: 'Versatile large language model' },
    icon: Brain,
    gradient: 'from-[#FF6B6B] to-[#845EC2]',
    performance: '70B',
    tag: { text: 'Recommended', color: 'text-emerald-400' }
  },
  {
    value: 'qwen-2.5-32b',
    name: 'Qwen 2.5 32B',
    description: { ko: '강력한 다국어 지원', en: 'Powerful multilingual support' },
    icon: Star,
    gradient: 'from-[#4FACFE] to-[#00F2FE]',
    performance: '32B',
    tag: { text: 'New', color: 'text-blue-400' }
  },
  {
    value: 'qwen-2.5-coder-32b',
    name: 'Qwen Coder 32B',
    description: { ko: '코딩 특화 모델', en: 'Specialized in coding' },
    icon: Code,
    gradient: 'from-[#00C6FB] to-[#005BEA]',
    performance: '32B',
    tag: { text: 'New', color: 'text-blue-400' }
  },
  {
    value: 'deepseek-r1-distill-qwen-32b',
    name: 'DeepSeek Qwen 32B',
    description: { ko: '최적화된 Qwen 모델', en: 'Optimized Qwen model' },
    icon: Zap,
    gradient: 'from-[#FA709A] to-[#FEE140]',
    performance: '32B'
  },
  {
    value: 'deepseek-r1-distill-llama-70b',
    name: 'DeepSeek Llama 70B',
    description: { ko: '최적화된 Llama 모델', en: 'Optimized Llama model' },
    icon: Sparkles,
    gradient: 'from-[#F6D365] to-[#FDA085]',
    performance: '70B'
  },
  {
    value: 'llama-3.3-70b-specdec',
    name: 'Llama 3.3 SpecDec',
    description: { ko: '특화된 추론 능력', en: 'Specialized deduction capabilities' },
    icon: Brain,
    gradient: 'from-[#00C9A7] to-[#845EC2]',
    performance: '70B'
  },
  {
    value: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    description: { ko: '초장문 처리 전문', en: 'Long context specialist' },
    icon: FileText,
    gradient: 'from-[#2C73D2] to-[#845EC2]',
    performance: '32K Context'
  },
  {
    value: 'gemma2-9b-it',
    name: 'Gemma 2',
    description: { ko: 'IT 특화 모델', en: 'IT specialized model' },
    icon: Cpu,
    gradient: 'from-[#FF9671] to-[#845EC2]',
    performance: '9B'
  }
];

export function ModelSelect({ model, onModelChange }: ModelSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [language] = useState<'ko' | 'en'>('ko');
  const currentModel = MODEL_OPTIONS.find(opt => opt.value === model);
  const Icon = currentModel?.icon || Brain;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-200"
      >
        <div className={`relative w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-r ${currentModel?.gradient} p-[2px]`}>
          <div className="absolute inset-0 rounded-[4px] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-200">
              {currentModel?.name}
            </span>
            {currentModel?.tag && (
              <span className={`text-[9px] font-medium ${currentModel.tag.color} bg-white/5 px-1.5 py-0.5 rounded-full`}>
                {currentModel.tag.text}
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400">
            {currentModel?.performance}
          </span>
        </div>
        
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 ml-1 transition-transform duration-200 group-hover:text-gray-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 mt-1 p-2 w-[300px] bg-gray-900/95 backdrop-blur-sm border border-gray-800/50 rounded-xl shadow-2xl z-40">
            <div className="px-2 py-1.5 mb-1">
              <h3 className="text-xs font-medium text-gray-400">
                {language === 'ko' ? '모델 선택' : 'Select Model'}
              </h3>
            </div>
            
            <div className="space-y-1 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
              {MODEL_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = model === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      onModelChange(option.value as Model);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-start gap-3 p-2.5 rounded-lg transition-all duration-200
                      ${isSelected ? 'bg-gray-800/50' : 'hover:bg-gray-800/30'}
                      relative group
                    `}
                  >
                    <div className={`relative w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-r ${option.gradient} p-[3px]`}>
                      <div className="absolute inset-0 rounded-[6px] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-200">
                          {option.name}
                        </span>
                        {option.tag && (
                          <span className={`text-[10px] font-medium ${option.tag.color} bg-white/5 px-1.5 py-0.5 rounded-full`}>
                            {option.tag.text}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {option.description[language]}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-500 bg-gray-800/50 px-1.5 py-0.5 rounded-full">
                          {option.performance}
                        </span>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gradient-to-b from-[#0EA5E9] to-[#6366F1] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}