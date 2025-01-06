"use client";

type LoadingScreenProps = {
  progress: number;
};

export default function LoadingScreen({ progress }: LoadingScreenProps) {

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col gap-4 items-center justify-center bg-[#241a1a] z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      <p className="text-white text-xl font-bold">
        {Math.round(progress)}%
      </p>
    </div>
  );
} 