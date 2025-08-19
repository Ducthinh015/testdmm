import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        // Simulate API call to check if user is logged in
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, always redirect to login
        // In a real app, you would check AsyncStorage or a token
        const isAuthenticated = false; // Change this to test different flows
        
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (!isLoading) {
    return null; // Router will handle navigation
  }

  return (
    <View style={[commonStyles.centerContent, { backgroundColor: colors.primary }]}>
      {/* Logo */}
      <View style={{
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10
      }}>
        <Text style={{ fontSize: 60 }}>🐕🐱</Text>
      </View>

      <Text style={[commonStyles.title, { color: 'white', fontSize: 32, marginBottom: 10 }]}>
        DogMeoMeo
      </Text>
      <Text style={[commonStyles.text, { color: 'rgba(255,255,255,0.8)', textAlign: 'center' }]}>
        Chăm sóc thú cưng tốt nhất
      </Text>

      {/* Loading indicator */}
      <View style={{ marginTop: 50 }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 3,
          borderColor: 'rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          transform: [{ rotate: '45deg' }]
        }} />
      </View>
    </View>
  );
}