import { Link } from 'wouter';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  internal: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  currentLocation: string;
}

export default function MobileMenu({ isOpen, onClose, navigation, currentLocation }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Reset search query when menu closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Filter navigation items based on search query
  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) return navigation;
    
    const query = searchQuery.toLowerCase();
    return navigation.filter(item => 
      item.name.toLowerCase().includes(query)
    );
  }, [searchQuery, navigation]);

  return (
    <nav className={`fixed top-16 left-0 w-full h-screen bg-card/95 backdrop-blur-lg z-40 md:hidden transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col p-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-menu"
          />
        </div>

        {/* Navigation Items */}
        {filteredNavigation.length > 0 ? (
          filteredNavigation.map((item, index) => {
            const isActiveInternal = item.internal && currentLocation === item.href;
            const linkClassName = `block py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform ${
              isActiveInternal 
                ? 'text-primary bg-primary/10 scale-105 border-l-4 border-primary' 
                : 'text-muted-foreground hover:text-primary hover:bg-muted hover:scale-105'
            }`;
            const linkStyle = { 
              animationDelay: isOpen ? `${index * 50}ms` : '0ms',
              animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
            };

            if (item.internal) {
              return (
                <Link key={item.name} href={item.href} onClick={onClose}>
                  <span className={linkClassName} style={linkStyle}>
                    {item.name}
                  </span>
                </Link>
              );
            } else {
              return (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={onClose}
                  rel="noopener noreferrer"
                  className={linkClassName}
                  style={linkStyle}
                >
                  {item.name}
                </a>
              );
            }
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No menu items found
          </div>
        )}
      </div>
    </nav>
  );
}
