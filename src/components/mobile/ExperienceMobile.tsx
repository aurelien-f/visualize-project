"use client";
import { ExperienceProps } from '@/app/page';
import TextComponent from '@/components/common/TextComponent';
import { ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MaskIphoneX from '/public/mask-iphone-x.webp';
export default function ExperienceMobile({ projects, loadingProject, isLoadingProject }: ExperienceProps) {

  const [currentProject, setCurrentProject] = useState(loadingProject);
  const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf')
  const [isLoading, setIsLoading] = useState(isLoadingProject || false);

  useEffect(() => {
    if (loadingProject !== currentProject) {
      setIsLoading(true);
      const project = projects.find(p => p.id === loadingProject);
      if (project) {
        setCurrentProject(project.id);
      }
    }
  }, [currentProject, projects, loadingProject]);

  return <>
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
          object={computer.scene}
          position-y={-1.2}
          position-x={1.2}
          scale={0.8}
        >
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
        </primitive>

        <TextComponent position={[2.8, 0.45, 0.75]} rotationY={-1.25} maxWidth={2.3} fontSize={0.24}>
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
  </>
}