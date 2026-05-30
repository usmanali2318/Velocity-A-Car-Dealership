import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCars } from "@/hooks/use-cars";
import { CarCard } from "@/components/CarCard";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, Award } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: featuredCars, isLoading } = useCars({ sort: 'price_desc' });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash luxury car image for hero background */}
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Sports Car" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-accent uppercase tracking-[0.2em] mb-4 text-sm font-bold">The Art of Performance</h2>
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold mb-6 text-white leading-tight">
              BEYOND <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">DRIVING</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-300 text-lg mb-10 leading-relaxed font-light">
              Discover a curated collection of the world's most exceptional vehicles. 
              Engineering excellence meets unparalleled luxury.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/inventory">
                <Button className="h-14 px-8 text-base uppercase tracking-widest bg-white text-black hover:bg-gray-200 transition-all rounded-sm font-semibold">
                  Explore Inventory
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-14 px-8 text-base uppercase tracking-widest border-white/30 text-white hover:bg-white/10 hover:text-white transition-all rounded-sm backdrop-blur-sm">
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Categories Strip */}
      <section className="bg-black py-20 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Sedan', 'SUV', 'Pickup', 'Luxury'].map((cat, i) => (
              <Link key={cat} href={`/inventory?category=${cat}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/5 p-6 text-center cursor-pointer hover:bg-white/10 hover:border-accent/50 transition-all group"
                >
                  <span className="font-display font-bold text-lg text-gray-400 group-hover:text-white uppercase tracking-wider">{cat}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Inventory */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-2 uppercase">Featured Vehicles</h2>
              <div className="h-1 w-20 bg-accent rounded-full" />
            </div>
            <Link href="/inventory">
              <Button variant="ghost" className="hidden md:flex gap-2 text-white hover:text-accent group uppercase tracking-wider text-xs font-semibold">
                View All Inventory 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars?.slice(0, 3).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/inventory">
              <Button className="w-full border-white/20" variant="outline">View All Inventory</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        {/* Decorative background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:border-accent/30 transition-colors">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-accent border border-white/10">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4 uppercase">Premium Selection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every vehicle in our inventory undergoes a rigorous 150-point inspection to ensure absolute perfection.
              </p>
            </div>
            <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:border-accent/30 transition-colors">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-accent border border-white/10">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4 uppercase">Comprehensive Warranty</h3>
              <p className="text-muted-foreground leading-relaxed">
                Drive with confidence knowing your investment is protected by our industry-leading coverage plans.
              </p>
            </div>
            <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:border-accent/30 transition-colors">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-accent border border-white/10">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4 uppercase">VIP Concierge</h3>
              <p className="text-muted-foreground leading-relaxed">
                From test drives to delivery, our dedicated concierge team handles every detail of your purchase experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 z-0">
          {/* Unsplash image: steering wheel interior detail */}
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2000" 
            alt="Car Interior" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl font-bold text-white mb-6 uppercase leading-tight">
              Ready to Experience <br/> <span className="text-accent">Excellence?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 font-light">
              Schedule a private viewing or speak with our automotive specialists today. Your dream car awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/inventory">
                <Button className="h-14 px-10 text-base uppercase tracking-widest bg-white text-black hover:bg-gray-200">
                  Find Your Car
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-14 px-10 text-base uppercase tracking-widest border-white/20 text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
