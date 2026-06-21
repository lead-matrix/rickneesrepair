import React, { useState } from 'react';
import { useLeadData } from '../../context/LeadDataContext';
import { Save, Mail, Shield, Check, Info } from 'lucide-react';

export const Settings: React.FC = () => {
  const { templates, saveTemplates } = useLeadData();

  // Local state for template editors
  const [emailTemplate, setEmailTemplate] = useState(templates.email);
  const [smsTemplate, setSmsTemplate] = useState(templates.sms);
  const [reviewTemplate, setReviewTemplate] = useState(templates.review);
  
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTemplates({
      email: emailTemplate,
      sms: smsTemplate,
      review: reviewTemplate
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-800 uppercase tracking-wide">
            Settings &amp; Templates
          </h1>
          <p className="text-xs text-slate-500 mt-1">Configure automated notifications, review triggers, and CRM preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Notification Editors */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b pb-3 mb-4">
            <Mail className="w-5 h-5 text-accent" />
            <h3 className="font-bold font-heading text-slate-700 uppercase tracking-wide">Automated Templates</h3>
          </div>

          {/* Email Template */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Appointment Booking Email</label>
            <p className="text-[10px] text-slate-400">Triggered when a lead status is changed to "Scheduled". Supports placeholders: <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{customer_name}}"}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{appliance_type}}"}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{appointment_date}}"}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{tech_name}}"}</code>.</p>
            <textarea
              rows={5}
              className="w-full border border-slate-200 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white text-slate-700 leading-relaxed"
              value={emailTemplate}
              onChange={e => setEmailTemplate(e.target.value)}
            />
          </div>

          {/* SMS Template */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Dispatch SMS Notification</label>
            <p className="text-[10px] text-slate-400">Sent to customer phone when technician is dispatched. Keep message short and concise to avoid multi-part charges.</p>
            <textarea
              rows={3}
              className="w-full border border-slate-200 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white text-slate-700 leading-relaxed"
              value={smsTemplate}
              onChange={e => setSmsTemplate(e.target.value)}
            />
          </div>

          {/* Review Request Template */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Review Request Template (SMS/Email)</label>
            <p className="text-[10px] text-slate-400">Triggered automatically 1 hour after invoice is marked "Paid". Include review link.</p>
            <textarea
              rows={3}
              className="w-full border border-slate-200 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white text-slate-700 leading-relaxed"
              value={reviewTemplate}
              onChange={e => setReviewTemplate(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {savedSuccess ? (
              <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                <Check className="w-4 h-4 stroke-[3]" /> Templates Saved Successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="bg-accent hover:bg-accent-dark text-white font-heading text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>

        </div>

        {/* Right Column: API / Database Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-left">
            <div className="flex items-center gap-2 border-b pb-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-bold font-heading text-slate-700 uppercase tracking-wide">CRM Infrastructure</h3>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-1">Database Mode</span>
                <span className="bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  LOCAL STORAGE MODE
                </span>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
                  CRM operates in local persistence mode. Pre-seeded with Wichita data.
                </p>
              </div>

              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-1">Twilio Integration</span>
                <span className="bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  SIMULATED DISPATCH
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex gap-2">
                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-normal">
                  To connect your live database, configure the Supabase URL and Keys in your environment variables.
                </p>
              </div>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
export default Settings;
