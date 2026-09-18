import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

const experiences = [
  {
    id: 1,
    title: "Full Stack Developer – Intern",
    company: "Octick (Pvt) Ltd.",
    location: "Sri Lanka",
    period: "Dec 2024 - Jun 2025",
    type: "Internship",
    description: [
      "Built a full responsive hotel management system for small–medium hotels as part of a live internship project",
      "Conducted independent UI/UX research and implemented a user-friendly, production-ready design",
      "Integrated AI functionality to assist with daily hotel operations, improving efficiency for end users",
      "Collaborated effectively within a 4-member development team to plan, build, and deliver the project on schedule",
    ],
  },
];

const Experience = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 max-w-5xl mx-auto pb-16 sm:pb-20">
      <ScrollAnimation>
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 gradient-text flex items-center gap-3">
          <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" />
          Professional Experience
        </h2>
      </ScrollAnimation>

      <div className="space-y-8 sm:space-y-12">
        {experiences.map((exp) => (
          <ScrollAnimation key={exp.id}>
            <div className="group relative bg-gray-800/50 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl group-hover:bg-white/20 transition-colors">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-gray-400 text-base sm:text-lg">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>

                <ul className="space-y-3 sm:space-y-4">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300 text-sm sm:text-base"
                    >
                      <ArrowRight className="w-5 h-5 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Experience;
