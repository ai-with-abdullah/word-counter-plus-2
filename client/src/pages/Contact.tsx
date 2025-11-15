import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FaPaperPlane, 
  FaWhatsapp, 
  FaClock, 
  FaCheckCircle,
  FaEnvelope,
  FaUser,
  FaCommentDots,
  FaHeadset,
  FaRocket,
  FaShieldAlt,
  FaTag
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useSEO({
    title: "Contact Us - Get Support | Word Counter Plus",
    description: "Contact Word Counter Plus for support, feature requests, partnerships, or questions about our word counter and text analysis tool. We respond within 24 hours.",
    keywords: "contact support, word counter plus contact, word counter help, customer service, feature requests, partnerships, technical support",
    canonical: "https://wordcounterplusapp.com/contact",
    ogImage: "/og-image.png",
    ogType: "website"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    const whatsappURL = `https://wa.me/923194124382?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "You'll be redirected to WhatsApp to send your message.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const features = [
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: "24/7 Support",
      description: "We're always here to help you with any questions"
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Quick Response",
      description: "Get replies within 24 hours or less"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data is safe and never shared"
    }
  ];

  const contactReasons = [
    { icon: <FaCheckCircle className="text-green-500" />, text: "Technical support & bug reports" },
    { icon: <FaCheckCircle className="text-green-500" />, text: "Feature requests & suggestions" },
    { icon: <FaCheckCircle className="text-green-500" />, text: "Business partnerships" },
    { icon: <FaCheckCircle className="text-green-500" />, text: "General inquiries" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <FaCommentDots className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a message via WhatsApp and we'll respond as soon as possible.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Form */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaPaperPlane className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Send Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <FaUser className="w-4 h-4 text-primary" />
                        Full Name
                      </div>
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="John Doe"
                      data-testid="input-contact-name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="w-4 h-4 text-primary" />
                        Email Address
                      </div>
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="john@example.com"
                      data-testid="input-contact-email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <FaTag className="w-4 h-4 text-primary" />
                        Subject
                      </div>
                    </label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="How can we help you?"
                      data-testid="input-contact-subject"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <FaCommentDots className="w-4 h-4 text-primary" />
                        Your Message
                      </div>
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6} 
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical transition-all text-sm sm:text-base"
                      data-testid="textarea-contact-message"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    data-testid="button-send-message"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Send via WhatsApp
                  </button>
                </form>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Privacy Protected</p>
                      <p>Your information is secure and will only be used to respond to your inquiry.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Info & Contact Reasons */}
            <div className="space-y-6">
              {/* Response Time Card */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-full">
                      <FaClock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Quick Response Time</h3>
                      <p className="text-muted-foreground">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Reasons Card */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">What can we help you with?</h3>
                  <div className="space-y-3">
                    {contactReasons.map((reason, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {reason.icon}
                        <span className="text-muted-foreground">{reason.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Direct Card */}
              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-full">
                      <FaWhatsapp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Direct WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Prefer to chat directly? Fill out the form and you'll be redirected to WhatsApp instantly.
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                        <FaCheckCircle className="w-4 h-4" />
                        Instant connection
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Need help with our tools?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Visit our FAQ page for instant answers to common questions about Word Counter Plus features, file uploads, exports, and more.
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  View FAQ
                  <FaRocket className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
