"use client";
import ExperienceDesktop from "@/components/desktop/ExperienceDesktop";
import ExperienceMobile from "@/components/mobile/ExperienceMobile";
import { IsDesktopHook } from "@/utils/isDesktop";
import { useProgress } from "@react-three/drei";
import { Canvas, } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";



export type ExperienceProps = {
  projects: {
    id: number;
    title: string;
    img: string;
    shadowColor: string;
    tags: string;
    iframe: string;
  }[];
  visible: boolean;
  loadingProject: number;
  isLoadingProject: boolean;
};


export default function CanvaComponent({ projects, loadingProject, isLoadingProject, isMobile }: { projects: any, loadingProject: any, isLoadingProject: any, isMobile: any }) {

  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (progress > displayProgress) {
      setDisplayProgress(progress);
    }
    if (progress >= 99.99) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [progress, displayProgress]);

  const cameraPosition: [number, number, number] = IsDesktopHook() ? [-1, 1.5, 5] : [-1, 1.5, 8];
  return (
    <>
      {loading && <LoadingScreen progress={Math.min(displayProgress, 100)} />}
      <div className="w-full h-screen absolute md:sticky top-0 left-0 z-0 overflow-hidden">
        <Canvas
          className="touch-none w-full h-full"
          camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: cameraPosition
          }}>
          <Suspense fallback={null}>
            <ExperienceMobile visible={isMobile} projects={projects} loadingProject={loadingProject} isLoadingProject={isMobile} />
            <ExperienceDesktop visible={!isMobile} projects={projects} loadingProject={loadingProject} isLoadingProject={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}