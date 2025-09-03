import { Link } from 'wouter';
import { FaPenNib } from "react-icons/fa";


export default function Footer() {

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* <i className="fas fa-pen-nib text-primary text-xl"></i> */}
              <FaPenNib className="text-primary text-xl" />
              <h3 className="text-xl font-bold text-foreground">Word Counter Plus</h3>
            </div>
            <p className="text-muted-foreground text-sm">Professional word counting and text analysis tool for writers, bloggers, and content creators.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/"><span className="hover:text-primary transition-colors">Advanced Word Counter</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-primary transition-colors">FAQ & Help</span></Link></li>
              <li><Link href="/privacy"><span className="hover:text-primary transition-colors">Privacy Policy</span></Link></li>
              <li><Link href="/terms"><span className="hover:text-primary transition-colors">Terms of Service</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-primary transition-colors">Blog & Tips</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary transition-colors">Contact Support</span></Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#word-counter"><span className="hover:text-primary transition-colors">Real-time Word Counting</span></Link></li>
              <li><Link href="/#readability"><span className="hover:text-primary transition-colors">Readability Analysis</span></Link></li>
              <li><Link href="/#keywords"><span className="hover:text-primary transition-colors">Keyword Density Tool</span></Link></li>
              <li><Link href="/#export"><span className="hover:text-primary transition-colors">Export to PDF/CSV/TXT</span></Link></li>
              <li><Link href="/faq#sharing"><span className="hover:text-primary transition-colors">Text Analysis Tips</span></Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-border my-8" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">© 2025 Word Counter Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
