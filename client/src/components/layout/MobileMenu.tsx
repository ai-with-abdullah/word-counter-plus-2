import { Link } from 'wouter';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  currentLocation: string;
}

export default function MobileMenu({ isOpen, onClose, navigation, currentLocation }: MobileMenuProps) {
  return (
    <nav className={`fixed top-16 left-0 w-full h-screen bg-card/95 backdrop-blur-lg z-40 md:hidden transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col p-6 space-y-4">
        {navigation.map((item, index) => (
          <Link key={item.name} href={item.href} onClick={onClose}>
            <span className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform ${
              currentLocation === item.href 
                ? 'text-primary bg-primary/10 scale-105 border-l-4 border-primary' 
                : 'text-muted-foreground hover:text-primary hover:bg-muted hover:scale-105'
            }`} 
            style={{ 
              animationDelay: isOpen ? `${index * 50}ms` : '0ms',
              animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
            }}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
