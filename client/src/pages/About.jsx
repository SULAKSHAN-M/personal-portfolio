import cvPdf from "@/assets/files/cv_pdf/Marudanayagam_Sulakshan_CV.pdf";
import profileImg from "@/assets/profile/profile.jpg";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { Briefcase, Code2, Compass, Globe, GraduationCap, Languages, Quote, Users } from "lucide-react";
import { Link } from "react-router-dom";

const achievements = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "6+ Projects",
    description: "Full-stack, AI and web applications",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Internship Experience",
    description: "Full Stack Developer at Octick (Pvt) Ltd.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "6 Certifications",
    description: "Google, IBM & Meta career certificates",
  },
];

const interests = [
  "Full-Stack Development",
  "UI/UX Design",
  "Cloud Computing",
  "Artificial Intelligence",
  "Requirements Analysis",
  "Software Testing",
];

const roadmap = [
  {
    title: "Finishing final-year software engineering coursework",
    detail: "Wrapping up the B.Sc. Software Engineering program at Edith Cowan University.",
  },
  {
    title: "Going deeper into generative AI",
    detail: "Building on the IBM AI Developer certificate — exploring prompt engineering and AI-powered applications further.",
  },
  {
    title: "Cloud-native & containers",
    detail: "Practicing with Docker, Kubernetes, and cloud deployment patterns from the IBM Full Stack Software Developer track.",
  },
  {
    title: "Sharpening front-end craft",
    detail: "Applying what the Meta Front-End Developer certificate covered — deeper React patterns and UI/UX polish.",
  },
];

const quickFacts = [
  "Based in Malabe, Sri Lanka",
  "B.Sc. in Software Engineering (Final Year)",
  "Software Engineering Undergraduate",
];

const spokenLanguages = ["English", "Tamil", "Sinhala"];

const extracurriculars = [
  "Member of the School Prefect Board",
  "Member of the School Band Team",
  "Participated in School Sportsmeet",
];

const About = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-4xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.h2 className="text-4xl font-bold mb-8 gradient-text">
          About Me
        </motion.h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollAnimation>
          <div className="aspect-square overflow-hidden rounded-2xl">
            <img
              src={profileImg}
              alt="Sulakshan Marudanayagam"
              width={600}
              height={600}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Hi! I'm a motivated Computer Science undergraduate majoring in
              Software Engineering, with hands-on experience in full-stack
              development, cloud technologies, and AI-assisted business
              solutions. I enjoy translating business requirements into
              practical, user-focused software.
            </p>
            <p className="text-gray-300 leading-relaxed">
              During my internship at Octick (Pvt) Ltd., I helped build a
              full responsive hotel management system for small–medium
              hotels, integrating AI functionality to assist with daily
              hotel operations and conducting independent UI/UX research to
              shape a production-ready design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I have a strong interest in artificial intelligence, cloud
              computing, and emerging technologies, backed by strong
              communication, problem-solving, teamwork, and time-management
              skills — and I'm committed to continuous learning within
              collaborative, technology-driven environments.
            </p>
          </div>

          <div className="pt-4">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              Quick Facts
            </h3>
            <ul className="list-none space-y-3">
              {quickFacts.map((fact) => (
                <motion.li
                  key={fact}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>{fact}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex justify-start space-x-4">
            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Download CV
            </a>
            <Link
              to="/skills"
              className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
            >
              My Skills
            </Link>
          </div>
        </ScrollAnimation>
      </div>

      <ScrollAnimation>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="text-white mb-4">{achievement.icon}</div>
                <h4 className="text-xl font-semibold mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Areas of Interest
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest) => (
              <div
                key={interest}
                className="bg-white/5 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3"
              >
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-8 gradient-text">
              Languages
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {spokenLanguages.map((language) => (
                <div
                  key={language}
                  className="bg-white/5 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3"
                >
                  <Languages className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{language}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8 gradient-text">
              Beyond Coding
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {extracurriculars.map((activity) => (
                <div
                  key={activity}
                  className="bg-white/5 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3"
                >
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Compass className="w-6 h-6 text-gray-400" />
            <h3 className="text-2xl font-semibold gradient-text">
              Currently Learning
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {roadmap.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 p-5 rounded-xl backdrop-blur-sm"
              >
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Quote className="w-6 h-6 text-gray-400" />
            <h3 className="text-2xl font-semibold gradient-text">
              References
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-xl backdrop-blur-sm">
              <p className="text-white font-medium">Lahiru Ellepola</p>
              <p className="text-gray-400 text-sm">
                Director/CEO, Octick (Pvt) Ltd.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Internship supervisor
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl backdrop-blur-sm">
              <p className="text-white font-medium">
                Ms. W.M.R.P.K. Prarthana
              </p>
              <p className="text-gray-400 text-sm">
                Lecturer, Edith Cowan University Sri Lanka
              </p>
              <p className="text-gray-500 text-xs mt-2">Academic reference</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Full contact details available on request.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            GitHub Activity
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${
                import.meta.env.VITE_GITHUB_USERNAME || "SULAKSHAN-M"
              }&show_icons=true&theme=dark&bg_color=00000000&hide_border=true&title_color=ffffff&text_color=9ca3af&icon_color=9ca3af`}
              alt="GitHub stats"
              className="w-full rounded-xl"
              loading="lazy"
            />
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${
                import.meta.env.VITE_GITHUB_USERNAME || "SULAKSHAN-M"
              }&layout=compact&theme=dark&bg_color=00000000&hide_border=true&title_color=ffffff&text_color=9ca3af`}
              alt="Most used languages"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </div>
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${
              import.meta.env.VITE_GITHUB_USERNAME || "SULAKSHAN-M"
            }&theme=dark&background=00000000&border=00000000&stroke=9ca3af&ring=ffffff&fire=ffffff&currStreakLabel=ffffff`}
            alt="GitHub streak"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default About;
