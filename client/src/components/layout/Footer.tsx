import { Link } from "wouter";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { 
  FaPenNib
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FaPenNib className="text-primary text-xl" aria-label="Word Counter Logo" />
              <h3 className="text-lg font-bold text-foreground">Word Counter Plus</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Professional text analysis tools for writers, students, and content creators.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-word-counter">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/character-counter" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-character-counter">
                  Character Counter
                </Link>
              </li>
              <li>
                <Link href="/text-case-convert" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-text-case-converter">
                  Text Case Converter
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-all-tools">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-cookies">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-disclaimer">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border space-y-4 sm:space-y-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <span data-testid="text-copyright">© {new Date().getFullYear()} Word Counter Plus. All rights reserved.</span>
          </div>
          
          {/* Social Media */}
          {/* <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground mr-2">Follow us on</span>
            <a
              href="https://facebook.com/wordcounterplus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 transition-all duration-200"
              data-testid="link-facebook"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/wordcounterplus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 hover:scale-110 transition-all duration-200"
              data-testid="link-twitter"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/wordcounterplus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 hover:scale-110 transition-all duration-200"
              data-testid="link-instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/wordcounterplus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 hover:scale-110 transition-all duration-200"
              data-testid="link-linkedin"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}