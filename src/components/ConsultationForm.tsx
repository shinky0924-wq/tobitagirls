/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { HERO_IMAGE_URL, LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { submitConsultation } from '../firebase';

interface ConsultationFormProps {
  content: SiteContent['consultation'];
  initialMessage?: string;
  onClearInitialMessage?: () => void;
}

export default function ConsultationForm({ content, initialMessage, onClearInitialMessage }: ConsultationFormProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tab control: 'line' (Copy template / LINE official link) or 'form' (Direct submit to Firestore)
  const [activeTab, setActiveTab] = useState<'line' | 'form'>('line');

  // Direct submit form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const defaultTemplate = `${content.templateText}${initialMessage ? '\n' + initialMessage : ''}`;

  useEffect(() => {
    setMessage(defaultTemplate);
  }, [defaultTemplate]);

  useEffect(() => {
    if (initialMessage) {
      // Scroll to consultation section smoothly when there's an initial message (like salary simulation)
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // If we receive an initial message, auto-switch to direct form to make editing the message easier
      setActiveTab('form');
    }
  }, [initialMessage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onClearInitialMessage) {
        onClearInitialMessage();
      }
    });
  };

  const handleSubmitDirectForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSubmitError('お名前（ニックネーム可）を入力してください。');
      return;
    }
    if (!contact.trim()) {
      setSubmitError('返信用のご連絡先（LINE ID、電話番号、またはメール）を入力してください。');
      return;
    }
    if (!message.trim()) {
      setSubmitError('ご相談内容を入力してください。');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      await submitConsultation({
        name: name.trim(),
        age: age.trim(),
        contact: contact.trim(),
        message: message.trim()
      });
      setSubmitted(true);
      setName('');
      setAge('');
      setContact('');
      setMessage(defaultTemplate);
      if (onClearInitialMessage) {
        onClearInitialMessage();
      }
    } catch (err) {
      console.error(err);
      setSubmitError('送信中にエラーが発生しました。時間を置いて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-surface-container overflow-hidden" 
      id="consultation"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE_URL} 
          alt="飛田ガールズ 求人案内背景" 
          className="w-full h-full object-cover opacity-15"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-2">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-4xl text-on-surface mb-4 md:mb-6 leading-tight break-words whitespace-pre-line">
            {content.title}
          </h2>
          <p className="font-sans text-xs md:text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
            {content.description}
          </p>
        </div>

        {/* Consultation Container Box */}
        <div className="max-w-md mx-auto bg-white border border-rose-100 rounded-3xl md:rounded-[32px] shadow-xl p-6 md:p-8 text-center" id="consultation-wizard">
          
          {/* Tab Selection */}
          <div className="flex bg-rose-50/50 p-1.5 rounded-2xl mb-6">
            <button
              onClick={() => setActiveTab('line')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'line'
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-secondary/80 hover:text-secondary font-medium'
              }`}
              type="button"
            >
              <LucideIcon name="MessageCircle" size={16} />
              LINE・テンプレート
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-secondary/80 hover:text-secondary font-medium'
              }`}
              type="button"
            >
              <LucideIcon name="Send" size={16} />
              WEBフォームで送信
            </button>
          </div>

          {activeTab === 'line' ? (
            <div className="space-y-6">
              {/* Copy Helper Section (Top) */}
              <div className="space-y-4">
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-center">
                  <p className="text-xs text-zinc-600 font-bold mb-1">
                    {content.badgeText}
                  </p>
                  <p className="text-xs text-zinc-500 font-medium mb-3 whitespace-pre-line">
                    {content.copySubtitle}
                  </p>
                  
                  <div className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-4 text-left font-sans text-sm text-zinc-700 select-all mb-4 relative shadow-sm leading-relaxed whitespace-pre-wrap">
                    {defaultTemplate}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      copied 
                        ? 'bg-rose-50 text-secondary border border-rose-100' 
                        : 'bg-zinc-950 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <LucideIcon name={copied ? 'Check' : 'Copy'} size={16} />
                    <span>{copied ? 'コピー完了しました！' : content.copyButtonText}</span>
                  </button>
                </div>
              </div>

              {/* LINE CTA Button (Bottom) */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-secondary flex items-center justify-center gap-1">
                  <span>{content.lineBadgeText}</span>
                </p>
                
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full font-sans font-extrabold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer text-white bg-[#06c755] hover:bg-[#05b34c] hover:shadow-[#06c755]/40 hover:-translate-y-0.5 shadow-[#06c755]/30 text-base md:text-lg"
                >
                  <LucideIcon name="MessageCircle" className="fill-white text-white w-6 h-6" size={24} />
                  <span>{content.lineButtonText}</span>
                </a>
                <p className="text-[10px] text-gray-400 font-medium whitespace-pre-line">
                  {content.lineSubtitle}
                </p>
              </div>
            </div>
          ) : (
            /* Direct Web Form */
            <form onSubmit={handleSubmitDirectForm} className="text-left space-y-4">
              {submitted ? (
                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-rose-100 text-secondary rounded-full flex items-center justify-center mx-auto">
                    <LucideIcon name="Heart" className="fill-secondary text-secondary" size={24} />
                  </div>
                  <h3 className="font-bold text-secondary text-sm md:text-base">ご相談ありがとうございます！</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    お送りいただいたご相談は Firebase データベースへ安全に保存されました。<br />
                    内容を確認後、サポートスタッフよりご指定の連絡先へ折り返しご連絡させていただきます。
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-secondary hover:underline cursor-pointer"
                  >
                    新しく別の相談を送信する
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">お名前（ニックネーム可） <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="例: はなこ"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">ご年齢</label>
                      <input
                        type="text"
                        placeholder="例: 22歳"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">返信用ご連絡先 <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="LINE ID、電話、メール等"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">ご相談・ご質問内容 <span className="text-rose-500">*</span></label>
                    <textarea
                      rows={4}
                      required
                      placeholder="「本当に安全？」「月〇万円くらい稼ぎたい」「身バレが心配」など、何でもお気軽に記入してください！"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                      <LucideIcon name="AlertCircle" size={14} className="shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 bg-secondary hover:bg-opacity-95 text-white font-bold rounded-2xl text-sm shadow-md shadow-secondary/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>送信中...</span>
                      </>
                    ) : (
                      <>
                        <LucideIcon name="Send" size={16} />
                        <span>この内容で無料相談を送信する</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          )}

          <p className="text-center text-[10px] text-gray-400 font-medium mt-6 whitespace-pre-line">
            {content.privacyNote}
          </p>

        </div>

      </div>
    </section>
  );
}
