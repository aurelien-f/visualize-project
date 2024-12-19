"use client";

import ExperienceDesktop from "@/components/desktop/ExperienceDesktop";
import ExperienceMobile from "@/components/mobile/ExperienceMobile";
import { IsDesktopHook } from "@/utils/isDesktop";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
export type ExperienceProps = {
  projects: {
    id: number;
    title: string;
    img: string;
    shadowColor: string;
    tags: string;
    iframe: string;
  }[];
  loadingProject: number;
  isLoadingProject: boolean;
};

export default function Home() {
  const projects = [
    {
      id: 0,
      title: "Yoca solutions",
      img: "/Yoca-solutions-16-12-2024.png",
      shadowColor: "#f8fb5f",
      tags: "Site administrable\n2024",
      iframe: "https://yoca-solutions.com/",
    },
    {
      id: 1,
      title: "Davy baborier",
      shadowColor: "#ff6900",
      img: "/Davy-baborier-16-12-2024.png",
      tags: "Site administrable\ngestion de projet\n2024",
      iframe: "https://davybaborier.fr/",
    },
    {
      id: 2,
      title: "Davy baborier",
      shadowColor: "#ff6900",
      img: "/Davy-baborier-16-12-2024.png",
      tags: "Site administrable\ngestion de projet\n2024",
      iframe: "https://davybaborier.fr/",
    },
    {
      id: 3,
      title: "Davy baborier",
      shadowColor: "#11cd40",
      img: "/Davy-baborier-16-12-2024.png",
      tags: "Site administrable\ngestion de projet\n2024",
      iframe: "https://davybaborier.fr/",
    },
  ];

  const [loadingProject, setLoadingProject] = useState(projects[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleProjectChange = (projectId: number) => {
    setLoadingProject(projectId);
    setIsLoading(true);
  };

  const toggleView = () => {
    setIsMobile(!isMobile);
    setIsLoading(true);
  };

  const cameraPosition: [number, number, number] = IsDesktopHook() ? [-1, 1.5, 5] : [-1, 1.5, 8];

  return (
    <main className="w-screen flex flex-col md:flex-row relative overflow-x-hidden bg-[#241a1a]">
      <div className="w-full md:w-[40vw] md:absolute top-0 left-0 z-10 py-[8vw]">
        <h1 className="text-white ~text-2xl/5xl text-center mb-14 tracking-wide font-bold">
          Découvrez mes projets
        </h1>
        <div className="flex flex-col gap-[3.2vw] w-full justify-center px-8">
          {projects.map((project) => {
            return (
              <button
                key={project.id}
                onClick={() => handleProjectChange(project.id)}
                className={`~text-2xl/5xl tracking-wide font-base font-bold hover:text-[#b3b3b3] transition-all duration-300 ease-in-out`}
              >
                {project.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-auto  flex items-center justify-center flex-col mt-8 md:mt-0 md:absolute md:top-6 md:right-[10vw] z-20">
        <p className="text-white text-xl text-center tracking-wide mb-4 font-bold">Version responsive</p>
        <label className='flex cursor-pointer select-none items-center gap-4' >
          <p className="text-white text-sm tracking-wide">Desktop</p>
          <div className='relative'>
            <input
              type='checkbox'
              checked={isMobile}
              onChange={toggleView}
              className='sr-only'
            />
            <div className='block h-8 w-14 rounded-full bg-[#E5E7EB]'></div>
            <div
              className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-black transition-all duration-300 ease-in-out ${isMobile ? 'translate-x-6' : 'translate-x-0'
                }`}
            ></div>
          </div>
          <p className="text-white text-sm tracking-wide">Mobile</p>
        </label>
      </div>
      <div className="w-full h-screen md:sticky top-0 left-0 z-0 overflow-hidden">
        <Canvas
          className="touch-none w-full h-full"
          camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: cameraPosition
          }}
        >
          {isMobile ? (
            <ExperienceMobile projects={projects} loadingProject={loadingProject} isLoadingProject={isLoading} />
          ) : (
            <ExperienceDesktop projects={projects} loadingProject={loadingProject} isLoadingProject={isLoading} />
          )}
        </Canvas>
      </div>
    </main>
  );
}
