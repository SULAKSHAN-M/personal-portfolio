import project1 from "@/assets/projects_img/project-1.png";
import project2 from "@/assets/projects_img/project-2.png";
import project3 from "@/assets/projects_img/project-3.png";
import project4 from "@/assets/projects_img/project-4.png";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ExternalLink, Github, Target, Wrench, TrendingUp } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "MNIST Digit Classifier & Webcam Recognition",
    description:
      "Built a Convolutional Neural Network (Keras/TensorFlow) to recognize handwritten digits from the 70,000-image MNIST dataset using stacked Conv2D/MaxPooling layers with Dropout, then extended it into a real-time recognition tool using OpenCV and a live webcam feed.",
    image: project1,
    github: "https://github.com/S18260212S/mnist-cnn-digit-classifier",
    live: "",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
  },
  {
    id: 2,
    title: "The Cube Game",
    description:
      "A web-based interactive Rubik's Cube game letting users rotate faces, scramble, and manipulate a 3D cube in the browser to practice 3D logic, animation, and interactive controls.",
    image: project2,
    github: "https://github.com/SULAKSHAN-M/The-Cube-Game",
    live: "",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    title: "Email Spam Detector",
    description:
      "A machine learning-based classifier built to detect and filter spam emails, distinguishing spam from legitimate messages.",
    image: project3,
    github: "https://github.com/SULAKSHAN-M/EMail-Spam-Detector",
    live: "",
    tags: ["Python", "Machine Learning"],
  },
  {
    id: 4,
    title: "IBM Full Stack Application Development Capstone",
    description:
      "Capstone project for the IBM Full Stack Application Development Professional Certificate, applying full-stack web development skills covered across the program.",
    image: project4,
    github:
      "https://github.com/S18260212S/IBM-Full-Stack-Application-Development-Capstone-Project",
    live: "",
    tags: ["Full-Stack", "Web Development"],
  },
];

const caseStudy = {
  title: "Hotel Management System",
  subtitle: "Full Stack Developer Intern @ Octick (Pvt) Ltd. — Dec 2024 to Jun 2025",
  problem:
    "Small–medium hotels needed a responsive, AI-assisted system to manage daily operations more efficiently.",
  approach:
    "Conducted independent UI/UX research to shape a production-ready design, built a full responsive hotel management system, and integrated AI functionality to assist with daily operations — collaborating within a 4-member development team.",
  result:
    "Delivered the project on schedule as a live internship project, improving day-to-day efficiency for end users.",
};

const Projects = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Featured Projects
        </h2>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="mb-12 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-white/5 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold mb-1">{caseStudy.title}</h3>
          <p className="text-gray-500 text-sm mb-6">{caseStudy.subtitle}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-300">
                <Target className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Problem
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-300">
                <Wrench className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Approach
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {caseStudy.approach}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-300">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Result
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {caseStudy.result}
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ScrollAnimation key={project.id}>
            <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm h-full flex flex-col">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-purple-500/20 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
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

export default Projects;
