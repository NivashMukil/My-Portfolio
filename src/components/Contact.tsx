import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { Toast } from './Toast';

const EMAILJS_SERVICE_ID = 'service_9v42ibp';
const EMAILJS_TEMPLATE_ID = 'template_bykkc8n';
const EMAILJS_PUBLIC_KEY = 'mjTCjTa2KJlbe0CxO';

const CONTACT_INFO = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.2)',
    copyable: 'email' as const,
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone}`,
    color: '#34D399',
    glow: 'rgba(52,211,153,0.2)',
    copyable: 'phone' as const,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: PERSONAL_INFO.location,
    href: null,
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.2)',
    copyable: null,
  },
];

export const Contact = () => {
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
      setToastMessage('Message sent! I will get back to you within 24 hours. 🎉');
      setFormData({ name: '', email: '', subject: '', message: '' });
      confetti({ particleCount: 80, spread: 65, origin: { y: 0.7 }, colors: ['#38BDF8', '#818CF8', '#A855F7'] });
    } catch {
      setToastType('error');
      setToastMessage('Failed to send. Please email directly at nivash1912004@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); }
    else { setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000); }
    setToastType('success');
    setToastMessage(`${type === 'email' ? 'Email address' : 'Phone number'} copied!`);
  };

  return (
    <section id="contact" className="py-28 relative z-10">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-[500px] h-[400px] bg-cyan-600/5 blur-[120px]" />
        <div className="absolute right-0 top-0 w-[400px] h-[300px] bg-purple-600/5 blur-[100px]" />
        {/* Particle dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulseGlow ${2 + Math.random() * 3}s ${Math.random() * 2}s ease-in-out infinite`,
            }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" style={{ animation: 'slideInUp 0.7s ease-out both' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Let's Work <span className="text-gradient-cyan">Together</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-xl mx-auto">
            Available for full-time Data Analyst, Power BI Developer, and Python Developer roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── LEFT: Info Panel ── */}
          <div className="lg:col-span-5 space-y-5">
            {/* Contact info cards */}
            {CONTACT_INFO.map((info, i) => (
              <div key={i}
                className="glass-card rounded-2xl p-5 border hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
                style={{ borderColor: `${info.color}22` }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: info.glow }} />
                <div className="relative flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${info.color}15`, border: `1px solid ${info.color}30`, color: info.color }}>
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-sm font-medium text-white hover:text-cyan-400 transition-colors truncate block">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-white">{info.value}</span>
                    )}
                  </div>
                  {info.copyable && (
                    <button
                      onClick={() => copyToClipboard(info.value, info.copyable!)}
                      className="p-2 rounded-lg glass-card text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      {(info.copyable === 'email' ? copiedEmail : copiedPhone)
                        ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                        : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Connect With Me</p>
              <div className="grid grid-cols-2 gap-3">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
                  className="btn-ghost flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 justify-center group">
                  <GithubIcon className="w-4 h-4 group-hover:text-white" />
                  GitHub
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
                  className="btn-ghost flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 justify-center group">
                  <LinkedinIcon className="w-4 h-4 group-hover:text-blue-400" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-3">
                <div className="relative w-3 h-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">Available Now</p>
                  <p className="text-xs text-slate-400">Open to immediate opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <div className="lg:col-span-7">
            <div className="glass-card-strong rounded-3xl p-8 border border-cyan-500/12 relative overflow-hidden holographic">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/8 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/8 to-transparent rounded-full blur-3xl" />

              <h3 className="text-lg font-bold text-white mb-2 relative">Send a Message</h3>
              <p className="text-sm text-slate-400 mb-8 relative">I typically respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
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
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}
    </section>
  );
};
