import { Button } from "./ui/button";
import { Heart, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Heart className="h-12 w-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Journey to
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Informed Choices
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover the right contraceptive method for your lifestyle with personalized recommendations, expert guidance, and ongoing support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/quiz">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
                Take the Quiz
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/methods">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                Learn About Methods
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Medically Reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span>Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Personalized Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;