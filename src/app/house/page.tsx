"use client";
import TextComponent from '@/components/common/TextComponent';
import { Environment, Html, PresentationControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Group, TextureLoader } from 'three';
type HouseProps = {
  activeModel: string;
  targetRotation: number;
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const ArmChair = () => {
  const armChair = useGLTF('/models/armchair7.glb');

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <primitive object={armChair.scene} scale={0.75} />
      </mesh>
      <TextComponent position={[0.65, 0.1, 0]} rotationY={0} rotationZ={Math.PI / 2} rotationX={-Math.PI / 2} >Armchair</TextComponent>
    </>
  )
}

const Sofa = () => {
  const sofa = useGLTF('/models/sofa.glb');
  return (
    <>
      <mesh position={[0, -0.065, 0]} rotation={[0, -Math.PI / 2, -Math.PI]}>
        <primitive object={sofa.scene} scale={0.55} />
      </mesh>
      <TextComponent position={[-0.65, -0.1, 0]} rotationY={0} rotationZ={-Math.PI / 2} rotationX={Math.PI / 2}  >Sofa</TextComponent>
    </>
  )
}

const Walls = ({ currentColor }: { currentColor: string }) => {

  const [wallpaper38, wallpaper43] = useLoader(TextureLoader, [
    '/textures/walls/wallpaper38.png',
    '/textures/walls/wallpaper43.png'
  ]);

  const wallColor = currentColor === 'wallpaper38' ? wallpaper38 : wallpaper43;

  return (
    <group position={[0, -0.025, 0]}>
      <mesh position={[0, 1, -0.975]}>
        <boxGeometry args={[2, 1.8, 0.05]} />
        <meshStandardMaterial map={wallColor as any} />
      </mesh>
      <mesh position={[-0.95, 1, 0.025]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.95, 1.8, 0.1]} />
        <meshStandardMaterial map={wallColor as any} />
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

const SelectColorWalls = ({ currentColor, setCurrentColor }: { currentColor: string, setCurrentColor: (color: string) => void }) => {

  const wallpapers = [
    { id: 'wallpaper38', name: 'Blanc' },
    { id: 'wallpaper43', name: 'Gris' }
  ];

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Couleur des murs :</h2>
      <div className="flex gap-6 mt-6">
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className="flex flex-col items-center gap-2"
            onClick={() => setCurrentColor(wallpaper.id)}
          >
            <div
              className={`size-12 rounded-full cursor-pointer transition-all duration-200 ${currentColor === wallpaper.id ? 'ring-4 ring-blue-500' : ''
                }`}
              style={{
                backgroundImage: `url(/textures/walls/${wallpaper.id}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <span className="text-sm text-white font-bold">{wallpaper.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const House = ({ activeModel, targetRotation, currentColor, setCurrentColor }: HouseProps) => {
  const groupRef = useRef<Group>(null);
  const [wallColor, setWallColor] = useState(currentColor);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += (targetRotation - groupRef.current.rotation.z) * 0.05;
    }
  });

  useEffect(() => {
    setWallColor(currentColor);
  }, [currentColor]);

  return (
    <group
      position={[0, -1, 0]}
      name="house"
    >
      <Walls currentColor={wallColor} />
      <group rotation={[0, 0, 0]} ref={groupRef as any}>
        <Floor />
        <ArmChair />
        <Sofa />
      </group>
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.17}
        position={[0.7, 1.6, - 0.92]}
      >
        <SelectColorWalls currentColor={currentColor} setCurrentColor={setCurrentColor} />
      </Html>
      <Environment preset="sunset" />
    </group>
  );
};

const Scene = () => {
  const [activeModel, setActiveModel] = useState('armchair');
  const [targetRotation, setTargetRotation] = useState(0);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const [currentColor, setCurrentColor] = useState('wallpaper38');

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  }

  const handleModelChange = (newModel: string, valueRotation: number) => {
    setTargetRotation(valueRotation);
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
              handleModelChange('armchair', 0);
            } else if (entry.target === section2Ref.current) {
              handleModelChange('sofa', Math.PI);
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
    <div className="flex justify-end bg-blue-950">
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
              <House activeModel={activeModel} targetRotation={targetRotation} currentColor={currentColor} setCurrentColor={handleColorChange} />
            </Suspense>
          </PresentationControls>
        </Canvas>
      </div>
      <div className="w-1/4 p-6 overflow-y-auto">
        <div ref={section1Ref} data-item="armchair" className='h-screen flex flex-col justify-center items-start gap-5 px-4'>
          <h2 className='text-2xl font-bold'>Modèle : Armchair</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <SelectColorWalls currentColor={currentColor} setCurrentColor={handleColorChange} />
        </div>
        <div ref={section2Ref} data-item="sofa" className='h-screen flex flex-col justify-center items-start gap-5 px-4'>
          <h2 className='text-2xl font-bold'>Modèle : Sofa</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <SelectColorWalls currentColor={currentColor} setCurrentColor={handleColorChange} />
        </div>
      </div>
    </div>
  )
}

export default Scene

useGLTF.preload('/models/armchair7.glb')
useGLTF.preload('/models/sofa.glb')
useGLTF.preload('/models/meubletv.glb')