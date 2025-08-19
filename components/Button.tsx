import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, buttonStyles } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

const styles = StyleSheet.create({
  button: {
    ...buttonStyles.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: colors.textLight,
    opacity: 0.6,
  },
  disabledText: {
    color: 'white',
  },
});

export default function Button({ text, onPress, style, textStyle, variant = 'primary', disabled = false }: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return buttonStyles.secondary;
      case 'outline':
        return buttonStyles.outline;
      default:
        return buttonStyles.primary;
    }
  };

  const getTextStyle = () => {
    if (variant === 'outline') {
      return { ...styles.buttonText, color: colors.primary };
    }
    return styles.buttonText;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[
        getTextStyle(),
        disabled && styles.disabledText,
        textStyle
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}