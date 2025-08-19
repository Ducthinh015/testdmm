import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock pet data - in real app, fetch from API using the id
  const [pet] = useState({
    id: 1,
    name: 'Buddy',
    type: 'Chó',
    breed: 'Golden Retriever',
    gender: 'Đực',
    age: '2 tuổi',
    weight: '25kg',
    color: 'Vàng',
    birthDate: '15/01/2022',
    microchipId: 'ABC123456789',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face',
    notes: 'Rất thân thiện và năng động. Thích chơi bóng và bơi lội.',
    vaccinations: [
      { id: 1, name: 'Dại', date: '15/01/2023', nextDue: '15/01/2024', status: 'completed' },
      { id: 2, name: 'Parvo', date: '15/01/2023', nextDue: '15/01/2024', status: 'completed' },
      { id: 3, name: 'Distemper', date: '15/01/2023', nextDue: '15/01/2024', status: 'due' },
    ],
    medicalHistory: [
      { id: 1, date: '15/01/2024', type: 'Khám tổng quát', vet: 'Dr. Nguyễn Văn A', notes: 'Sức khỏe tốt' },
      { id: 2, date: '15/12/2023', type: 'Tiêm phòng', vet: 'Dr. Trần Thị B', notes: 'Tiêm vaccine dại' },
    ],
    upcomingAppointments: [
      { id: 1, date: '25/02/2024', time: '14:00', type: 'Khám định kỳ', vet: 'Dr. Nguyễn Văn A' },
    ]
  });

  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', name: 'Thông tin', icon: 'information-circle' },
    { id: 'health', name: 'Sức khỏe', icon: 'medical' },
    { id: 'vaccines', name: 'Vaccine', icon: 'shield-checkmark' },
    { id: 'appointments', name: 'Lịch hẹn', icon: 'calendar' },
  ];

  const handleEdit = () => {
    router.push(`/pets/edit/${id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa hồ sơ của ${pet.name}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive',
          onPress: () => {
            console.log('Delete pet:', id);
            router.back();
          }
        }
      ]
    );
  };

  const renderInfoTab = () => (
    <View>
      <View style={[commonStyles.card, { marginBottom: 15 }]}>
        <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Thông tin cơ bản</Text>
        
        <View style={[commonStyles.row, { marginBottom: 10 }]}>
          <Text style={[commonStyles.textLight, { flex: 1 }]}>Giống:</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.breed}</Text>
        </View>
        
        <View style={[commonStyles.row, { marginBottom: 10 }]}>
          <Text style={[commonStyles.textLight, { flex: 1 }]}>Giới tính:</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.gender}</Text>
        </View>
        
        <View style={[commonStyles.row, { marginBottom: 10 }]}>
          <Text style={[commonStyles.textLight, { flex: 1 }]}>Ngày sinh:</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.birthDate}</Text>
        </View>
        
        <View style={[commonStyles.row, { marginBottom: 10 }]}>
          <Text style={[commonStyles.textLight, { flex: 1 }]}>Tuổi:</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.age}</Text>
        </View>
        
        <View style={[commonStyles.row, { marginBottom: 10 }]}>
          <Text style={[commonStyles.textLight, { flex: 1 }]}>Cân nặng:</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.weight}</Text>
        </View>
        
        <View style={[commonStyles.row, { marginBottom: 10 }]}>
          <Text style={[commonStyles.textLight, { flex: 1 }]}>Màu lông:</Text>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.color}</Text>
        </View>
        
        {pet.microchipId && (
          <View style={[commonStyles.row, { marginBottom: 10 }]}>
            <Text style={[commonStyles.textLight, { flex: 1 }]}>Mã chip:</Text>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>{pet.microchipId}</Text>
          </View>
        )}
      </View>

      {pet.notes && (
        <View style={[commonStyles.card, { marginBottom: 15 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 10 }]}>Ghi chú</Text>
          <Text style={commonStyles.text}>{pet.notes}</Text>
        </View>
      )}
    </View>
  );

  const renderVaccinesTab = () => (
    <View>
      {pet.vaccinations.map((vaccine) => (
        <View key={vaccine.id} style={[commonStyles.card, { marginBottom: 15 }]}>
          <View style={[commonStyles.row, { marginBottom: 10 }]}>
            <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
              {vaccine.name}
            </Text>
            <View style={[
              commonStyles.badge,
              { backgroundColor: vaccine.status === 'completed' ? colors.success : colors.warning }
            ]}>
              <Text style={commonStyles.badgeText}>
                {vaccine.status === 'completed' ? 'Đã tiêm' : 'Cần tiêm'}
              </Text>
            </View>
          </View>
          
          <View style={[commonStyles.rowCenter, { marginBottom: 5 }]}>
            <Icon name="calendar" size={16} style={{ color: colors.textLight, marginRight: 5 }} />
            <Text style={commonStyles.textLight}>
              Lần cuối: {vaccine.date}
            </Text>
          </View>
          
          <View style={commonStyles.rowCenter}>
            <Icon name="time" size={16} style={{ color: colors.textLight, marginRight: 5 }} />
            <Text style={commonStyles.textLight}>
              Tiếp theo: {vaccine.nextDue}
            </Text>
          </View>
        </View>
      ))}
      
      <Button
        text="Thêm vaccine mới"
        onPress={() => router.push(`/pets/${id}/add-vaccine`)}
        variant="outline"
      />
    </View>
  );

  const renderHealthTab = () => (
    <View>
      <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Lịch sử khám bệnh</Text>
      
      {pet.medicalHistory.map((record) => (
        <View key={record.id} style={[commonStyles.card, { marginBottom: 15 }]}>
          <View style={[commonStyles.row, { marginBottom: 10 }]}>
            <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
              {record.type}
            </Text>
            <Text style={commonStyles.textLight}>
              {record.date}
            </Text>
          </View>
          
          <View style={[commonStyles.rowCenter, { marginBottom: 5 }]}>
            <Icon name="person" size={16} style={{ color: colors.textLight, marginRight: 5 }} />
            <Text style={commonStyles.textLight}>
              {record.vet}
            </Text>
          </View>
          
          <Text style={commonStyles.text}>
            {record.notes}
          </Text>
        </View>
      ))}
      
      <Button
        text="Thêm hồ sơ y tế"
        onPress={() => router.push(`/pets/${id}/add-medical`)}
        variant="outline"
      />
    </View>
  );

  const renderAppointmentsTab = () => (
    <View>
      <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Lịch hẹn sắp tới</Text>
      
      {pet.upcomingAppointments.map((appointment) => (
        <View key={appointment.id} style={[commonStyles.card, { marginBottom: 15 }]}>
          <View style={[commonStyles.row, { marginBottom: 10 }]}>
            <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
              {appointment.type}
            </Text>
            <View style={[commonStyles.badge, { backgroundColor: colors.primary }]}>
              <Text style={commonStyles.badgeText}>Sắp tới</Text>
            </View>
          </View>
          
          <View style={[commonStyles.rowCenter, { marginBottom: 5 }]}>
            <Icon name="calendar" size={16} style={{ color: colors.textLight, marginRight: 5 }} />
            <Text style={commonStyles.textLight}>
              {appointment.date} lúc {appointment.time}
            </Text>
          </View>
          
          <View style={commonStyles.rowCenter}>
            <Icon name="person" size={16} style={{ color: colors.textLight, marginRight: 5 }} />
            <Text style={commonStyles.textLight}>
              {appointment.vet}
            </Text>
          </View>
        </View>
      ))}
      
      <Button
        text="Đặt lịch khám mới"
        onPress={() => router.push('/booking')}
        variant="outline"
      />
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return renderInfoTab();
      case 'vaccines':
        return renderVaccinesTab();
      case 'health':
        return renderHealthTab();
      case 'appointments':
        return renderAppointmentsTab();
      default:
        return renderInfoTab();
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.title, { textAlign: 'center', flex: 1 }]}>
          {pet.name}
        </Text>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="create" size={24} style={{ color: colors.primary }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Pet Profile Header */}
        <View style={[commonStyles.card, { alignItems: 'center', marginBottom: 20 }]}>
          <Image 
            source={{ uri: pet.image }} 
            style={[commonStyles.petAvatar, { width: 120, height: 120, marginBottom: 15 }]}
          />
          <Text style={[commonStyles.subtitle, { fontSize: 24, marginBottom: 5 }]}>
            {pet.name}
          </Text>
          <Text style={[commonStyles.textLight, { fontSize: 16, marginBottom: 15 }]}>
            {pet.breed} • {pet.age}
          </Text>
          
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
            <TouchableOpacity 
              style={[commonStyles.card, { flex: 1, marginRight: 5, paddingVertical: 15, alignItems: 'center' }]}
              onPress={() => router.push('/booking')}
            >
              <Icon name="calendar" size={20} style={{ color: colors.primary, marginBottom: 5 }} />
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Đặt lịch</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[commonStyles.card, { flex: 1, marginHorizontal: 5, paddingVertical: 15, alignItems: 'center' }]}
              onPress={() => router.push('/emergency')}
            >
              <Icon name="medical" size={20} style={{ color: colors.danger, marginBottom: 5 }} />
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Cấp cứu</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[commonStyles.card, { flex: 1, marginLeft: 5, paddingVertical: 15, alignItems: 'center' }]}
              onPress={handleDelete}
            >
              <Icon name="trash" size={20} style={{ color: colors.textLight, marginBottom: 5 }} />
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ maxHeight: 60, marginBottom: 20 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                commonStyles.card,
                {
                  marginRight: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: activeTab === tab.id ? colors.primary : colors.card,
                  flexDirection: 'row',
                  alignItems: 'center',
                }
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon 
                name={tab.icon as any} 
                size={16} 
                style={{ 
                  color: activeTab === tab.id ? 'white' : colors.primary,
                  marginRight: 8
                }} 
              />
              <Text style={[
                commonStyles.text,
                {
                  color: activeTab === tab.id ? 'white' : colors.text,
                  fontWeight: '600',
                  fontSize: 14
                }
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Content */}
        {renderTabContent()}

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}