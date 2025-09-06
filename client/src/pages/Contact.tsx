import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { FaCalendar, FaClock, FaInfo, FaInfoCircle, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  useSEO({
    title: "Contact Us - Get Support | Word Counter Plus",
    description: "Contact Word Counter Plus for support, feature requests, partnerships, or questions about our word counter and text analysis tool. We respond within 24 hours.",
    keywords: "contact support, word counter plus contact, word counter help, customer service, feature requests, partnerships, technical support",
    canonical: "https://wordcounterplusapp.com/contact"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappURL = `https://wa.me/923194124382?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "You'll be redirected to WhatsApp to send your message.",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our <strong>word counter tool</strong>? Need support or want to suggest a feature? 
            We're here to help and would love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center">
                <FaClock className="mr-3 text-primary" aria-label="Clock Icon" />
                <div>
                  <p className="font-semibold">Response Time</p>
                  <p>Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center">
                {/* <i className="fas fa-calendar mr-3 text-primary" aria-label="Calendar Icon"></i> */}
                <FaCalendar className="mr-3 text-primary" aria-label="Calendar Icon" />
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p>Monday - Friday, 9AM - 5PM EST</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Frequently Asked</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Technical issues with the word counter</li>
                <li>• Feature requests and suggestions</li>
                <li>• Business partnerships and collaboration</li>
                <li>• Privacy and data security questions</li>
                <li>• Bug reports and feedback</li>
              </ul>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="input-contact-name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="input-contact-email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6} 
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  data-testid="textarea-contact-message"
                  placeholder="Please describe your question or feedback in detail..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors font-semibold"
                data-testid="button-send-message">
                <FaPaperPlane className="mr-2 h-5 w-5" aria-hidden="true" />
                Send Message
              </button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start">
                <FaInfo className="text-primary mr-3 mt-1" aria-label="Info Icon" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold mb-1">Privacy Note</p>
                  <p>We respect your privacy. Your contact information will only be used to respond to your inquiry and will not be shared with third parties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
  );
}
