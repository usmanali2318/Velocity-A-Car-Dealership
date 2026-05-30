import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCar } from "@/hooks/use-cars";
import { useRoute } from "wouter";
import { Loader2, Check, ArrowLeft, Fuel, Gauge, Armchair, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/CheckoutModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function CarDetails() {
  const [, params] = useRoute("/cars/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { data: car, isLoading, error } = useCar(id);
  const [showCheckout, setShowCheckout] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-white font-display mb-4">Vehicle Not Found</h1>
        <Link href="/inventory">
          <Button variant="outline">Return to Inventory</Button>
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(car.price);

  const [selectedImage, setSelectedImage] = useState(car.image);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/inventory" className="inline-flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inventory
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              <motion.div 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[16/10] overflow-hidden rounded-sm bg-muted border border-white/10"
              >
                <img
                  src={selectedImage || "/images/cars/placeholder.jpg"}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-3 gap-4">
                <div 
                  onClick={() => setSelectedImage(car.image)}
                  className={`aspect-video bg-muted rounded-sm border overflow-hidden cursor-pointer transition-all ${selectedImage === car.image ? 'border-accent opacity-100' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                >
                  <img src={car.image} className="w-full h-full object-cover" alt="Main" />
                </div>
                {car.interiorImage && (
                  <div 
                    onClick={() => setSelectedImage(car.interiorImage!)}
                    className={`aspect-video bg-muted rounded-sm border overflow-hidden cursor-pointer transition-all relative ${selectedImage === car.interiorImage ? 'border-accent opacity-100' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={car.interiorImage} className="w-full h-full object-cover" alt="Interior" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-tighter font-bold">Interior</span>
                    </div>
                  </div>
                )}
                {car.detailImage && (
                  <div 
                    onClick={() => setSelectedImage(car.detailImage!)}
                    className={`aspect-video bg-muted rounded-sm border overflow-hidden cursor-pointer transition-all relative ${selectedImage === car.detailImage ? 'border-accent opacity-100' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={car.detailImage} className="w-full h-full object-cover" alt="Detail" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-tighter font-bold">Detail</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-2 text-accent font-bold tracking-widest uppercase text-sm">{car.category}</div>
                <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white mb-2">{car.name}</h1>
                <h2 className="text-2xl text-muted-foreground uppercase tracking-wide mb-6">{car.model}</h2>
                
                <div className="flex items-end gap-4 mb-8 pb-8 border-b border-white/10">
                  <span className="text-4xl md:text-5xl font-display font-bold text-white">{formattedPrice}</span>
                  {car.quantity <= 0 && (
                    <span className="text-destructive font-bold uppercase tracking-widest mb-2">Sold Out</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-sm"><Fuel className="w-5 h-5 text-accent" /></div>
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase">Fuel Type</span>
                      <span className="text-white font-medium">Gasoline</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-sm"><Gauge className="w-5 h-5 text-accent" /></div>
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase">Mileage</span>
                      <span className="text-white font-medium">0 mi (New)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-sm"><Armchair className="w-5 h-5 text-accent" /></div>
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase">Interior</span>
                      <span className="text-white font-medium">Premium Leather</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-sm"><Calendar className="w-5 h-5 text-accent" /></div>
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase">Year</span>
                      <span className="text-white font-medium">2024</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 p-6 rounded-sm mb-8">
                  <h3 className="font-display font-bold text-lg text-white mb-4 uppercase">Vehicle Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Panoramic Sunroof", 
                      "Premium Sound System", 
                      "Driver Assistance Package", 
                      "Heated/Ventilated Seats",
                      "Navigation System",
                      "Wireless Charging"
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => setShowCheckout(true)}
                    disabled={car.quantity <= 0}
                    className="w-full h-14 text-base uppercase tracking-widest bg-white text-black hover:bg-gray-200 font-bold"
                  >
                    {car.quantity > 0 ? "Reserve This Vehicle" : "Vehicle Unavailable"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    *Reservation requires no immediate payment. Our concierge will contact you to finalize the details.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <CheckoutModal 
        car={car} 
        open={showCheckout} 
        onOpenChange={setShowCheckout} 
      />

      <Footer />
    </div>
  );
}
