import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  FileText,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import collegeImg from "@/assets/education/college_img.jpg";
import schoolImg from "@/assets/education/school_img.jpg";

const educationData = [
  {
    id: 1,
    school: "Edith Cowan University, Sri Lanka",
    location: "Sri Lanka",
    duration: "Jun 2023 - Present",
    degree: "B.Sc. Major in Software Engineering (Final Year)",
    image: collegeImg,
    coursework: [
      "Diploma of Science (Computing/IT)",
      "Software Engineering",
    ],
    description:
      "Currently in my final year of a B.Sc. majoring in Software Engineering, having progressed from the Diploma of Science (Computing/IT) at the same university. This path has built a strong foundation in full-stack development, cloud technologies, and software engineering fundamentals.",
  },
  {
    id: 2,
    school: "Zahira National College, Matale",
    location: "Matale, Sri Lanka",
    duration: "Jan 2017 - Mar 2022",
    degree: "G.C.E. Advanced Level & Ordinary Level Examinations",
    image: schoolImg,
    description:
      "Completed both the G.C.E. Ordinary Level and Advanced Level examinations at Zahira National College, Matale, while also serving on the School Prefect Board and School Band Team.",
  },
];

const Education = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GraduationCap className="w-8 h-8" />
          <h2 className="text-4xl font-bold gradient-text">Education</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="space-y-12">
        {educationData.map((edu) => (
          <ScrollAnimation key={edu.id}>
            <div className="relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-bl-xl flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300">{edu.duration}</span>
              </div>

              <div className="grid md:grid-cols-[350px,1fr]">
                <div className="relative h-96 md:h-full">
                  <img
                    src={edu.image}
                    alt={edu.school}
                    loading="lazy"
                    width={350}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{edu.school}</h3>
                      <div className="flex items-center gap-2 text-gray-300 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                      {edu.grade && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Award className="w-4 h-4" />
                          <span>{edu.grade}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <h4 className="text-lg font-semibold">{edu.degree}</h4>
                  </div>

                  <div className="flex items-start gap-2 text-gray-300 mb-6">
                    <FileText className="w-5 h-5 mt-1 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{edu.description}</p>
                  </div>

                  {edu.coursework && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.subjects && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Education;
