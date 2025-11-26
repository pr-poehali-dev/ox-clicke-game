import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: 'Cpu',
      title: 'Neural Processing',
      description: 'Advanced AI-powered computations for real-time data analysis',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: 'Sparkles',
      title: 'Holographic Display',
      description: 'Immersive 3D visualization with quantum rendering',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'Zap',
      title: 'Quantum Speed',
      description: 'Lightning-fast processing at the speed of light',
      color: 'from-cyan-400 to-teal-400'
    },
    {
      icon: 'Shield',
      title: 'Secure Protocol',
      description: 'Military-grade encryption with blockchain verification',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'System Uptime' },
    { value: '1.2ms', label: 'Response Time' },
    { value: '256TB', label: 'Data Capacity' },
    { value: '∞', label: 'Possibilities' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0d1233] to-[#0a0e27] text-foreground overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`
        }}
      />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        <nav className="p-6 flex items-center justify-between backdrop-blur-sm border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/50">
              <Icon name="Hexagon" className="text-background" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              NEXUS
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#stats" className="text-sm font-medium hover:text-primary transition-colors">Stats</a>
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 border border-primary/30"
            >
              <Icon name="Rocket" size={16} className="mr-2" />
              Launch
            </Button>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-20">
          <div className="text-center mb-32 animate-slide-up">
            <div className="inline-block mb-6 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">Next Generation Technology</span>
            </div>
            
            <h1 className="text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Future Is Now
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience the power of advanced holographic interfaces combined with quantum processing capabilities
            </p>

            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-lg px-8 border border-primary/50 animate-glow"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 backdrop-blur-sm"
              >
                <Icon name="Info" size={20} className="mr-2" />
                Learn More
              </Button>
            </div>
          </div>

          <div id="stats" className="grid grid-cols-4 gap-6 mb-32">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="relative group animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Card className="relative bg-card/40 backdrop-blur-xl border-primary/30 p-8 text-center hover:border-primary/60 transition-all duration-300">
                  <div className="text-5xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div id="features" className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Core Features
              </h2>
              <p className="text-muted-foreground text-lg">
                Advanced technology for the modern era
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="relative group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`} />
                  
                  <Card className="relative bg-card/40 backdrop-blur-xl border-primary/30 p-8 hover:border-primary/60 transition-all duration-300 hover:transform hover:-translate-y-2">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-primary/30 ${hoveredCard === idx ? 'animate-float' : ''}`}>
                        <Icon name={feature.icon as any} size={32} className="text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-primary/20 flex items-center justify-between">
                      <span className="text-sm text-primary font-medium">Learn more</span>
                      <Icon 
                        name="ArrowRight" 
                        size={20} 
                        className={`text-primary transition-transform duration-300 ${hoveredCard === idx ? 'translate-x-2' : ''}`}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-32 mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-3xl" />
            <Card className="relative bg-card/40 backdrop-blur-xl border-primary/30 p-16 text-center">
              <div className="inline-block mb-6 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50 animate-float mx-auto">
                <Icon name="Orbit" size={40} className="text-white" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Ready to Experience the Future?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of innovators already using our platform to transform their vision into reality
              </p>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-lg px-12 border border-primary/50 animate-glow"
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Start Now
              </Button>
            </Card>
          </div>
        </main>

        <footer className="border-t border-primary/20 backdrop-blur-sm py-8">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Hexagon" className="text-background" size={18} />
                </div>
                <span className="text-sm text-muted-foreground">© 2025 NEXUS. All rights reserved.</span>
              </div>
              
              <div className="flex gap-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Github" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
