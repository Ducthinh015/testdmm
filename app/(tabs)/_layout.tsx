import { Tabs } from 'expo-router';
import { colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: 'Thú cưng',
          tabBarIcon: ({ color, size }) => (
            <Icon name="paw" size={size} style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Đặt lịch',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: 'Diễn đàn',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubbles" size={size} style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Cửa hàng',
          tabBarIcon: ({ color, size }) => (
            <Icon name="storefront" size={size} style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" size={size} style={{ color }} />
          ),
        }}
      />
    </Tabs>
  );
}