import { Link } from "react-router-dom";
import { BrainCircuit, Linkedin, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent text-white">
              <BrainCircuit className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Jan<span className="text-accent">Mitram</span>
            </span>
          </Link>

          {/* Center Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JanMitram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};