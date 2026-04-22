"use client";

import { useState } from "react";
import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeonButton } from "@/components/ui/neon-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "hello@hellxstudio.com",
    description: "Send us an email anytime",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Digital Laboratory",
    description: "The Cloud, Everywhere",
  },
  {
    icon: Clock,
    title: "Support Hours",
    details: "24/7 AI Support",
    description: "Human support: Mon-Fri 9-5 UTC",
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Have a question or want to work together? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-foreground">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div 
                    key={info.title}
                    className="glass-card flex items-start gap-4 rounded-2xl p-6"
                  >
                    <div className="rounded-xl bg-neon-blue/10 p-3 text-neon-blue">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-neon-blue">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Link */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 p-6">
                <h3 className="mb-2 font-semibold text-foreground">Looking for quick answers?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Check out our documentation and FAQ section for instant help.
                </p>
                <NeonButton href="/dashboard" variant="secondary" size="sm">
                  View Documentation
                </NeonButton>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-3xl p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-6 rounded-full bg-green-500/20 p-4">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-foreground">Message Sent!</h3>
                    <p className="mb-6 text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-sm text-neon-blue hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="border-white/10 bg-white/5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="border-white/10 bg-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        required
                        className="border-white/10 bg-white/5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        className="border-white/10 bg-white/5 resize-none"
                      />
                    </div>

                    <NeonButton
                      type="submit"
                      className="w-full justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </NeonButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
