"use client";
import type { ExperienceProps } from '@/components/common/Canva';
import TextComponent from '@/components/common/TextComponent';
import { IsDesktopHook } from '@/utils/isDesktop';
import { ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MaskIphoneX from '/public/mask-iphone-x.webp';

export default function ExperienceMobile({ visible = true, projects, loadingProject, isLoadingProject }: ExperienceProps) {

  const [currentProject, setCurrentProject] = useState(loadingProject);
  const mobile = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf', true)
  const [isLoading, setIsLoading] = useState(isLoadingProject || false);
  const isDesktop = IsDesktopHook();

  useEffect(() => {
    setIsLoading(true);
    if (loadingProject !== currentProject) {
      const project = projects.find(p => p.id === loadingProject);
      if (project) {
        setCurrentProject(project.id);
      }
    }
  }, [currentProject, projects, loadingProject, isDesktop]);

  const primitivePosition = isDesktop ? { x: 1.2, y: -1.2, z: 0 } : { x: 0, y: -1.4, z: 0 };
  const primitiveScale = isDesktop ? 0.8 : 1;
  const textPosition: [number, number, number] = isDesktop ? [2.8, 0.45, 0.75] : [0.1, 2.1, 0.25];
  const textRotationY = isDesktop ? -1.25 : 0;
  const textFontSize = isDesktop ? 0.24 : 0.20;

  return <>
    <group visible={visible}>
      <color args={['#241a1a']} attach="background" />
      <Environment preset="warehouse" />

      <PresentationControls
        global
        rotation={[-0.1, 0.1, 0]}
        polar={[- 0.4, 0.2]}
        azimuth={[- 0.2, 0.2]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4} >
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={projects[currentProject].shadowColor}
            rotation={[- 0.1, Math.PI, 0]}
            position={[2, 0.55, - 1.15]}
          />

          <primitive
            object={mobile.scene}
            position-y={primitivePosition.y}
            position-x={primitivePosition.x}
            scale={primitiveScale}
          >
            {visible && (
              <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={1.62}
                position={[0.175, 1.32, 0.06]}
                rotation-x={0}
                rotation-y={0.02}
              >
                <div className='w-[375px] h-[804px] border-none bg-[#241a1a] relative flex items-center justify-center rounded-[50px]'>
                  {isLoading && (
                    <div className="absolute flex items-center z-20 justify-center bg-[#241a1a] rounded-[50px] w-full h-full">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                  <figure className='absolute top-0 left-0 z-10 w-full h-full clip-path-iphone-x'>
                    <Image
                      src={MaskIphoneX}
                      alt={"mask-iphone-x"}
                      width={375}
                      height={718}
                      className='w-full h-full object-cover z-0'
                    />
                  </figure>
                  <iframe
                    className='w-[375px] h-[718px] border-none relative z-0  overflow-hidden'
                    src={projects[currentProject].iframe}
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              </Html>
            )}
          </primitive>

          <TextComponent position={textPosition} rotationY={textRotationY} maxWidth={2.3} fontSize={textFontSize}>
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