import React, { useState } from 'react';
import { Sparkles, Loader2, FileText, ChevronRight, BookOpen } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from 'react-i18next';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function Assistant() {
  const [prompt, setPrompt] = useState('');
  const [taskType, setTaskType] = useState('topic'); // topic, structure, methodology
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    setResult('');

    try {
      let systemInstruction = '';
      let userPrompt = '';
      const langInstruction = i18n.language.startsWith('fr') 
        ? 'You must respond entirely in French.' 
        : 'You must respond entirely in English.';

      if (taskType === 'topic') {
        systemInstruction = `You are an expert academic advisor. Help the student generate 3 specific, researchable thesis topics based on their keywords. For each topic, provide a brief problem statement and research question. ${langInstruction}`;
        userPrompt = `Generate research topics related to: ${prompt}`;
      } else if (taskType === 'structure') {
        systemInstruction = `You are a thesis supervisor. Provide a detailed, standard 5-chapter thesis structure (Introduction, Literature Review, Methodology, Results, Conclusion) tailored to the provided topic. ${langInstruction}`;
        userPrompt = `Create a thesis structure for the topic: ${prompt}`;
      } else if (taskType === 'methodology') {
        systemInstruction = `You are a research methodology expert. Explain the best research methodology (qualitative, quantitative, or mixed) for the given topic, including data collection and analysis methods. ${langInstruction}`;
        userPrompt = `Suggest and explain a research methodology for: ${prompt}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      setResult(response.text || 'No content generated.');
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setError(t('assistant.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Sparkles className="w-8 h-8 text-[#D4AF37] mr-3" />
          {t('assistant.title')}
        </h1>
        <p className="text-gray-500 mt-2">{t('assistant.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('assistant.helpQuestion')}</h2>
            
            <div className="space-y-3 mb-6">
              {[
                { id: 'topic', label: t('assistant.generateTopics'), icon: Sparkles },
                { id: 'structure', label: t('assistant.createStructure'), icon: FileText },
                { id: 'methodology', label: t('assistant.explainMethodology'), icon: BookOpen },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTaskType(type.id)}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all text-left ${
                    taskType === type.id 
                      ? 'border-[#003366] bg-blue-50 text-[#003366]' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <type.icon className={`w-5 h-5 mr-3 ${taskType === type.id ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{type.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {taskType === 'topic' ? t('assistant.enterKeywords') : t('assistant.enterTopic')}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={taskType === 'topic' ? t('assistant.placeholderKeywords') : t('assistant.placeholderTopic')}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent resize-none h-32 text-sm"
              />
            </div>

            <button
              onClick={generateContent}
              disabled={loading || !prompt.trim()}
              className="w-full mt-4 bg-[#003366] text-white py-3 rounded-xl font-medium hover:bg-[#004080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('assistant.generatingBtn')}
                </>
              ) : (
                <>
                  {t('assistant.generateBtn')} <ChevronRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{t('assistant.result')}</h2>
              {result && (
                <button className="text-sm text-[#003366] font-medium hover:underline bg-blue-50 px-3 py-1 rounded-full">
                  {t('assistant.saveToDashboard')}
                </button>
              )}
            </div>

            {error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
                {error}
              </div>
            ) : result ? (
              <div className="prose prose-blue max-w-none text-gray-700 text-sm md:text-base whitespace-pre-wrap">
                {result}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-gray-300" />
                </div>
                <p className="max-w-sm">{t('assistant.emptyState')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
