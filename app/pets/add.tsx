import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function AddPetScreen() {
  const [petData, setPetData] = useState({
    name: '',
    type: '',
    breed: '',
    gender: '',
    birthDate: new Date(),
    weight: '',
    color: '',
    microchipId: '',
    notes: ''
  });
  const [image, setImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const petTypes = [
    { id: 'dog', name: 'Chó', icon: '🐕' },
    { id: 'cat', name: 'Mèo', icon: '🐱' },
    { id: 'bird', name: 'Chim', icon: '🐦' },
    { id: 'rabbit', name: 'Thỏ', icon: '🐰' },
    { id: 'hamster', name: 'Hamster', icon: '🐹' },
    { id: 'fish', name: 'Cá', icon: '🐠' },
  ];

  const genders = [
    { id: 'male', name: 'Đực', icon: '♂️' },
    { id: 'female', name: 'Cái', icon: '♀️' },
  ];

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
    }
  };

  const handleSave = async () => {
    if (!petData.name || !petData.type || !petData.breed) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to save pet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Pet saved:', { ...petData, image });
      Alert.alert(
        'Thành công',
        'Thêm thú cưng thành công!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const updatePetData = (field: string, value: any) => {
    setPetData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.title, { textAlign: 'center', flex: 1 }]}>
          Thêm thú cưng
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Pet Photo */}
        <View style={[commonStyles.section, { alignItems: 'center' }]}>
          <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center' }}>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.backgroundAlt,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              borderWidth: 2,
              borderColor: colors.border,
              borderStyle: 'dashed'
            }}>
              {image ? (
                <Image source={{ uri: image }} style={{ width: 116, height: 116, borderRadius: 58 }} />
              ) : (
                <Icon name="camera" size={40} style={{ color: colors.textLight }} />
              )}
            </View>
            <Text style={[commonStyles.textLight, { color: colors.primary }]}>
              {image ? 'Thay đổi ảnh' : 'Thêm ảnh thú cưng'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Basic Info */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Thông tin cơ bản</Text>
          
          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tên thú cưng *
            </Text>
            <View style={[commonStyles.card, { paddingVertical: 15 }]}>
              <TextInput
                style={commonStyles.text}
                placeholder="Nhập tên thú cưng"
                value={petData.name}
                onChangeText={(value) => updatePetData('name', value)}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Loại thú cưng *
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {petTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    commonStyles.card,
                    {
                      marginRight: 10,
                      marginBottom: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      backgroundColor: petData.type === type.id ? colors.primary : colors.card,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }
                  ]}
                  onPress={() => updatePetData('type', type.id)}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>{type.icon}</Text>
                  <Text style={[
                    commonStyles.text,
                    {
                      color: petData.type === type.id ? 'white' : colors.text,
                      fontWeight: '600',
                      fontSize: 14
                    }
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Giống *
            </Text>
            <View style={[commonStyles.card, { paddingVertical: 15 }]}>
              <TextInput
                style={commonStyles.text}
                placeholder="Ví dụ: Golden Retriever, Persian..."
                value={petData.breed}
                onChangeText={(value) => updatePetData('breed', value)}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Giới tính
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {genders.map((gender) => (
                <TouchableOpacity
                  key={gender.id}
                  style={[
                    commonStyles.card,
                    {
                      flex: 1,
                      marginRight: gender.id === 'male' ? 10 : 0,
                      paddingVertical: 15,
                      backgroundColor: petData.gender === gender.id ? colors.primary : colors.card,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  ]}
                  onPress={() => updatePetData('gender', gender.id)}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>{gender.icon}</Text>
                  <Text style={[
                    commonStyles.text,
                    {
                      color: petData.gender === gender.id ? 'white' : colors.text,
                      fontWeight: '600',
                    }
                  ]}>
                    {gender.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Ngày sinh
            </Text>
            <TouchableOpacity 
              style={[commonStyles.card, { paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="calendar" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <Text style={commonStyles.text}>
                {petData.birthDate.toLocaleDateString('vi-VN')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={petData.birthDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    updatePetData('birthDate', selectedDate);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </View>
        </View>

        {/* Additional Info */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Thông tin bổ sung</Text>
          
          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Cân nặng (kg)
            </Text>
            <View style={[commonStyles.card, { paddingVertical: 15 }]}>
              <TextInput
                style={commonStyles.text}
                placeholder="Ví dụ: 5.5"
                value={petData.weight}
                onChangeText={(value) => updatePetData('weight', value)}
                keyboardType="numeric"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Màu lông
            </Text>
            <View style={[commonStyles.card, { paddingVertical: 15 }]}>
              <TextInput
                style={commonStyles.text}
                placeholder="Ví dụ: Vàng, Đen trắng..."
                value={petData.color}
                onChangeText={(value) => updatePetData('color', value)}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Mã chip (nếu có)
            </Text>
            <View style={[commonStyles.card, { paddingVertical: 15 }]}>
              <TextInput
                style={commonStyles.text}
                placeholder="Nhập mã microchip"
                value={petData.microchipId}
                onChangeText={(value) => updatePetData('microchipId', value)}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Ghi chú
            </Text>
            <View style={[commonStyles.card, { paddingVertical: 15 }]}>
              <TextInput
                style={[commonStyles.text, { minHeight: 80, textAlignVertical: 'top' }]}
                placeholder="Thông tin đặc biệt, tính cách, sở thích..."
                value={petData.notes}
                onChangeText={(value) => updatePetData('notes', value)}
                multiline
                numberOfLines={4}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 30 }}>
          <Button
            text={loading ? "Đang lưu..." : "Lưu thông tin"}
            onPress={handleSave}
            disabled={loading}
          />
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}