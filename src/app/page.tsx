"use client";

import ExperienceDesktop from "@/components/desktop/ExperienceDesktop";
import ExperienceMobile from "@/components/mobile/ExperienceMobile";
import { IsDesktopHook } from "@/utils/isDesktop";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { GoDeviceDesktop } from "react-icons/go";
import { ImMobile } from "react-icons/im";

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
      tags: "Site vitrine\nAdministrable\n2024",
      iframe: "https://davybaborier.fr/",
    },
    {
      id: 2,
      title: "Beratone Game",
      shadowColor: "#ffeecf",
      img: "/Davy-baborier-16-12-2024.png",
      tags: "Onepage\n2024",
      iframe: "https://www.beratone-game.com/en-US",
    },
    {
      id: 3,
      title: "Le meilleur vin du monde",
      shadowColor: "#9b5979",
      img: "/Davy-baborier-16-12-2024.png",
      tags: "Site vitrine\nE-commerce\n2024",
      iframe: "https://www.lemeilleurvindumonde.fr/",
    },
  ];

  const [loadingProject, setLoadingProject] = useState(projects[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleProjectChange = (projectId: number, isMobile?: boolean) => {
    if (projectId !== loadingProject) {
      setLoadingProject(projectId);
      if (isMobile !== undefined) {
        setIsMobile(isMobile);
      }
      setIsLoading(true);
    } else if (isMobile !== undefined) {
      setIsMobile(isMobile);
      setIsLoading(true);
    }
  };

  const toggleView = () => {
    setIsMobile(!isMobile);
    setIsLoading(true);
  };

  const cameraPosition: [number, number, number] = IsDesktopHook() ? [-1, 1.5, 5] : [-1, 1.5, 8];

  return (
    <main className="w-screen flex flex-col md:flex-row relative overflow-x-hidden bg-[#241a1a]">
      <div className="w-full md:w-[40vw] md:h-screen flex flex-col justify-center items-center md:absolute top-0 left-0 z-10 py-[8vw] px-6 md:pl-12">
        <div>
          <h1 className="text-jaune ~text-2xl/5xl text-left mb-14 tracking-wide font-fjalla">
            Découvrez mes projets
          </h1>
          <div className="inline-flex flex-col gap-8 md:gap-[3.2vw] w-full items-start">
            {projects.map((project) => {
              return (
                <div key={project.id} className="flex gap-4 flex-row-reverse md:flex-row">
                  <button
                    onClick={() => handleProjectChange(project.id)}
                    className={`~text-2xl/4xl tracking-wide font-base text-left font-bold hover:text-jaune transition-all duration-300 ease-in-out md:flex-shrink-0`}
                  >
                    {project.title}
                  </button>
                  <div className="flex gap-4 p-2 md:border-l pr-4 md:pr-0 md:pl-4 border-white border-r md:border-r-0">
                    <button onClick={() => handleProjectChange(project.id, false)}><GoDeviceDesktop className="size-8 md:size-10 text-white hover:text-jaune transition-all duration-300 ease-in-out" /></button>
                    <button onClick={() => handleProjectChange(project.id, true)}><ImMobile className="size-8 md:size-10 text-white hover:text-jaune transition-all duration-300 ease-in-out" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto  flex items-center justify-center flex-col mt-8 md:mt-0 md:absolute md:top-8 md:right-8 z-20">
        <label className='flex cursor-pointer select-none items-center gap-4' >
          <p className="text-white text-xl font-bold tracking-wide">Desktop</p>
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
          <p className="text-white text-xl font-bold tracking-wide">Mobile</p>
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
