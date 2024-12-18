import { Text } from '@react-three/drei';

type TextComponentProps = {
  children: React.ReactNode;
  position?: [number, number, number];
  rotationY?: number;
  maxWidth?: number;
  fontSize?: number;
};

export default function TextComponent({ children, position = [3.2, 0.45, 0.25], rotationY = -1.35, maxWidth = 2.5, fontSize = 0.28 }: TextComponentProps) {
  return <Text
    font="https://fonts.gstatic.com/s/redhatdisplay/v14/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbmyWQkEz_lWZk33BGg.woff"
    fontSize={fontSize}
    position={position}
    rotation-y={rotationY}
    maxWidth={maxWidth}
  >
    {children}
  </Text>;
}
