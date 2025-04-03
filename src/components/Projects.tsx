import React, { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Uma plataforma completa de e-commerce com sistema de pagamento, gestão de produtos e área do cliente.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Aplicativo de gerenciamento de tarefas com recursos de colaboração, notificações e integrações.",
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2032&q=80",
    tags: ["React Native", "Firebase", "Redux"],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "Real Estate Platform",
    description:
      "Plataforma imobiliária com busca avançada, mapa interativo e sistema de agendamento de visitas.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "MapBox"],
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "Financial Dashboard",
    description:
      "Dashboard financeiro com visualizações de dados, relatórios e previsões baseadas em IA.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["React", "D3.js", "Node.js", "TensorFlow"],
    github: "#",
    live: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setRotation({ x: y * 10, y: x * -10 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="project-card glass rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${
          rotation.y
        }deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? "none" : "transform 0.5s ease-out",
      }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform transition-transform duration-500"
          style={{ transform: `scale(${isHovered ? 1.1 : 1})` }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-2">
          {project.title}
        </h3>
        <p className="dark:text-slate-300 text-slate-600 text-sm mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-highlight text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between">
          {project.github && (
            <a
              href={project.github}
              className="flex items-center text-slate-600 dark:text-slate-300 hover:text-highlight dark:hover:text-highlight transition-colors"
            >
              <Github size={16} className="mr-1" />
              <span>Código</span>
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              className="flex items-center text-slate-600 dark:text-slate-300 hover:text-highlight dark:hover:text-highlight transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-100 dark:bg-slate-900/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-slate-800 dark:text-white">Meus </span>
          <span className="text-highlight">Projetos</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
