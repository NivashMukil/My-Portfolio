import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { Toast } from './Toast';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_9v42ibp';
const EMAILJS_TEMPLATE_ID = 'template_bykkc8n';
const EMAILJS_PUBLIC_KEY = 'mjTCjTa2KJlbe0CxO';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setToastType('error');
      setToastMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject || 'Portfolio Contact Form Message',
          message: formData.message,
          time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
        EMAILJS_PUBLIC_KEY
      );

      setToastType('success');
      setToastMessage('Message sent successfully! I will get back to you within 24 hours. 🎉');
      setFormData({ name: '', email: '', subject: '', message: '' });

      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#3B82F6', '#06B6D4', '#22C55E']
      });
    } catch (error) {
      setToastType('error');
      setToastMessage('Failed to send message. Please try emailing directly at nivash1912004@gmail.com');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      setToastType('success');
      setToastMessage('Email address copied to clipboard!');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      setToastType('success');
      setToastMessage('Phone number copied to clipboard!');
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Available for full-time Data Analyst, Power BI Developer, and Python Developer roles.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Contact Info Column */}
          <div className="lg:col-span-5 space-y-6 text-left">

            {/* Direct Info Card */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">
                Contact Details
              </h3>

              {/* Email item */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Email</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone item */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Phone</div>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs sm:text-sm font-bold text-slate-200 hover:text-blue-400 transition-colors">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location item */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Location</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Profiles Card */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-4">Official Profiles</h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-3 text-slate-200 font-semibold text-xs transition-all hover:scale-105 hover:border-cyan-500/50"
                >
                  <GithubIcon className="w-5 h-5 text-cyan-400" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={`https://${PERSONAL_INFO.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-3 text-slate-200 font-semibold text-xs transition-all hover:scale-105 hover:border-blue-500/50"
                >
                  <LinkedinIcon className="w-5 h-5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              {/* Live email badge */}
              <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
                <span className="text-xs font-semibold text-emerald-400">
                  Live Contact Form — Messages delivered directly to inbox
                </span>
              </div>
            </div>

          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Fill out the form below — your message will be delivered directly to my inbox within seconds.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-slate-100 text-sm focus:outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-slate-100 text-sm focus:outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opportunity for Data Analyst Role"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-slate-100 text-sm focus:outline-none transition-colors placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-slate-100 text-sm focus:outline-none transition-colors resize-none placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </section>
  );
};
