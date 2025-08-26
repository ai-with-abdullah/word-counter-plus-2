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
    <nav className={`mobile-menu fixed top-16 left-0 w-full h-screen bg-card z-40 md:hidden ${
      isOpen ? 'open' : ''
    }`}>
      <div className="flex flex-col p-6 space-y-4">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} onClick={onClose}>
            <span className={`py-2 transition-colors ${
              currentLocation === item.href 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-primary'
            }`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
