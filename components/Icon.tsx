import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  style?: object;
}

export default function Icon({ name, size = 24, style }: IconProps) {
  const iconColor = style?.color || colors.primary;
  
  return (
    <Ionicons 
      name={name} 
      size={size} 
      color={iconColor}
      style={style}
    />
  );
}