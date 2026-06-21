import React, { useState } from 'react';
import { useLeadData } from '../context/LeadDataContext';
import { servicesData, brandsData } from '../data/seoData';
import confetti from 'canvas-confetti';
import { ShieldCheck, Check, Sparkles, Loader2, UploadCloud } from 'lucide-react';

interface LeadFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, compact = false }) => {
  const { addLead } = useLeadData();

  // Form Fields State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Wichita');
  const [zip, setZip] = useState('');
  const [applianceType, setApplianceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8AM - 12PM)');
  const [referralSource, setReferralSource] = useState<'Google Ads' | 'Facebook' | 'Organic' | 'Referral'>('Organic');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [verifyingTurnstile, setVerifyingTurnstile] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerTurnstileSim = () => {
    if (turnstileVerified || verifyingTurnstile) return;
    setVerifyingTurnstile(true);
    setTimeout(() => {
      setVerifyingTurnstile(false);
      setTurnstileVerified(true);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileVerified) {
      alert('Please verify you are a human via the security check.');
      return;
    }

    setIsSubmitting(true);

    // Simulate Network Request
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Submit to Context
    addLead({
      name,
      phone,
      email,
      address,
      city,
      zip,
      applianceType: applianceType || 'Other Appliance',
      brand: brand || 'Other Brand',
      model: model || 'N/A',
      problemDescription,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime,
      referralSource,
      photoUrl: photoPreview || undefined
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    // Confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0B2E59', '#D62828', '#FFFFFF', '#CCCCCC']
    });

    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-slate-100 rounded-3xl shadow-xl min-h-[350px]">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h3 className="text-2xl font-bold font-heading text-primary uppercase tracking-wider mb-2">Booking Confirmed!</h3>
        <p className="text-slate-600 max-w-sm mb-6 text-sm">
          Thank you, <span className="font-semibold text-slate-800">{name}</span>! Your request for <span className="font-semibold text-slate-800">{applianceType} repair</span> has been logged.
        </p>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-left w-full text-slate-500 space-y-2">
          <div><span className="font-bold text-slate-700">Preferred Date:</span> {preferredDate}</div>
          <div><span className="font-bold text-slate-700">Preferred Slot:</span> {preferredTime}</div>
          <div className="text-center text-[10px] text-accent font-semibold pt-1 border-t border-slate-200 mt-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 animate-pulse" /> Instant confirmation SMS/Email sent to {phone}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary"></div>
      
      {!compact && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold font-heading text-primary uppercase tracking-wider">Schedule Service</h3>
          <p className="text-xs text-slate-500 mt-1">Book in 60 seconds. Same-day appointments available for bookings before 12 PM.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Your Name *</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Phone Number *</label>
          <input
            type="tel"
            required
            placeholder="(316) 555-0199"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Street Address *</label>
          <input
            type="text"
            required
            placeholder="123 Maple St"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">City *</label>
          <select
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            <option value="Wichita">Wichita</option>
            <option value="Derby">Derby</option>
            <option value="Andover">Andover</option>
            <option value="Bel Aire">Bel Aire</option>
            <option value="Park City">Park City</option>
            <option value="Maize">Maize</option>
            <option value="Goddard">Goddard</option>
            <option value="Haysville">Haysville</option>
            <option value="Valley Center">Valley Center</option>
            <option value="Augusta">Augusta</option>
            <option value="Mulvane">Mulvane</option>
            <option value="Clearwater">Clearwater</option>
            <option value="Rose Hill">Rose Hill</option>
            <option value="Kechi">Kechi</option>
            <option value="Colwich">Colwich</option>
          </select>
        </div>

        {/* ZIP */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">ZIP Code *</label>
          <input
            type="text"
            required
            placeholder="67202"
            maxLength={5}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={zip}
            onChange={e => setZip(e.target.value)}
          />
        </div>

        {/* Appliance Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Appliance Type *</label>
          <select
            required
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={applianceType}
            onChange={e => setApplianceType(e.target.value)}
          >
            <option value="">-- Select Appliance --</option>
            {servicesData.map(s => (
              <option key={s.id} value={s.name.replace(' Repair', '')}>{s.name.replace(' Repair', '')}</option>
            ))}
            <option value="Other">Other / Not Listed</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Brand *</label>
          <select
            required
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          >
            <option value="">-- Select Brand --</option>
            {brandsData.map(b => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
            <option value="Other">Other / Not Listed</option>
          </select>
        </div>

        {/* Model Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Model Number (Optional)</label>
          <input
            type="text"
            placeholder="e.g. RF28R7351SG"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Preferred Date *</label>
          <input
            type="date"
            required
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={preferredDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => setPreferredDate(e.target.value)}
          />
        </div>

        {/* Preferred Time Slot */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Preferred Time *</label>
          <select
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={preferredTime}
            onChange={e => setPreferredTime(e.target.value)}
          >
            <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
            <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
            <option value="Emergency (ASAP Same-day)">Emergency (ASAP Same-day)</option>
          </select>
        </div>

        {/* Referral Source */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">How did you find us?</label>
          <select
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
            value={referralSource}
            onChange={e => setReferralSource(e.target.value as any)}
          >
            <option value="Organic">Google Search (Organic)</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Facebook">Facebook / Social</option>
            <option value="Referral">Friend / Family Referral</option>
          </select>
        </div>
      </div>

      {/* Problem Description */}
      <div className="mt-4">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Describe the Issue *</label>
        <textarea
          required
          rows={3}
          placeholder="Please describe symptoms (e.g. leaking, clicking noise, no heating...)"
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          value={problemDescription}
          onChange={e => setProblemDescription(e.target.value)}
        />
      </div>

      {/* Photo Upload Container */}
      <div className="mt-4">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Upload Appliance Photo (Optional)</label>
        <div className="border border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition relative">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handlePhotoChange}
          />
          {photoPreview ? (
            <div className="flex items-center gap-3">
              <img src={photoPreview} alt="Appliance" className="w-12 h-12 object-cover rounded-lg border border-slate-100" />
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-800">{photo?.name}</p>
                <p className="text-[10px] text-slate-400">{(photo!.size / 1024).toFixed(1)} KB — Click/Drag to swap</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-400">
              <UploadCloud className="w-6 h-6 stroke-[1.5]" />
              <p className="text-xs font-medium">Click or Drag photo of error code / appliance label</p>
              <p className="text-[9px] text-slate-300">Supports PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Cloudflare Turnstile Spam Shield */}
      <div className="mt-6 flex justify-center md:justify-start">
        <div 
          onClick={triggerTurnstileSim}
          className={`flex items-center justify-between border rounded-lg p-3 w-[300px] select-none transition ${
            turnstileVerified 
              ? 'border-green-200 bg-green-50/50' 
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50 cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-3">
            {verifyingTurnstile ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : turnstileVerified ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 border-2 border-slate-300 rounded hover:border-slate-400 transition" />
            )}
            <span className="text-xs font-medium text-slate-600">
              {verifyingTurnstile 
                ? 'Verifying system...' 
                : turnstileVerified 
                  ? 'Verifed Human' 
                  : 'Verify you are human'}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-bold text-primary tracking-tighter">TURNSTILE</span>
            </div>
            <span className="text-[7px] text-slate-400">Privacy & Terms</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent-dark text-white font-heading text-lg font-bold tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-150 uppercase mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...
          </>
        ) : (
          <>
            Book Repair Slot Now
          </>
        )}
      </button>
    </form>
  );
};
export default LeadForm;
