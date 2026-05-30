import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCars } from "@/hooks/use-cars";
import { CarCard } from "@/components/CarCard";
import { Loader2, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Inventory() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "all";
  
  const [filters, setFilters] = useState({
    category: initialCategory === "all" ? undefined : initialCategory,
    minPrice: undefined as string | undefined,
    maxPrice: undefined as string | undefined,
    color: undefined as string | undefined,
    sort: "price_desc" as "price_asc" | "price_desc",
  });

  const [priceRange, setPriceRange] = useState([0, 100000000]);
  
  const { data: cars, isLoading, error } = useCars(filters);

  const categories = ["Sedan", "SUV", "Pickup", "Luxury"];
  const colors = ["Black", "White", "Silver", "Red", "Blue", "Grey"];

  // Update category if URL param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setFilters(prev => ({ ...prev, category: cat === "all" ? undefined : cat }));
    }
  }, [location]);

  const handleFilterReset = () => {
    setFilters({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      color: undefined,
      sort: "price_desc",
    });
    setPriceRange([0, 100000000]);
    window.history.pushState({}, "", "/inventory");
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setFilters(prev => ({
      ...prev,
      minPrice: value[0].toString(),
      maxPrice: value[1].toString()
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="bg-card border-b border-white/5 pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-4">
            Our Inventory
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive collection of premium vehicles, each selected for its exceptional quality and performance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 h-fit sticky top-28">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">Filter By</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleFilterReset}
                className="text-xs text-muted-foreground hover:text-white"
              >
                Reset All
              </Button>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroup 
                    value={filters.category || "all"} 
                    onValueChange={(val) => setFilters(prev => ({ ...prev, category: val === "all" ? undefined : val }))}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="all" id="all" className="border-white/20 text-accent" />
                      <Label htmlFor="all" className="text-sm cursor-pointer">All Vehicles</Label>
                    </div>
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={cat} id={cat} className="border-white/20 text-accent" />
                        <Label htmlFor={cat} className="text-sm cursor-pointer">{cat}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price Range</Label>
                <span className="text-xs text-accent">
                  PKR {(priceRange[0]/1000000).toFixed(1)}M - {(priceRange[1]/1000000).toFixed(1)}M+
                </span>
              </div>
              <Slider
                defaultValue={[0, 100000000]}
                value={priceRange}
                max={100000000}
                step={1000000}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Exterior Color</Label>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <div 
                    key={color}
                    onClick={() => setFilters(prev => ({ ...prev, color: prev.color === color ? undefined : color }))}
                    className={`
                      cursor-pointer border text-center py-2 text-xs rounded-sm transition-all
                      ${filters.color === color 
                        ? "bg-white text-black border-white" 
                        : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30"}
                    `}
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter & Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="lg:hidden w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto border-white/20 flex gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-background border-r border-white/10">
                    <SheetHeader className="mb-8">
                      <SheetTitle className="text-white font-display uppercase tracking-wider">Filter Inventory</SheetTitle>
                    </SheetHeader>
                    {/* Mobile Filter Content - simplified replication of sidebar */}
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <Label>Category</Label>
                        <RadioGroup 
                          value={filters.category || "all"} 
                          onValueChange={(val) => setFilters(prev => ({ ...prev, category: val === "all" ? undefined : val }))}
                        >
                          <div className="flex items-center space-x-2"><RadioGroupItem value="all" /><Label>All</Label></div>
                          {categories.map(c => <div key={c} className="flex items-center space-x-2"><RadioGroupItem value={c} /><Label>{c}</Label></div>)}
                        </RadioGroup>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                  {cars?.length || 0} Vehicles Found
                </span>
                <Select 
                  value={filters.sort} 
                  onValueChange={(val: any) => setFilters(prev => ({ ...prev, sort: val }))}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-white/20 text-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Car Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 text-accent animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-card border border-white/5 rounded-sm">
                <p className="text-destructive mb-4">Unable to load inventory</p>
                <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
              </div>
            ) : cars?.length === 0 ? (
              <div className="text-center py-20 bg-card border border-white/5 rounded-sm">
                <h3 className="text-xl font-display text-white mb-2">No Vehicles Found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
                <Button onClick={handleFilterReset} variant="outline" className="border-white/20">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars?.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
