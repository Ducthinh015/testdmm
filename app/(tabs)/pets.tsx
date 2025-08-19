import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function PetsScreen() {
  const [pets] = useState([
    {
      id: 1,
      name: 'Buddy',
      type: 'Chó',
      breed: 'Golden Retriever',
      age: '2 tuổi',
      weight: '25kg',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face',
      nextVaccination: '15/02/2024',
      lastCheckup: '15/01/2024',
      vaccinations: [
        { name: 'Dại', date: '15/01/2023', nextDue: '15/01/2024' },
        { name: 'Parvo', date: '15/01/2023', nextDue: '15/01/2024' },
      ]
    },
    {
      id: 2,
      name: 'Mimi',
      type: 'Mèo',
      breed: 'Persian',
      age: '1 tuổi',
      weight: '4kg',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face',
      nextVaccination: '20/02/2024',
      lastCheckup: '20/01/2024',
      vaccinations: [
        { name: 'FVRCP', date: '20/01/2023', nextDue: '20/01/2024' },
        { name: 'Dại', date: '20/01/2023', nextDue: '20/01/2024' },
      ]
    }
  ]);

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <Text style={[commonStyles.title, { textAlign: 'left' }]}>
          Thú cưng của bạn
        </Text>
        <TouchableOpacity onPress={() => router.push('/pets/add')}>
          <Icon name="add-circle" size={32} style={{ color: colors.primary }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {pets.map((pet) => (
          <TouchableOpacity 
            key={pet.id}
            style={[commonStyles.card, { marginBottom: 15 }]}
            onPress={() => router.push(`/pets/${pet.id}`)}
          >
            <View style={commonStyles.rowCenter}>
              <Image 
                source={{ uri: pet.image }} 
                style={[commonStyles.avatar, { marginRight: 15, marginBottom: 0 }]}
              />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>
                  {pet.name}
                </Text>
                <Text style={[commonStyles.textLight, { marginBottom: 5 }]}>
                  {pet.breed} • {pet.age} • {pet.weight}
                </Text>
                <View style={commonStyles.rowCenter}>
                  <Icon name="medical" size={16} style={{ color: colors.success, marginRight: 5 }} />
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    Khám gần nhất: {pet.lastCheckup}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} style={{ color: colors.textLight }} />
            </View>
            
            <View style={commonStyles.divider} />
            
            <View style={commonStyles.rowCenter}>
              <Icon name="calendar" size={16} style={{ color: colors.warning, marginRight: 5 }} />
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                Tiêm phòng tiếp theo: {pet.nextVaccination}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {pets.length === 0 && (
          <View style={[commonStyles.centerContent, { paddingTop: 100 }]}>
            <Icon name="paw" size={80} style={{ color: colors.textLight, marginBottom: 20 }} />
            <Text style={[commonStyles.subtitle, { textAlign: 'center', marginBottom: 10 }]}>
              Chưa có thú cưng nào
            </Text>
            <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 30 }]}>
              Thêm thú cưng đầu tiên của bạn để bắt đầu theo dõi sức khỏe
            </Text>
            <Button
              text="Thêm thú cưng"
              onPress={() => router.push('/pets/add')}
              style={{ width: 200 }}
            />
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}