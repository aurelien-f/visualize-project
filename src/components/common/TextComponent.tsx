import { IsDesktopHook } from '@/utils/isDesktop';
import { Text } from '@react-three/drei';

type TextComponentProps = {
  children: React.ReactNode;
  position?: [number, number, number];
  rotationY?: number;
  maxWidth?: number;
  fontSize?: number;
};

export default function TextComponent({ children, position = [3.2, 0.45, 0.25], rotationY = -1.35, maxWidth = 2.5, fontSize = 0.28 }: TextComponentProps) {
  const isDesktop = IsDesktopHook();
  return <Text
    font="https://fonts.gstatic.com/s/fjallaone/v15/Yq6R-LCAWCX3-6Ky7FAFnOY.ttf"
    fontSize={fontSize}
    position={position}
    rotation-y={rotationY}
    maxWidth={maxWidth}
    textAlign={isDesktop ? 'left' : 'center'}
  >
    {children}
  </Text>;
}
