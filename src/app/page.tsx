import { 
  Header, 
  Footer, 
  HeroSection, 
  ConfigsSection, 
  InstallSection, 
  CtaSection 
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <ConfigsSection />
      <InstallSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
