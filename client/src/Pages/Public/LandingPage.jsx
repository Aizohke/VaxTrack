
import React from "react";
import { Link } from "react-router-dom";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Shield, Heart, Clock, MapPin } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">VaxTrack & Prevent</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted companion for managing your children's vaccination
            schedules. Never miss a vaccine again with our intelligent tracking
            system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Started Free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose VaxTrack?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Vaccine Tracking",
                description:
                  "Track all vaccinations with automated schedules and reminders",
              },
              {
                icon: Heart,
                title: "Child Health",
                description:
                  "Comprehensive health records and growth monitoring",
              },
              {
                icon: Clock,
                title: "Smart Reminders",
                description: "Never miss important vaccination dates",
              },
              {
                icon: MapPin,
                title: "Clinic Finder",
                description: "Find nearby clinics and book appointments easily",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How VaxTrack Helps Young Parents
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Simplified Vaccine Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Keep all your children's vaccination records in one secure
                  place. Access schedules, history, and upcoming vaccines
                  anytime.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Expert Guidance
                </h3>
                <p className="text-gray-600 mb-4">
                  Get answers to your vaccine-related questions with our AI
                  assistant and connect with healthcare professionals.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Peace of Mind
                </h3>
                <p className="text-gray-600 mb-4">
                  Automated reminders and progress tracking ensure your children
                  never miss important vaccinations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Community Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with other parents and healthcare providers through
                  our secure messaging platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Child's Health?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of parents who trust VaxTrack for their children's
            vaccination needs.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Journey Today
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;