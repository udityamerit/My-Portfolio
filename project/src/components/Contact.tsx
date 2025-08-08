import React, { useState } from 'react';
import { 
  CONTACT_TITLE, 
  CONTACT_SUBTITLE, 
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_LOCATION 
} from '../utils/constants';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await emailjs.send(
        'service_ydn0s0n',
        'template_2h76vzv',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: CONTACT_EMAIL
        },
        'o-kcIIAOz9XaFZvjb'
      );

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <Mail size={20} className="text-blue-600 dark:text-blue-400 sm:w-6 sm:h-6" />,
      label: 'Email',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`
    },
    {
      icon: <Phone size={20} className="text-blue-600 dark:text-blue-400 sm:w-6 sm:h-6" />,
      label: 'Phone',
      value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE.replace(/\D/g, '')}`
    },
    {
      icon: <MapPin size={20} className="text-blue-600 dark:text-blue-400 sm:w-6 sm:h-6" />,
      label: 'Location',
      value: CONTACT_LOCATION
    }
  ];

  return (
    <section 
      id="contact" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-100 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">{CONTACT_TITLE}</h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 px-2 sm:px-4">{CONTACT_SUBTITLE}</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">Contact Information</h3>
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg md:text-xl font-medium mb-1 text-slate-900 dark:text-white">{info.label}</h4>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-words"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 break-words">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-md p-4 sm:p-6 md:p-8 border border-white/20 dark:border-slate-700/50">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">Send a Message</h3>
            
            {submitSuccess && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 rounded-md text-sm sm:text-base md:text-lg">
                Thank you for your message! I'll get back to you soon.
              </div>
            )}

            {submitError && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400 rounded-md text-sm sm:text-base md:text-lg">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base md:text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-sm sm:text-base md:text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base md:text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-sm sm:text-base md:text-lg"
                  />
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <label htmlFor="subject" className="block text-sm sm:text-base md:text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-sm sm:text-base md:text-lg"
                />
              </div>
              
              <div className="mb-4 sm:mb-6">
                <label htmlFor="message" className="block text-sm sm:text-base md:text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-sm sm:text-base md:text-lg resize-vertical"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-sm sm:text-base md:text-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;