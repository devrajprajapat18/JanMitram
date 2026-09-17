import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/useAuth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const dashboardPath =
    user?.role === "student"
      ? "/student-dashboard"
      : user?.role === "recruiter"
      ? "/recruiter-dashboard"
      : user?.role === "admin"
      ? "/admin-dashboard"
      : "/login";

  const isAdmin = user?.role === "admin";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative flex items-center justify-between h-16 bg-white/90 backdrop-blur-md rounded-full border border-border shadow-sm px-5 sm:px-7">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-accent text-white">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <span className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
              Jan<span className="text-accent">Mitram</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to={dashboardPath}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated && isAdmin && (
              <Link
                to="/analytics"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  className="rounded-full bg-accent hover:bg-emerald-600 text-white px-6"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="rounded-full bg-accent hover:bg-emerald-600 text-white px-6">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="md:hidden absolute top-full left-0 right-0 mt-3 bg-white border border-border rounded-2xl shadow-md overflow-hidden"
                id="mobile-nav"
              >
                <div className="p-4 flex flex-col">
                  <Link
                    to="/"
                    className="py-3 px-4 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="py-3 px-4 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="py-3 px-4 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  {isAuthenticated && (
                    <Link
                      to={dashboardPath}
                      className="py-3 px-4 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="mt-3 pt-3 border-t border-border">
                    {isAuthenticated ? (
                      <Button
                        variant="default"
                        className="w-full rounded-full bg-accent hover:bg-emerald-600 text-white"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full rounded-full bg-accent hover:bg-emerald-600 text-white">
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};