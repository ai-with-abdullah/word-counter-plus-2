import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';
import { FaPenNib, FaBars } from "@/components/common/Icons";
import { BRAND_CONFIG } from '@/lib/site';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  
  const currentToolHome = '/';
  // Dynamic navigation based on current context
  const navigation = [
    // Context-aware Home - goes to current tool's home
    { name: 'Home', href: currentToolHome, internal: true },
    // Tools page for accessing all tools
    { name: 'Tools', href: '/tools', internal: true },
    { name: 'Extension', href: '/extension', internal: true },
    { name: 'About', href: '/about', internal: true },
    { name: 'Contact', href: '/contact', internal: true },
    { name: 'Blog', href: '/blog', internal: true }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Context-aware link */}
            <Link href={currentToolHome} data-testid="link-home">
              <div className="flex items-center space-x-2">
                <FaPenNib className="text-primary text-xl" aria-label="Word Counter Logo" />
                <h1 className="text-xl font-bold text-foreground">Word Counter Plus</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => {
                const isActiveInternal = item.internal && location === item.href;
                const linkProps = {
                  key: item.name,
                  'data-testid': `link-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                  className: `relative transition-all duration-300 ease-in-out font-medium ${
                    isActiveInternal 
                      ? 'text-primary scale-105' 
                      : 'text-muted-foreground hover:text-primary hover:scale-105'
                  } ${isActiveInternal ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' : ''}`
                };

                if (item.internal) {
                  return (
                    <Link key={item.name} href={item.href} data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className={linkProps.className}>
                        {item.name}
                      </span>
                    </Link>
                  );
                } else {
                  return (
                    <a 
                      key={item.name}
                      href={item.href}
                      data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={linkProps.className}
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  );
                }
              })}
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
