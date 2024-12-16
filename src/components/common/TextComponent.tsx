import { Text } from '@react-three/drei';

export default function TextComponent({ children }: { children: React.ReactNode }) {
  return <Text
    font="./bangers-v20-latin-regular.woff"
    fontSize={0.28}
    position={[3.2, 0.45, 0.25]}
    rotation-y={- 1.35}
    maxWidth={2.5}
  >
    {children}
  </Text>;
}
