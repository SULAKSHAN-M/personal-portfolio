import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://sulakshan1.vercel.app";

const PAGE_META = {
  "/": {
    title: "Sulakshan Marudanayagam - Software Engineering Undergraduate",
    description:
      "Sulakshan Marudanayagam — Software Engineering undergraduate specializing in Full Stack Development, Cloud & AI. Based in Sri Lanka.",
  },
  "/about": {
    title: "About - Sulakshan Marudanayagam | Software Engineering Undergraduate",
    description:
      "Learn about Sulakshan Marudanayagam — Software Engineering undergraduate at Edith Cowan University, Sri Lanka, with full-stack internship experience.",
  },
  "/projects": {
    title: "Projects - Sulakshan Marudanayagam | Portfolio",
    description:
      "Explore projects built by Sulakshan Marudanayagam, including AI/ML classifiers, web games and full-stack capstone applications.",
  },
  "/skills": {
    title: "Skills - Sulakshan Marudanayagam | Full Stack, Cloud & AI",
    description:
      "Technical skills of Sulakshan Marudanayagam — Full-Stack Development, UI/UX Design, Cloud Computing, and Artificial Intelligence.",
  },
  "/experience": {
    title: "Experience - Sulakshan Marudanayagam | Full Stack Developer Intern",
    description:
      "Professional experience of Sulakshan Marudanayagam, including a Full Stack Developer internship at Octick (Pvt) Ltd.",
  },
  "/education": {
    title: "Education - Sulakshan Marudanayagam | B.Sc. Software Engineering",
    description:
      "Educational background of Sulakshan Marudanayagam — B.Sc. Major in Software Engineering at Edith Cowan University, Sri Lanka.",
  },
  "/certificates": {
    title: "Certificates - Sulakshan Marudanayagam | Google, IBM & Meta Certifications",
    description:
      "Professional certifications of Sulakshan Marudanayagam in IT support, UX design, AI development, front-end development, and full-stack software development.",
  },
  "/contact": {
    title: "Contact - Sulakshan Marudanayagam | Software Engineering Undergraduate",
    description:
      "Get in touch with Sulakshan Marudanayagam for internship opportunities, projects or collaborations.",
  },
};

const FALLBACK_META = {
  title: "Sulakshan Marudanayagam - Software Engineering Undergraduate",
  description:
    "Portfolio of Sulakshan Marudanayagam — Software Engineering undergraduate specializing in Full Stack Development, Cloud & AI.",
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_META[location.pathname] ?? FALLBACK_META;
    const url = `${BASE_URL}${location.pathname}`;

    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [location.pathname]);
};
