import {
  Code2,
  Layout,
  Cloud,
  Terminal,
  Wrench,
  Users,
  Brain,
  MessageSquare,
  GitBranch,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  JavaScriptLogo,
  ReactLogo,
  NodeLogo,
  MongoDBLogo,
  VSCodeLogo,
  GitLogo,
  TailwindLogo,
  PythonLogo,
  ExpressLogo,
  AWSLogo,
  PostmanLogo,
  WindowsLogo,
  UbuntuLogo,
  LinuxLogo,
} from "@/components/TechLogos";

const PRACTICAL = "practical";
const FAMILIAR = "familiar";

// Real brand colors — used for the hover glow/tint on each skill chip.
const skills = [
  {
    category: "Programming Languages",
    color: "#F7DF1E",
    icon: <Code2 className="w-6 h-6" />,
    items: [
      { name: "JavaScript", icon: <JavaScriptLogo />, level: PRACTICAL, color: "#F7DF1E" },
      { name: "Python", icon: <PythonLogo />, level: PRACTICAL, color: "#3776AB" },
      { name: "HTML/CSS", icon: <Code2 className="w-4 h-4" />, level: PRACTICAL, color: "#E34F26" },
    ],
  },
  {
    category: "Full-Stack Development",
    color: "#61DAFB",
    icon: <Layout className="w-6 h-6" />,
    items: [
      { name: "React.js", icon: <ReactLogo />, level: PRACTICAL, color: "#61DAFB" },
      { name: "Node.js", icon: <NodeLogo />, level: PRACTICAL, color: "#339933" },
      { name: "Express", icon: <ExpressLogo />, level: PRACTICAL, color: "#68A063" },
      { name: "Tailwind", icon: <TailwindLogo />, level: FAMILIAR, color: "#38BDF8" },
      { name: "MongoDB", icon: <MongoDBLogo />, level: FAMILIAR, color: "#47A248" },
    ],
  },
  {
    category: "Artificial Intelligence",
    color: "#FF6F00",
    icon: <Brain className="w-6 h-6" />,
    items: [
      { name: "TensorFlow", icon: <Brain className="w-4 h-4" />, level: PRACTICAL, color: "#FF6F00" },
      { name: "Keras", icon: <Brain className="w-4 h-4" />, level: PRACTICAL, color: "#D00000" },
      { name: "OpenCV", icon: <Brain className="w-4 h-4" />, level: PRACTICAL, color: "#5C3EE8" },
    ],
  },
  {
    category: "Cloud Computing",
    color: "#38BDF8",
    icon: <Cloud className="w-6 h-6" />,
    items: [
      { name: "Cloud Platforms", icon: <Cloud className="w-4 h-4" />, level: FAMILIAR, color: "#38BDF8" },
      { name: "AWS", icon: <AWSLogo />, level: FAMILIAR, color: "#FF9900" },
    ],
  },
  {
    category: "Version Control & Tools",
    color: "#F05032",
    icon: <GitBranch className="w-6 h-6" />,
    items: [
      { name: "Git", icon: <GitLogo />, level: PRACTICAL, color: "#F05032" },
      { name: "GitHub", icon: <GitLogo />, level: PRACTICAL, color: "#E5E7EB" },
      { name: "VS Code", icon: <VSCodeLogo />, level: PRACTICAL, color: "#007ACC" },
      { name: "Postman", icon: <PostmanLogo />, level: FAMILIAR, color: "#FF6C37" },
    ],
  },
  {
    category: "Operating Systems",
    color: "#00A4EF",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      { name: "Windows", icon: <WindowsLogo />, level: PRACTICAL, color: "#00A4EF" },
      { name: "Ubuntu", icon: <UbuntuLogo />, level: FAMILIAR, color: "#E95420" },
      { name: "Linux", icon: <LinuxLogo />, level: FAMILIAR, color: "#FCC624" },
    ],
  },
  {
    category: "Soft Skills",
    color: "#F472B6",
    icon: <Users className="w-6 h-6" />,
    items: [
      { name: "Teamwork", icon: <Users className="w-4 h-4" />, color: "#F472B6" },
      { name: "Communication", icon: <MessageSquare className="w-4 h-4" />, color: "#38BDF8" },
      { name: "Problem-Solving", icon: <Wrench className="w-4 h-4" />, color: "#FBBF24" },
      { name: "Adaptability", icon: <Brain className="w-4 h-4" />, color: "#A78BFA" },
    ],
  },
];

const levelLabel = {
  [PRACTICAL]: "Practical experience",
  [FAMILIAR]: "Familiar",
};

const levelWidth = {
  [PRACTICAL]: "w-4/5",
  [FAMILIAR]: "w-2/5",
};

const Skills = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Technical Skills
        </h2>
      </ScrollAnimation>

      <ScrollAnimation>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A comprehensive overview of my technical expertise and tools I work
          with
        </p>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup) => (
          <ScrollAnimation key={skillGroup.category}>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5">
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="relative p-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-default"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${skillGroup.color}22`;
                    e.currentTarget.style.boxShadow = `0 0 18px -2px ${skillGroup.color}`;
                    e.currentTarget.firstChild.style.color = skillGroup.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.firstChild.style.color = "";
                  }}
                >
                  <div className="transition-colors duration-300">{skillGroup.icon}</div>
                </div>
                <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-300 group overflow-hidden hover:-translate-y-0.5"
                    style={{ "--brand": skill.color || "#e5e7eb" }}
                  >
                    {/* brand-color glow, fades in on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 20% 30%, var(--brand), transparent 70%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 1px var(--brand)" }}
                    />

                    <div className="relative flex items-center gap-2 mb-2">
                      <div
                        className="transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
                        style={{ color: "#9ca3af" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = skill.color || "#e5e7eb")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                        {skill.name}
                      </span>
                    </div>
                    {skill.level && (
                      <>
                        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-colors duration-300 bg-white/60 group-hover:bg-[var(--brand)] ${levelWidth[skill.level]}`}
                          />
                        </div>
                        <span className="relative text-[10px] text-gray-500 mt-1 block">
                          {levelLabel[skill.level]}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Skills;
