import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useCreateOrder } from "@/hooks/use-cars";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CheckoutModalProps {
  car: Car;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Frontend validation schema
const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  zipcode: z.string().min(5, "Valid ZIP code is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutModal({ car, open, onOpenChange }: CheckoutModalProps) {
  const { toast } = useToast();
  const createOrder = useCreateOrder();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      address: "",
      zipcode: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    createOrder.mutate(
      {
        ...data,
        carId: car.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          toast({
            title: "Order Placed Successfully",
            description: "One of our concierge agents will contact you shortly to finalize the transaction.",
            duration: 5000,
          });
          onOpenChange(false);
          form.reset();
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Order Failed",
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-wide">Reserve Your Vehicle</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Complete this form to reserve the <span className="text-white font-medium">{car.name} {car.model}</span>. No payment is required today.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Full Name</Label>
              <Input
                id="customerName"
                {...form.register("customerName")}
                className="bg-white/5 border-white/10 focus:border-accent"
                placeholder="John Doe"
              />
              {form.formState.errors.customerName && (
                <span className="text-destructive text-xs">{form.formState.errors.customerName.message}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                className="bg-white/5 border-white/10 focus:border-accent"
                placeholder="(555) 123-4567"
              />
              {form.formState.errors.phone && (
                <span className="text-destructive text-xs">{form.formState.errors.phone.message}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                {...form.register("address")}
                className="bg-white/5 border-white/10 focus:border-accent"
                placeholder="123 Luxury Lane"
              />
              {form.formState.errors.address && (
                <span className="text-destructive text-xs">{form.formState.errors.address.message}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="zipcode">ZIP Code</Label>
              <Input
                id="zipcode"
                {...form.register("zipcode")}
                className="bg-white/5 border-white/10 focus:border-accent"
                placeholder="90210"
              />
              {form.formState.errors.zipcode && (
                <span className="text-destructive text-xs">{form.formState.errors.zipcode.message}</span>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-white/20 hover:bg-white hover:text-black"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createOrder.isPending}
              className="bg-white text-black hover:bg-gray-200"
            >
              {createOrder.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
