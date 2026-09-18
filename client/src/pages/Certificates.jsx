import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";
import googleITSupport from "@/assets/certificates/google-it-support.png";
import googleUXDesign from "@/assets/certificates/google-ux-design.png";
import ibmAIDeveloper from "@/assets/certificates/ibm-ai-developer.png";
import ibmFullStack from "@/assets/certificates/ibm-fullstack-developer.png";
import metaFrontEnd from "@/assets/certificates/meta-frontend-developer.png";
import googleAIFundamentals from "@/assets/certificates/google-ai-fundamentals.png";

const certificates = [
  {
    id: 1,
    title: "Google IT Support",
    issuer: "Google Career Certificates",
    date: "Jul 14, 2025",
    image: googleITSupport,
    verifyUrl: "https://coursera.org/verify/professional-cert/RVLV2B1KEURA",
    description:
      "6-course program covering IT support fundamentals, computer networking, operating systems, system administration, and IT security.",
    skills: ["IT Support", "Networking", "System Administration"],
  },
  {
    id: 2,
    title: "Google UX Design",
    issuer: "Google Career Certificates",
    date: "Jul 17, 2025",
    image: googleUXDesign,
    description:
      "8-course program covering the end-to-end UX design process — empathizing with users, wireframing, building high-fidelity prototypes in Figma, and usability testing.",
    skills: ["UX Design", "User Research", "Figma", "Prototyping"],
  },
  {
    id: 3,
    title: "IBM AI Developer",
    issuer: "IBM",
    date: "Jul 27, 2025",
    image: ibmAIDeveloper,
    verifyUrl: "https://coursera.org/verify/professional-cert/1RIMXTVRMD85",
    description:
      "10-course program covering software development fundamentals, generative AI, prompt engineering, and building AI-powered web applications and chatbots with Python and Flask.",
    skills: ["Artificial Intelligence", "Generative AI", "Python", "Flask"],
  },
  {
    id: 4,
    title: "IBM Full Stack Software Developer",
    issuer: "IBM",
    date: "Sep 12, 2025",
    image: ibmFullStack,
    verifyUrl: "https://coursera.org/verify/professional-cert/3EOYCBN5DHD4",
    description:
      "15-course program covering cloud-native application development — HTML, CSS, JavaScript, React, Node.js, Django, SQL/NoSQL, Docker, Kubernetes, and microservices, capped with a deployed SaaS capstone.",
    skills: ["Full-Stack Development", "React", "Node.js", "Cloud Native"],
  },
  {
    id: 5,
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "Jul 28, 2025",
    image: metaFrontEnd,
    verifyUrl: "https://coursera.org/verify/professional-cert/4LPST60481I",
    description:
      "9-course program preparing learners for an entry-level front-end role, covering JavaScript, version control, React (basics to advanced), and UX/UI design principles.",
    skills: ["JavaScript", "React", "Version Control", "UI/UX"],
  },
  {
    id: 6,
    title: "AI Fundamentals",
    issuer: "Google",
    date: "Sep 16, 2026",
    image: googleAIFundamentals,
    verifyUrl: "https://coursera.org/verify/27Y0EPKUJHSM",
    description:
      "Course certificate covering the foundations of artificial intelligence, authorized by Google and offered through Coursera.",
    skills: ["Artificial Intelligence"],
  },
];

const Certificates = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Award className="w-8 h-8" />
          <h2 className="text-4xl font-bold gradient-text">Certificates</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <ScrollAnimation key={cert.id}>
            <div className="bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all group border border-white/5 h-full flex flex-col overflow-hidden">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden bg-white"
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </a>
              <div className="p-6 text-gray-400 space-y-2 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white">
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{cert.issuer}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-sm bg-white/10 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    Verify Certificate
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
