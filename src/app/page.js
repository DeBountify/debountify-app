import Hero from "@/components/landing_page/Hero";
import Features from "@/components/landing_page/Features";
import dynamic from "next/dynamic";
import Footer from "@/components/landing_page/Footer";
const Contact = dynamic(() => import("@/components/landing_page/Contact"));

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto">
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}
