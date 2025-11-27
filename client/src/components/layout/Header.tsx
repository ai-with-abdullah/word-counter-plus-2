import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';
import { FaPenNib, FaBars } from "@/components/common/Icons";
import { ChevronDown } from 'lucide-react';
import { getAvailableTools } from '@/data/toolsConfig';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);

  const allTools = getAvailableTools();
  
  const currentToolHome = '/';
  const navigation = [
    { name: 'Home', href: currentToolHome, internal: true },
    { name: 'Extension', href: '/extension', internal: true },
    { name: 'About', href: '/about', internal: true },
    { name: 'Contact', href: '/contact', internal: true },
    { name: 'Blog', href: '/blog', internal: true }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        toolsButtonRef.current &&
        !toolsButtonRef.current.contains(event.target as Node)
      ) {
        setIsToolsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsToolsDropdownOpen(false);
  }, [location]);

  const isToolPage = allTools.some(tool => tool.href === location);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href={currentToolHome} data-testid="link-home">
              <div className="flex items-center space-x-2">
                <FaPenNib className="text-primary text-xl" aria-label="Word Counter Logo" />
                <h1 className="text-xl font-bold text-foreground">Word Counter Plus</h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" data-testid="link-nav-home">
                <span className={`relative transition-all duration-300 ease-in-out font-medium ${
                  location === '/' 
                    ? 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' 
                    : 'text-muted-foreground hover:text-primary'
                }`}>
                  Home
                </span>
              </Link>

              <div className="relative">
                <button
                  ref={toolsButtonRef}
                  onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                  onMouseEnter={() => setIsToolsDropdownOpen(true)}
                  className={`flex items-center gap-1 transition-all duration-300 ease-in-out font-medium ${
                    isToolPage || isToolsDropdownOpen
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  data-testid="button-tools-dropdown"
                  aria-expanded={isToolsDropdownOpen}
                  aria-haspopup="true"
                >
                  Tools
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isToolsDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    onMouseLeave={() => setIsToolsDropdownOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] max-h-[70vh] overflow-y-auto bg-card border border-border rounded-lg shadow-xl z-50"
                    role="menu"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                        <h3 className="text-sm font-semibold text-foreground">All Text Tools</h3>
                        <Link href="/tools" data-testid="link-view-all-tools">
                          <span className="text-xs text-primary hover:underline">View All →</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {allTools.map((tool) => {
                          const IconComponent = tool.icon;
                          const isActive = location === tool.href;
                          return (
                            <Link key={tool.id} href={tool.href} data-testid={`link-tool-${tool.id}`}>
                              <div 
                                className={`flex items-center gap-3 p-2.5 rounded-md transition-colors ${
                                  isActive 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'hover:bg-muted text-foreground'
                                }`}
                                role="menuitem"
                                onClick={() => setIsToolsDropdownOpen(false)}
                              >
                                <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className="text-sm font-medium truncate">{tool.title}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navigation.slice(1).map((item) => {
                const isActiveInternal = item.internal && location === item.href;
                return (
                  <Link key={item.name} href={item.href} data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className={`relative transition-all duration-300 ease-in-out font-medium ${
                      isActiveInternal 
                        ? 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center">
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
        navigation={[
          { name: 'Home', href: '/', internal: true },
          { name: 'Tools', href: '/tools', internal: true },
          ...navigation.slice(1)
        ]}
        currentLocation={location}
      />
    </>
  );
}
