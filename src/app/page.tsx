"use client";

import CanvaComponent from "@/components/common/Canva";
import { useState } from "react";
import { GoDeviceDesktop } from "react-icons/go";
import { ImMobile } from "react-icons/im";
import { IoFilterSharp } from "react-icons/io5";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleProjectChange = (projectId: number, isMobile?: boolean) => {
    if (projectId !== loadingProject) {
      setLoadingProject(projectId);
      setIsFilterOpen(false);
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

  return (
    <main className="w-screen flex flex-col md:flex-row h-screen md:h-auto selection:relative overflow-x-hidden bg-[#241a1a]">
      <div className="w-full md:w-[40vw] md:h-screen flex flex-col justify-center items-center md:absolute top-0 left-0 z-10 py-[8vw] px-6 md:pl-12">
        <div>
          <h1 className="text-jaune text-center md:text-left ~text-2xl/5xl mb-14 tracking-wide font-fjalla">
            Découvrez mes projets
          </h1>
          <div className="inline-flex w-full md:w-auto relative z-40">
            <div
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden z-30 flex items-center cursor-pointer justify-between gap-4 bg-white/10 backdrop-blur-sm px-4 h-16 w-full fixed bottom-0 right-0"
            >
              <IoFilterSharp className="size-6 text-white" />
              <span className="text-white text-xl font-bold">{projects[loadingProject].title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleView();
                }}
              >
                {isMobile ? (
                  <GoDeviceDesktop className="size-6 text-white" />
                ) : (
                  <ImMobile className="size-6 text-white" />
                )}
              </button>
            </div>
            <div className={`w-full flex flex-col gap-0 md:gap-8 items-start fixed md:flex md:relative bg-[#241a1a] border-t border-white md:border-none md:bg-transparent bottom-0 right-0 z-20 transition-all duration-300 ease-in-out ${isFilterOpen ? 'bottom-16 top-auto md:bottom-0' : 'top-full bottom-0 md:top0'}`}>
              {projects.map((project) => {
                return (
                  <div key={project.id} className="flex gap-6 md:flex-row border-b border-white md:border-none w-full px-6 py-2 md:py-0 md:px-0">
                    <button
                      onClick={() => handleProjectChange(project.id)}
                      className={`text-xl md:~text-2xl/3xl tracking-wide w-full md:w-auto font-base text-left font-bold hover:text-jaune transition-all duration-300 ease-in-out md:flex-shrink-0`}
                    >
                      {project.title}
                    </button>
                    <div className="hidden gap-4 p-2 md:border-l pr-4 md:pr-0 md:pl-6 border-white border-r md:border-r-0 md:flex">
                      <button onClick={() => handleProjectChange(project.id, false)}><GoDeviceDesktop className="size-8 text-white hover:text-jaune transition-all duration-300 ease-in-out" /></button>
                      <button onClick={() => handleProjectChange(project.id, true)}><ImMobile className="size-8 text-white hover:text-jaune transition-all duration-300 ease-in-out" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto hidden md:flex items-center justify-center flex-col mt-8 md:mt-0 md:absolute md:top-8 md:right-8 z-20">
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
      <CanvaComponent projects={projects} loadingProject={loadingProject} isLoadingProject={isLoading} isMobile={isMobile} />
    </main>
  );
}
