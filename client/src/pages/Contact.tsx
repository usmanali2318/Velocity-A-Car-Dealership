import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContact } from "@/hooks/use-cars";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";

// Contact Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const contactMutation = useContact();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. Our team will respond shortly.",
          duration: 5000,
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Unsplash image: sleek office building or modern architecture */}
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Office" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase text-white mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our concierge team is at your disposal for any inquiries regarding our inventory or services.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-white mb-8">Get In Touch</h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              We invite you to visit our showroom to experience our collection in person. Appointments are recommended for personalized service.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">1234 Velocity Blvd<br/>Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9am - 7pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase mb-1">Email Us</h3>
                  <p className="text-muted-foreground">sales@velocity-auto.com</p>
                  <p className="text-muted-foreground">support@velocity-auto.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-6">Send a Message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  className="bg-white/5 border-white/10 focus:border-accent h-12"
                  placeholder="John Doe"
                />
                {form.formState.errors.name && (
                  <span className="text-destructive text-xs">{form.formState.errors.name.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  {...form.register("email")}
                  className="bg-white/5 border-white/10 focus:border-accent h-12"
                  placeholder="john@example.com"
                />
                {form.formState.errors.email && (
                  <span className="text-destructive text-xs">{form.formState.errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  className="bg-white/5 border-white/10 focus:border-accent min-h-[150px]"
                  placeholder="I am interested in..."
                />
                {form.formState.errors.message && (
                  <span className="text-destructive text-xs">{form.formState.errors.message.message}</span>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 uppercase tracking-widest font-bold bg-white text-black hover:bg-gray-200"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
