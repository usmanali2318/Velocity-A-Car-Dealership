import { Link, useLocation } from "wouter";
import { Car, Menu, X, Phone, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/inventory", label: "Inventory" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-white/5 py-3 shadow-lg" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary text-primary-foreground p-2 rounded-sm group-hover:scale-105 transition-transform duration-300">
            <Car className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-foreground">
            VELOCITY
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-widest transition-colors duration-200 hover:text-accent ${
                location === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link href="/inventory">
            <Button 
              variant="outline" 
              className="rounded-none border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-xs h-10 px-6"
            >
              Find Your Vehicle
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-accent">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-white/10 w-[300px]">
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span 
                      className={`text-2xl font-display font-bold uppercase cursor-pointer hover:text-accent transition-colors ${
                        location === link.href ? "text-accent" : "text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-4" />
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-accent" />
                    <span className="text-sm">Showroom Open Daily</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
