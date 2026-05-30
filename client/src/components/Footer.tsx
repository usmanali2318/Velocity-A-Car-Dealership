import { Car, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white text-black p-1.5 rounded-sm">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-widest text-white">
                VELOCITY
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Experience the pinnacle of automotive engineering. We curate the finest selection of premium vehicles for the discerning driver.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider">Showroom</h4>
            <ul className="space-y-3">
              <li><Link href="/inventory" className="text-muted-foreground hover:text-accent transition-colors text-sm">All Vehicles</Link></li>
              <li><Link href="/inventory?category=Sedan" className="text-muted-foreground hover:text-accent transition-colors text-sm">Luxury Sedans</Link></li>
              <li><Link href="/inventory?category=SUV" className="text-muted-foreground hover:text-accent transition-colors text-sm">Premium SUVs</Link></li>
              <li><Link href="/inventory?category=Sports" className="text-muted-foreground hover:text-accent transition-colors text-sm">Sports Cars</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-accent transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Financing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>1234 Velocity Blvd, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>sales@velocity-auto.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} Velocity Automotive Group. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-white">Terms</span>
            <span className="text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-white">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
