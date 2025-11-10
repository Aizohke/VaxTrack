import React from "react";
import { Link } from "react-router-dom";
import { Shield, Heart, Users, Target } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About VaxTrack & Prevent
            </h1>
            <p className="text-xl mb-8">
              Revolutionizing child healthcare through intelligent vaccination
              tracking and parental support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                To ensure no child misses critical vaccinations by empowering
                parents with technology, education, and access to healthcare
                resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  What We Do
                </h3>
                <p className="text-gray-600 mb-6">
                  VaxTrack & Prevent is a comprehensive platform that helps
                  parents manage their children's vaccination schedules, track
                  progress, and connect with healthcare providers seamlessly.
                </p>
                <p className="text-gray-600">
                  Our AI-powered assistant provides reliable information, while
                  our real-time communication tools bridge the gap between
                  parents and medical professionals.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Why It Matters
                </h3>
                <p className="text-gray-600 mb-6">
                  Every year, millions of children miss essential vaccinations
                  due to forgotten schedules, lack of access to information, or
                  logistical challenges.
                </p>
                <p className="text-gray-600">
                  We're changing that by making vaccination management simple,
                  accessible, and reliable for families everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description:
                  "Prioritizing child health and data security above all else",
              },
              {
                icon: Heart,
                title: "Compassionate Care",
                description:
                  "Understanding the needs and concerns of modern parents",
              },
              {
                icon: Users,
                title: "Community Focus",
                description:
                  "Building supportive networks for parents and caregivers",
              },
              {
                icon: Target,
                title: "Impact Driven",
                description:
                  "Measuring success by improved vaccination rates and child health outcomes",
              },
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern technology to provide a seamless, secure, and
              scalable experience for parents and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">AI</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                AI Assistant
              </h3>
              <p className="text-gray-600 text-sm">
                24/7 intelligent support for vaccine-related questions and
                health guidance
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">RT</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Real-time Chat
              </h3>
              <p className="text-gray-600 text-sm">
                Instant communication with healthcare providers and medical
                professionals
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">MERN</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Modern Stack
              </h3>
              <p className="text-gray-600 text-sm">
                Built on MongoDB, Express, React, and Node.js for reliability
                and performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of parents who trust VaxTrack for their children's
            healthcare journey.
          </p>
          <Link
            to="/"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Protecting Your Child Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;