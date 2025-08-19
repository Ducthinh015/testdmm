import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function BookingScreen() {
  const [selectedService, setSelectedService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const services = [
    { id: 'checkup', name: 'Khám tổng quát', icon: 'medical', price: '200.000đ' },
    { id: 'vaccination', name: 'Tiêm phòng', icon: 'shield-checkmark', price: '150.000đ' },
    { id: 'surgery', name: 'Phẫu thuật', icon: 'cut', price: 'Tùy trường hợp' },
    { id: 'grooming', name: 'Tắm & cắt tỉa', icon: 'brush', price: '100.000đ' },
    { id: 'dental', name: 'Chăm sóc răng miệng', icon: 'happy', price: '300.000đ' },
    { id: 'emergency', name: 'Cấp cứu', icon: 'warning', price: '500.000đ' },
  ];

  const nearbyVets = [
    {
      id: 1,
      name: 'Dr. Nguyễn Văn A',
      clinic: 'Phòng khám thú y ABC',
      distance: '0.5km',
      rating: 4.8,
      reviews: 124,
      specialties: ['Chó', 'Mèo', 'Chim'],
      nextAvailable: 'Hôm nay 14:00',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Dr. Trần Thị B',
      clinic: 'Bệnh viện thú y XYZ',
      distance: '1.2km',
      rating: 4.9,
      reviews: 89,
      specialties: ['Chó', 'Mèo', 'Thỏ'],
      nextAvailable: 'Mai 09:00',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Lê Văn C',
      clinic: 'Phòng khám Pet Care',
      distance: '2.1km',
      rating: 4.7,
      reviews: 156,
      specialties: ['Chó', 'Mèo', 'Hamster'],
      nextAvailable: 'Mai 15:30',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
        <Text style={[commonStyles.title, { textAlign: 'left' }]}>
          Đặt lịch khám
        </Text>
        <Text style={commonStyles.textLight}>Tìm bác sĩ thú y gần bạn</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Search Location */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 10 }]}>Vị trí của bạn</Text>
          <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
            <Icon name="location" size={20} style={{ color: colors.primary, marginRight: 10 }} />
            <TextInput
              style={[commonStyles.text, { flex: 1 }]}
              placeholder="Nhập địa chỉ hoặc cho phép định vị"
              value={searchLocation}
              onChangeText={setSearchLocation}
              placeholderTextColor={colors.textLight}
            />
            <TouchableOpacity>
              <Icon name="navigate" size={20} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Services */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Dịch vụ</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  commonStyles.card,
                  {
                    width: '48%',
                    alignItems: 'center',
                    paddingVertical: 20,
                    marginBottom: 10,
                    backgroundColor: selectedService === service.id ? colors.primary : colors.card,
                  }
                ]}
                onPress={() => setSelectedService(service.id)}
              >
                <Icon 
                  name={service.icon as any} 
                  size={28} 
                  style={{ 
                    color: selectedService === service.id ? 'white' : colors.primary, 
                    marginBottom: 8 
                  }} 
                />
                <Text style={[
                  commonStyles.text, 
                  { 
                    fontWeight: '600', 
                    textAlign: 'center',
                    color: selectedService === service.id ? 'white' : colors.text,
                    marginBottom: 5
                  }
                ]}>
                  {service.name}
                </Text>
                <Text style={[
                  commonStyles.textLight, 
                  { 
                    textAlign: 'center', 
                    fontSize: 12,
                    color: selectedService === service.id ? 'rgba(255,255,255,0.8)' : colors.textLight
                  }
                ]}>
                  {service.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Vets */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Bác sĩ gần bạn</Text>
          {nearbyVets.map((vet) => (
            <TouchableOpacity 
              key={vet.id}
              style={[commonStyles.card, { marginBottom: 15 }]}
              onPress={() => router.push(`/booking/${vet.id}`)}
            >
              <View style={commonStyles.rowCenter}>
                <View style={[commonStyles.avatar, { marginRight: 15, marginBottom: 0, backgroundColor: colors.backgroundAlt }]}>
                  <Text style={[commonStyles.text, { textAlign: 'center', lineHeight: 80 }]}>
                    👨‍⚕️
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 16 }]}>
                    {vet.name}
                  </Text>
                  <Text style={[commonStyles.textLight, { marginBottom: 5 }]}>
                    {vet.clinic}
                  </Text>
                  <View style={commonStyles.rowCenter}>
                    <Icon name="location" size={14} style={{ color: colors.textLight, marginRight: 5 }} />
                    <Text style={[commonStyles.textLight, { fontSize: 12, marginRight: 15 }]}>
                      {vet.distance}
                    </Text>
                    <Icon name="star" size={14} style={{ color: colors.warning, marginRight: 5 }} />
                    <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                      {vet.rating} ({vet.reviews} đánh giá)
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={commonStyles.divider} />
              
              <View style={[commonStyles.row, { alignItems: 'flex-end' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.textLight, { fontSize: 12, marginBottom: 5 }]}>
                    Chuyên khoa: {vet.specialties.join(', ')}
                  </Text>
                  <View style={commonStyles.rowCenter}>
                    <Icon name="time" size={14} style={{ color: colors.success, marginRight: 5 }} />
                    <Text style={[commonStyles.text, { fontSize: 12, color: colors.success }]}>
                      Có thể đặt: {vet.nextAvailable}
                    </Text>
                  </View>
                </View>
                <Button
                  text="Đặt lịch"
                  onPress={() => router.push(`/booking/${vet.id}`)}
                  style={[{ paddingVertical: 8, paddingHorizontal: 16 }]}
                  textStyle={{ fontSize: 12 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}