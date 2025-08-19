import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function HomeScreen() {
  const [pets] = useState([
    {
      id: 1,
      name: 'Buddy',
      type: 'Chó',
      breed: 'Golden Retriever',
      age: '2 tuổi',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face',
      nextVaccination: '15/02/2024'
    },
    {
      id: 2,
      name: 'Mimi',
      type: 'Mèo',
      breed: 'Persian',
      age: '1 tuổi',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face',
      nextVaccination: '20/02/2024'
    }
  ]);

  const quickActions = [
    { icon: 'calendar', title: 'Đặt lịch khám', subtitle: 'Tìm bác sĩ gần bạn', route: '/booking' },
    { icon: 'chatbubbles', title: 'AI Tư vấn', subtitle: 'Hỏi đáp với AI', route: '/ai-chat' },
    { icon: 'videocam', title: 'Gọi video', subtitle: 'Tư vấn trực tuyến', route: '/video-call' },
    { icon: 'storefront', title: 'Cửa hàng', subtitle: 'Phụ kiện & thức ăn', route: '/store' },
  ];

  const emergencyActions = [
    { icon: 'medical', title: 'Cấp cứu 24/7', subtitle: 'Hotline: 1900-1234', route: '/emergency' },
    { icon: 'location', title: 'Bệnh viện gần nhất', subtitle: 'Tìm địa chỉ gần bạn', route: '/nearby-hospitals' },
  ];

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <View>
          <Text style={[commonStyles.title, { textAlign: 'left', marginBottom: 5 }]}>
            DogMeoMeo 🐕🐱
          </Text>
          <Text style={commonStyles.textLight}>Chăm sóc thú cưng tốt nhất</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Icon name="person-circle" size={40} style={{ color: colors.primary }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Banner */}
        <TouchableOpacity 
          style={[
            commonStyles.card, 
            { 
              backgroundColor: colors.danger, 
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }
          ]}
          onPress={() => router.push('/emergency')}
        >
          <Icon name="medical" size={32} style={{ color: 'white', marginRight: 15 }} />
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.text, { color: 'white', fontWeight: '600', fontSize: 16 }]}>
              Cấp cứu 24/7
            </Text>
            <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.8)' }]}>
              Hotline: 1900-1234 • Luôn sẵn sàng hỗ trợ
            </Text>
          </View>
          <Icon name="chevron-forward" size={20} style={{ color: 'white' }} />
        </TouchableOpacity>

        {/* Pet Profiles Section */}
        <View style={commonStyles.section}>
          <View style={[commonStyles.row, { marginBottom: 15 }]}>
            <Text style={commonStyles.subtitle}>Thú cưng của bạn</Text>
            <TouchableOpacity onPress={() => router.push('/pets/add')}>
              <Icon name="add-circle" size={24} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pets.map((pet) => (
              <TouchableOpacity 
                key={pet.id} 
                style={commonStyles.petCard}
                onPress={() => router.push(`/pets/${pet.id}`)}
              >
                <Image 
                  source={{ uri: pet.image }} 
                  style={commonStyles.petAvatar}
                />
                <Text style={[commonStyles.text, { fontWeight: '600', textAlign: 'center' }]}>
                  {pet.name}
                </Text>
                <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 5 }]}>
                  {pet.breed} • {pet.age}
                </Text>
                <View style={[commonStyles.badge, { backgroundColor: colors.warning }]}>
                  <Text style={commonStyles.badgeText}>Tiêm phòng: {pet.nextVaccination}</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={[commonStyles.petCard, { justifyContent: 'center', backgroundColor: colors.backgroundAlt }]}
              onPress={() => router.push('/pets/add')}
            >
              <Icon name="add" size={40} style={{ color: colors.primary }} />
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 10 }]}>
                Thêm thú cưng
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Dịch vụ</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index}
                style={[commonStyles.card, { width: '48%', alignItems: 'center', paddingVertical: 25, marginBottom: 10 }]}
                onPress={() => router.push(action.route)}
              >
                <Icon name={action.icon as any} size={32} style={{ color: colors.primary, marginBottom: 10 }} />
                <Text style={[commonStyles.text, { fontWeight: '600', textAlign: 'center' }]}>
                  {action.title}
                </Text>
                <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 5 }]}>
                  {action.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Reminders */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Nhắc nhở sức khỏe</Text>
          <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
            <View style={commonStyles.rowCenter}>
              <Icon name="medical" size={24} style={{ color: colors.success, marginRight: 15 }} />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Buddy cần tiêm phòng
                </Text>
                <Text style={commonStyles.textLight}>
                  Lịch hẹn: 15/02/2024 - Dr. Nguyễn Văn A
                </Text>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-forward" size={20} style={{ color: colors.textLight }} />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, marginTop: 10 }]}
            onPress={() => router.push('/ai-chat')}
          >
            <View style={commonStyles.rowCenter}>
              <Icon name="chatbubbles" size={24} style={{ color: colors.primary, marginRight: 15 }} />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Có thắc mắc về thú cưng?
                </Text>
                <Text style={commonStyles.textLight}>
                  Hỏi AI tư vấn miễn phí 24/7
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} style={{ color: colors.textLight }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Articles */}
        <View style={commonStyles.section}>
          <View style={[commonStyles.row, { marginBottom: 15 }]}>
            <Text style={commonStyles.subtitle}>Bài viết mới</Text>
            <TouchableOpacity onPress={() => router.push('/blog')}>
              <Text style={[commonStyles.textLight, { color: colors.primary }]}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={commonStyles.card} onPress={() => router.push('/blog/1')}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=200&fit=crop' }}
              style={{ width: '100%', height: 150, borderRadius: 10, marginBottom: 15 }}
            />
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 5 }]}>
              5 Cách chăm sóc lông cho chó mèo
            </Text>
            <Text style={commonStyles.textLight}>
              Hướng dẫn chi tiết cách chăm sóc lông cho thú cưng để chúng luôn khỏe mạnh...
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={commonStyles.fabButton}
        onPress={() => router.push('/ai-chat')}
      >
        <Icon name="chatbubbles" size={24} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  );
}