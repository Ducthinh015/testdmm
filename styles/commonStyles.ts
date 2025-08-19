import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF6B6B',      // Coral pink - warm and friendly
  primaryLight: '#FFE5E5', // Light coral pink
  secondary: '#4ECDC4',    // Turquoise - calming
  accent: '#45B7D1',       // Sky blue - trustworthy
  background: '#FFFFFF',   // Clean white
  backgroundAlt: '#F8F9FA', // Light grey
  text: '#2C3E50',         // Dark blue-grey
  textLight: '#7F8C8D',    // Medium grey
  success: '#2ECC71',      // Green
  successLight: '#E8F8F5', // Light green
  warning: '#F39C12',      // Orange
  danger: '#E74C3C',       // Red
  error: '#E74C3C',        // Red (alias for danger)
  card: '#FFFFFF',         // White cards
  border: '#E9ECEF',       // Light border
  shadow: 'rgba(0, 0, 0, 0.1)',
  white: '#FFFFFF',        // Pure white
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textLight: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    lineHeight: 20,
  },
  section: {
    marginVertical: 15,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  petCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    boxShadow: `0px 6px 15px ${colors.shadow}`,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    minWidth: 150,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  petAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 10,
    paddingTop: 10,
  },
  fabButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 6px 15px ${colors.shadow}`,
    elevation: 8,
  },
});