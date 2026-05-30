import { Car } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Fuel, Gauge, Armchair, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card border border-border/50 overflow-hidden rounded-sm hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={car.image || "/images/cars/placeholder.jpg"}
          alt={`${car.name} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
        />
        <div className="absolute top-4 right-4">
          <Badge 
            variant={car.quantity > 0 ? "secondary" : "destructive"} 
            className="uppercase tracking-widest text-[10px] py-1 px-3 bg-black/50 backdrop-blur-md text-white border-white/10"
          >
            {car.quantity > 0 ? "Available" : "Sold Out"}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
          <span className="text-white font-display text-lg tracking-wide">{car.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display font-bold text-xl uppercase tracking-wide text-foreground group-hover:text-accent transition-colors">
              {car.name}
            </h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">{car.model}</p>
          </div>
          <div className="text-right">
            <span className="block font-display font-bold text-lg text-white">{formattedPrice}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/5 mb-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <Fuel className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Gasoline</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Automatic</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Armchair className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Leather</span>
          </div>
        </div>

        <Link href={`/cars/${car.id}`} className="block">
          <button className="w-full py-3 bg-white/5 hover:bg-white hover:text-black text-white font-medium text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4">
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
