import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';
import { FaPenNib, FaBars } from "@/components/common/Icons";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2">
                <FaPenNib className="text-primary text-xl" aria-label="Word Counter Logo" />
                <h1 className="text-xl font-bold text-foreground">Word Counter Plus</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className={`relative transition-all duration-300 ease-in-out font-medium ${
                    location === item.href 
                      ? 'text-primary scale-105' 
                      : 'text-muted-foreground hover:text-primary hover:scale-105'
                  } ${location === item.href ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                data-testid="button-mobile-menu"
              >
                <FaBars className="text-xl" aria-label="Side Menu" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        currentLocation={location}
      />
    </>
  );
}
