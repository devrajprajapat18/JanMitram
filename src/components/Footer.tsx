import { Link } from "react-router-dom";
import { BrainCircuit, Linkedin, Twitter, Facebook, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6" />
              <span className="text-lg font-bold">JanMitram</span>
            </div>
            <p className="text-sm opacity-90">
              Empowering students and recruiters with AI-driven opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-accent transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-accent transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <a href="/student-dashboard" className="hover:text-accent transition-colors">
                  Find Internships
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-accent transition-colors">
                  Career Guidance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:contact@janmitram.com" className="hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} JanMitram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};