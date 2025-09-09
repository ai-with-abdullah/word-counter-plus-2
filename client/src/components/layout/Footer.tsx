import { Link } from "wouter";
import {
  FaPenNib,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6"; // make sure react-icons/fa6 is installed

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaPenNib
                className="text-primary text-xl"
                aria-label="Word Counter Logo"
              />
              <h3 className="text-xl font-bold text-foreground">
                Word Counter Plus
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional word counting and text analysis tool for writers,
              bloggers, and content creators.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Pages</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about">
                  <span className="hover:text-primary transition-colors">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="hover:text-primary transition-colors">
                    FAQ & Help
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="hover:text-primary transition-colors">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="hover:text-primary transition-colors">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  <span className="hover:text-primary transition-colors">
                    Disclaimer
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="hover:text-primary transition-colors">
                    Blog & Tips
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-primary transition-colors">
                    Contact Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media - Uncommented for review, comment when ready */}
          {/*
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              
              <div className="relative group">
                <a
                  href="https://facebook.com/wordcounterplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white 
                            hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 
                            transition-all duration-300"
                >
                  <FaFacebook />
                </a>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                  Facebook
                </span>
              </div>

              
              <div className="relative group">
                <a
                  href="https://twitter.com/wordcounterplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white 
                            hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50 
                            transition-all duration-300"
                >
                  <FaXTwitter />
                </a>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                  X
                </span>
              </div>

              
              <div className="relative group">
                <a
                  href="https://instagram.com/wordcounterplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center rounded-full 
                            bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white 
                            hover:scale-110 hover:shadow-lg hover:shadow-pink-400/50 
                            transition-all duration-300"
                >
                  <FaInstagram />
                </a>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                  Instagram
                </span>
              </div>

              
              <div className="relative group">
                <a
                  href="https://tiktok.com/@wordcounterplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white 
                            hover:scale-110 hover:shadow-lg hover:shadow-gray-700/50 
                            transition-all duration-300"
                >
                  <FaTiktok />
                </a>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                  TikTok
                </span>
              </div>

              
              <div className="relative group">
                <a
                  href="https://linkedin.com/company/wordcounterplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-700 text-white 
                            hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 
                            transition-all duration-300"
                >
                  <FaLinkedin />
                </a>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                  LinkedIn
                </span>
              </div>
            </div>
          </div>
          */}

          {/*
            
            <div className="flex flex-col items-center relative">
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                
                <div className="relative group">
                  <a
                    href="https://facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white 
                              hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 
                              transition-all duration-300"
                  >
                    <FaFacebook />
                  </a>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                  text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                    Facebook
                  </span>
                </div>

                
                <div className="relative group">
                  <a
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white 
                              hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50 
                              transition-all duration-300"
                  >
                    <FaXTwitter />
                  </a>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                  text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                    X
                  </span>
                </div>

                
                <div className="relative group">
                  <a
                    href="https://instagram.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 flex items-center justify-center rounded-full 
                              bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white 
                              hover:scale-110 hover:shadow-lg hover:shadow-pink-400/50 
                              transition-all duration-300"
                  >
                    <FaInstagram />
                  </a>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                  text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                    Instagram
                  </span>
                </div>

                
                <div className="relative group">
                  <a
                    href="https://tiktok.com/@yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white 
                              hover:scale-110 hover:shadow-lg hover:shadow-gray-700/50 
                              transition-all duration-300"
                  >
                    <FaTiktok />
                  </a>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                  text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                    TikTok
                  </span>
                </div>

                
                <div className="relative group">
                  <a
                    href="https://linkedin.com/in/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-700 text-white 
                              hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 
                              transition-all duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                  text-xs text-foreground bg-card px-2 py-1 rounded shadow-md transition">
                    LinkedIn
                  </span>
                </div>
              </div>
            </div>
          */}
        </div>
        

        <hr className="border-border my-8" />

        <div className="text-center space-y-2 py-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Word Counter Plus. All rights reserved.
        </p>
        {/* <p className="text-sm text-muted-foreground">
          Built with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors duration-200"
          >
            Muhammad Abdullah
          </a>
        </p> */}
      </div>


      </div>
    </footer>
  );
}
