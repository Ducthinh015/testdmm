import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { commonStyles, colors } from '../../styles/commonStyles';

interface Subscription {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isSubscribed: boolean;
  expiryDate?: string;
  icon: string;
}

interface UserProfile {
  email: string;
  username: string;
  avatar: string;
}

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState('account');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: 'user@dogmeomeo.com',
    username: 'Người yêu thú cưng',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c9b8d4?w=150&h=150&fit=crop&crop=face'
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'ai-vet',
      name: 'Gói AI tư vấn thú y',
      price: '49.000đ/tháng',
      description: 'Sử dụng chatbot AI GPT-4 để hỏi & nhận tư vấn thú cưng 24/7',
      features: [
        'Tư vấn sức khỏe thú cưng 24/7',
        'Phân tích triệu chứng bệnh',
        'Gợi ý chế độ dinh dưỡng',
        'Lịch sử chat không giới hạn'
      ],
      isSubscribed: false,
      icon: 'chatbot-outline',
    },
    {
      id: 'real-vet',
      name: 'Gói gọi bác sĩ thật',
      price: '199.000đ/tháng',
      description: 'Chat hoặc gọi video với bác sĩ thú y chuyên nghiệp',
      features: [
        'Gọi video với bác sĩ thú y',
        'Chat trực tiếp với chuyên gia',
        'Tư vấn chuyên sâu',
        'Hỗ trợ khẩn cấp 24/7'
      ],
      isSubscribed: true,
      expiryDate: '15/02/2024',
      icon: 'videocam-outline',
    }
  ]);

  const [purchaseHistory] = useState([
    {
      id: '1',
      packageName: 'Gói gọi bác sĩ thật',
      price: '199.000đ',
      date: '15/01/2024',
      status: 'Đã thanh toán',
      duration: '1 tháng'
    },
    {
      id: '2',
      packageName: 'Gói AI tư vấn thú y',
      price: '49.000đ',
      date: '10/12/2023',
      status: 'Đã hết hạn',
      duration: '1 tháng'
    }
  ]);

  const handleSubscribe = (subscriptionId: string) => {
    Alert.alert(
      'Xác nhận đăng ký',
      'Bạn có muốn đăng ký gói dịch vụ này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng ký',
          onPress: () => {
            setSubscriptions(prev => 
              prev.map(sub => 
                sub.id === subscriptionId 
                  ? { ...sub, isSubscribed: true, expiryDate: '15/03/2024' }
                  : sub
              )
            );
            Alert.alert('Thành công', 'Đăng ký gói dịch vụ thành công!');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const renderAccountTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
      
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Icon name="camera" size={16} style={{ color: colors.white }} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileInfo}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tên người dùng</Text>
            <TextInput
              style={styles.input}
              value={userProfile.username}
              onChangeText={(text) => updateProfile('username', text)}
              placeholder="Nhập tên người dùng"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={userProfile.email}
              onChangeText={(text) => updateProfile('email', text)}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
          </View>
        </View>
      </View>
      
      <Button
        text="Lưu thay đổi"
        onPress={() => Alert.alert('Thành công', 'Cập nhật thông tin thành công!')}
        style={styles.saveButton}
      />
    </View>
  );

  const renderSubscriptionsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Gói dịch vụ</Text>
      
      {subscriptions.map((subscription) => (
        <View key={subscription.id} style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <View style={styles.subscriptionIcon}>
              <Icon name={subscription.icon as any} size={24} style={{ color: colors.primary }} />
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionName}>{subscription.name}</Text>
              <Text style={styles.subscriptionPrice}>{subscription.price}</Text>
            </View>
            <View style={styles.subscriptionStatus}>
              {subscription.isSubscribed ? (
                <View style={styles.subscribedBadge}>
                  <Text style={styles.subscribedText}>Đã đăng ký</Text>
                  {subscription.expiryDate && (
                    <Text style={styles.expiryText}>Hết hạn: {subscription.expiryDate}</Text>
                  )}
                </View>
              ) : (
                <Button
                  text="Mua ngay"
                  onPress={() => handleSubscribe(subscription.id)}
                  style={styles.subscribeButton}
                  textStyle={styles.subscribeButtonText}
                />
              )}
            </View>
          </View>
          
          <Text style={styles.subscriptionDescription}>{subscription.description}</Text>
          
          <View style={styles.featuresList}>
            {subscription.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="checkmark-circle" size={16} style={{ color: colors.success }} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Lịch sử mua gói</Text>
      
      {purchaseHistory.map((purchase) => (
        <View key={purchase.id} style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyPackageName}>{purchase.packageName}</Text>
            <Text style={styles.historyPrice}>{purchase.price}</Text>
          </View>
          <View style={styles.historyDetails}>
            <Text style={styles.historyDate}>Ngày mua: {purchase.date}</Text>
            <Text style={styles.historyDuration}>Thời hạn: {purchase.duration}</Text>
            <View style={[
              styles.historyStatus,
              { backgroundColor: purchase.status === 'Đã thanh toán' ? colors.success : colors.warning }
            ]}>
              <Text style={styles.historyStatusText}>{purchase.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountTab();
      case 'subscriptions':
        return renderSubscriptionsTab();
      case 'history':
        return renderHistoryTab();
      default:
        return renderAccountTab();
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'account' && styles.activeTab]}
          onPress={() => setActiveTab('account')}
        >
          <Icon name="person" size={20} style={{ color: activeTab === 'account' ? colors.primary : colors.textLight }} />
          <Text style={[styles.tabText, activeTab === 'account' && styles.activeTabText]}>
            Tài khoản
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'subscriptions' && styles.activeTab]}
          onPress={() => setActiveTab('subscriptions')}
        >
          <Icon name="card" size={20} style={{ color: activeTab === 'subscriptions' ? colors.primary : colors.textLight }} />
          <Text style={[styles.tabText, activeTab === 'subscriptions' && styles.activeTabText]}>
            Gói dịch vụ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Icon name="time" size={20} style={{ color: activeTab === 'history' ? colors.primary : colors.textLight }} />
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Lịch sử
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
        
        <View style={styles.logoutSection}>
          <Button
            text="Đăng xuất"
            onPress={handleLogout}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  header: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.text,
    textAlign: 'center' as const,
  },
  tabBar: {
    flexDirection: 'row' as const,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 15,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 20,
  },
  profileSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center' as const,
    marginBottom: 20,
    position: 'relative' as const,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
  },
  editAvatarButton: {
    position: 'absolute' as const,
    bottom: 0,
    right: '35%',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 6,
  },
  profileInfo: {
    gap: 15,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    marginTop: 10,
  },
  subscriptionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subscriptionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  subscriptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 15,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 4,
  },
  subscriptionPrice: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.primary,
  },
  subscriptionStatus: {
    alignItems: 'flex-end' as const,
  },
  subscribedBadge: {
    alignItems: 'flex-end' as const,
  },
  subscribedText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.success,
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  expiryText: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
  },
  subscribeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
  },
  subscribeButtonText: {
    fontSize: 12,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 15,
    lineHeight: 20,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 10,
  },
  historyPackageName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    flex: 1,
  },
  historyPrice: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  historyDetails: {
    gap: 6,
  },
  historyDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  historyDuration: {
    fontSize: 12,
    color: colors.textLight,
  },
  historyStatus: {
    alignSelf: 'flex-start' as const,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  historyStatusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.white,
  },
  logoutSection: {
    padding: 20,
    paddingTop: 40,
  },
  logoutButton: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  logoutButtonText: {
    color: colors.error,
  },
};