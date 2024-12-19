"use client";
import type { ExperienceProps } from '@/components/common/Canva';
import TextComponent from '@/components/common/TextComponent';
import { IsDesktopHook } from '@/utils/isDesktop';
import { ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function ExperienceDesktop({ visible = true, projects, loadingProject, isLoadingProject }: ExperienceProps) {

  const [currentProject, setCurrentProject] = useState(loadingProject);
  const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf', true);
  const [isLoading, setIsLoading] = useState(isLoadingProject || false);
  const isDesktop = IsDesktopHook();

  const primitivePosition = isDesktop ? { x: 1.6, y: -1.4, z: 0 } : { x: 0, y: -1.4, z: 0 };
  const textPosition: [number, number, number] = isDesktop ? [3.2, 0.45, 0.25] : [-0.1, 2, 0.25];
  const textRotationY = isDesktop ? -1.35 : 0;
  const textFontSize = isDesktop ? 0.28 : 0.20;

  useEffect(() => {
    setIsLoading(true);
    if (loadingProject !== currentProject) {
      const project = projects.find(p => p.id === loadingProject);
      if (project) {
        setCurrentProject(project.id);
      }
    }
  }, [currentProject, projects, loadingProject, isDesktop]);

  return <>
    <group visible={visible}>
      <color args={['#241a1a']} attach="background" />
      <Environment preset="city" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[- 0.4, 0.2]}
        azimuth={[- 0.5, 0.85]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={projects[currentProject].shadowColor}
            rotation={[- 0.1, Math.PI, 0]}
            position={[2, 0.55, - 1.15]}
          />

          <primitive
            object={computer.scene}
            position-y={primitivePosition.y}
            position-x={primitivePosition.x}
          >
            {visible && (
              <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={1.17}
                position={[0, 1.56, - 1.4]}
                rotation-x={- 0.256}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black rounded-2xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
                <iframe
                  className='w-[1024px] h-[670px] border-none rounded-2xl bg-[#000000]'
                  src={projects[currentProject].iframe}
                  onLoad={() => setIsLoading(false)}
                />
              </Html>
            )}
          </primitive>

          <TextComponent position={textPosition} rotationY={textRotationY} fontSize={textFontSize}>
            {projects[currentProject].tags}
          </TextComponent>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={- 1.4}
        opacity={0.4}
        scale={5}
        blur={2.4}
      />
    </group>
  </>
}