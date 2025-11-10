import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Book,
} from "lucide-react";

const PublicInfoPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const vaccineSchedule = [
    { age: "Birth", vaccines: ["BCG", "Hepatitis B"] },
    { age: "6 Weeks", vaccines: ["DTaP", "Polio", "Hib", "PCV", "Rotavirus"] },
    { age: "10 Weeks", vaccines: ["DTaP", "Polio", "Hib", "PCV", "Rotavirus"] },
    { age: "14 Weeks", vaccines: ["DTaP", "Polio", "Hib", "PCV", "Rotavirus"] },
    { age: "9 Months", vaccines: ["Measles", "Yellow Fever"] },
    { age: "18 Months", vaccines: ["DTaP", "Measles", "Polio"] },
  ];

  const myths = [
    {
      question: "Myth: Vaccines cause the diseases they prevent",
      answer:
        "False. Vaccines use weakened, killed, or parts of microbes, or genetic instructions, not the full disease-causing pathogen. They stimulate the immune system to build protection without causing the actual disease.",
    },
    {
      question: "Myth: Too many vaccines overload the immune system",
      answer:
        "False. Children's immune systems handle thousands of antigens daily from the environment. Vaccines contain only a tiny fraction of what their immune systems encounter and manage successfully every day.",
    },
    {
      question:
        "Myth: Natural immunity is better than vaccine-acquired immunity",
      answer:
        "False. While natural infection might provide immunity, it comes with significant risks of severe complications, permanent disability, or even death. Vaccines provide immunity without the dangerous consequences of natural infection.",
    },
    {
      question: "Myth: Vaccines contain harmful ingredients",
      answer:
        "False. Vaccine ingredients are carefully tested and used in extremely small amounts that are safe. Ingredients like formaldehyde are actually produced in larger amounts by our own bodies naturally.",
    },
  ];

  const sideEffects = [
    {
      type: "Common (Normal)",
      effects: [
        "Mild fever",
        "Soreness, redness, or swelling at injection site",
        "Fussiness or mild irritability",
        "Fatigue or drowsiness",
        "Loss of appetite",
      ],
      duration: "24-48 hours",
      action: "Rest, fluids, cool compress",
    },
    {
      type: "Rare (Contact Doctor)",
      effects: [
        "High fever (over 38.5°C)",
        "Severe allergic reaction",
        "Seizures",
        "Unusual crying for more than 3 hours",
        "Significant swelling",
      ],
      duration: "Immediate attention needed",
      action: "Contact healthcare provider immediately",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Vaccine Information Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based resources, myth-busting, and comprehensive
              information about childhood vaccinations.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Vaccine Schedule */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Book className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Standard Vaccination Schedule
              </h2>
            </div>

            <div className="space-y-4">
              {vaccineSchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="font-semibold text-gray-900 w-24">
                    {schedule.age}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {schedule.vaccines.map((vaccine, vIndex) => (
                        <span
                          key={vIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {vaccine}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This is a general schedule. Your
                healthcare provider may recommend variations based on your
                child's health condition and local guidelines.
              </p>
            </div>
          </section>

          {/* Common Myths */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Common Vaccine Myths & Facts
              </h2>
            </div>

            <div className="space-y-4">
              {myths.map((myth, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">
                      {myth.question}
                    </span>
                    {openAccordion === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {openAccordion === index && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{myth.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Side Effects */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Understanding Side Effects
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {sideEffects.map((category, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    category.type.includes("Common")
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    {category.type}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Possible Effects:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {category.effects.map((effect, effectIndex) => (
                          <li key={effectIndex}>{effect}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Typical Duration:
                      </h4>
                      <p className="text-sm text-gray-600">
                        {category.duration}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Recommended Action:
                      </h4>
                      <p className="text-sm text-gray-600">{category.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Additional Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  World Health Organization
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Global vaccine safety information and guidelines
                </p>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  Visit WHO →
                </a>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  CDC Vaccine Information
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive vaccine schedules and safety data
                </p>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  Visit CDC →
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Track Your Child's Vaccinations?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join VaxTrack today to get personalized vaccine schedules,
              reminders, and direct access to healthcare providers.
            </p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Get Started Free
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PublicInfoPage;