"use client";
import { Model as SmartTv } from '@/components/models/SmartTv';
import { Environment, PresentationControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Group, TextureLoader } from 'three';

type HouseProps = {
  activeModel: string;
  targetRotation: number;
}

const ArmChair = () => {
  const armChair = useGLTF('/models/armchair7.glb');

  return (
    <mesh position={[0.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={armChair.scene} scale={0.7} />
    </mesh>
  )
}

const Sofa = () => {
  const sofa = useGLTF('/models/sofa.glb');
  return (
    <mesh position={[0.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={sofa.scene} scale={0.55} />
    </mesh>
  )
}

const MeubleTv = () => {
  const meubleTv = useGLTF('/models/meubletv.glb');
  return (
    <mesh position={[0, 0, 0]}>
      <primitive object={meubleTv.scene} scale={0.7} />
    </mesh>
  )
}

const Walls = () => {

  const [wallpaper38, wallpaper43] = useLoader(TextureLoader, [
    '/textures/walls/wallpaper38.png',
    '/textures/walls/wallpaper43.png'
  ]);

  return (
    <group position={[0, -0.025, 0]}>
      <mesh position={[0, 1, -0.975]}>
        <boxGeometry args={[2, 1.8, 0.05]} />
        <meshStandardMaterial map={wallpaper38 as any} />
      </mesh>
      <mesh position={[-0.95, 1, 0.025]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.95, 1.8, 0.1]} />
        <meshStandardMaterial map={wallpaper38 as any} />
      </mesh>
    </group>
  )
}

const Floor = () => {
  const [woodParquet91, woodParquet92] = useLoader(TextureLoader, [
    '/textures/floor/woodParquet91.png',
    '/textures/floor/woodParquet92.png'
  ]);

  woodParquet91.repeat.set(4, 4);
  woodParquet91.wrapS = THREE.RepeatWrapping;
  woodParquet91.wrapT = THREE.RepeatWrapping;

  woodParquet92.repeat.set(4, 4);
  woodParquet92.wrapS = THREE.RepeatWrapping;
  woodParquet92.wrapT = THREE.RepeatWrapping;

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 0.15, 2]} />
      <meshStandardMaterial map={woodParquet91 as any} bumpScale={0.2} />
    </mesh>
  )
}

const House = ({ activeModel, targetRotation }: HouseProps) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (-targetRotation - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group
      position={[0, -1, 0]}
      name="house"
      ref={groupRef as any}
    >
      <Walls />
      <Floor />
      {activeModel === 'armchair' ? <ArmChair /> : <Sofa />}
      <Environment preset="sunset" />
      <group position={[-0.758, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <MeubleTv />
        <SmartTv scale={0.1} position={[0, 0.298, 0]} />
      </group>
    </group>
  );
};

const Scene = () => {
  const [activeModel, setActiveModel] = useState('armchair');
  const [targetRotation, setTargetRotation] = useState(0);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  const handleModelChange = (newModel: string) => {
    setTargetRotation(prev => prev + Math.PI * 2);

    setTimeout(() => {
      setActiveModel(newModel);
    }, 200);
  };

  useEffect(() => {
    // Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === section1Ref.current) {
              handleModelChange('armchair');
            } else if (entry.target === section2Ref.current) {
              handleModelChange('sofa');
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);

    // Wheel event setup
    const canvas = document.querySelector('.canvas-container');
    if (canvas) {
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, { passive: false });
    }

    // Cleanup
    return () => {
      observer.disconnect();
      canvas?.removeEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    };
  }, []);

  return (
    <div className="flex justify-end">
      <div
        className="w-3/4 h-screen fixed top-0 left-0 canvas-container touch-none"
      >
        <Canvas shadows camera={{
          fov: 35,
          near: 1,
          far: 35,
          position: [0, 0, 6.5]
        }}>
          <PresentationControls
            global
            rotation={[Math.PI / 6, -Math.PI / 4, 0]}
            polar={[-0.5, 1]}
            azimuth={[- 1, 1]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
              <axesHelper args={[5]} />
              <House activeModel={activeModel} targetRotation={targetRotation} />
            </Suspense>
          </PresentationControls>
        </Canvas>
      </div>
      <div className="w-1/4 p-6 overflow-y-auto">
        <div ref={section1Ref} data-item="armchair" className='h-screen flex flex-col justify-center items-start gap-5 px-4'>
          <h2 className='text-2xl font-bold'>Modèle de canapé 1</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nul
          </p>
        </div>
        <div ref={section2Ref} data-item="sofa" className='h-screen flex flex-col justify-center items-start gap-5 px-4'>
          <h2 className='text-2xl font-bold'>Modèle de canapé 2</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nul
          </p>
        </div>
      </div>
    </div>
  )
}

export default Scene

useGLTF.preload('/models/armchair7.glb')
useGLTF.preload('/models/sofa.glb')
useGLTF.preload('/models/meubletv.glb')