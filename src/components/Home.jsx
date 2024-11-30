import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Shield,
  UserPlus,
  Lock,
  Smartphone,
  ChevronRight,
  Stars
} from 'lucide-react';

const BackgroundSVG = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-gray-600 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <Card className="group relative overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
    <div className={`absolute inset-0 ${color} opacity-5 transition-opacity group-hover:opacity-10`} />
    <div className="p-6">
      <div className={`rounded-xl ${color} p-3 w-fit`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-4 font-semibold text-xl">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  </Card>
);

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols to protect your data.",
      color: "bg-blue-500"
    },
    {
      icon: UserPlus,
      title: "User Friendly",
      description: "Simple and intuitive interface for the best user experience.",
      color: "bg-green-500"
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "Your data is encrypted and protected at all times.",
      color: "bg-purple-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Seamless experience across all your devices.",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundSVG />
      
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <Stars className="h-8 w-8 text-primary animate-pulse" />
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Auth App
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Experience modern authentication with a beautiful interface and powerful features.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" className="group" asChild>
                <Link to="/signup">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
             
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;