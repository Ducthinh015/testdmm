import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (!agreeTerms) {
      Alert.alert('Lỗi', 'Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    setLoading(true);
    try {
      // Simulate register API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration successful for:', formData.email);
      Alert.alert(
        'Thành công', 
        'Đăng ký thành công! Vui lòng đăng nhập.',
        [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <TouchableOpacity 
            style={{ position: 'absolute', left: 0, top: 10 }}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} style={{ color: colors.text }} />
          </TouchableOpacity>
          
          <Text style={[commonStyles.title, { color: colors.primary }]}>
            Đăng ký tài khoản
          </Text>
          <Text style={commonStyles.textLight}>
            Tạo tài khoản để bắt đầu chăm sóc thú cưng
          </Text>
        </View>

        {/* Register Form */}
        <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Họ và tên *
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="person" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Email *
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="mail" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Số điện thoại
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="call" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Mật khẩu *
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="lock-closed" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={!showPassword}
                placeholderTextColor={colors.textLight}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  style={{ color: colors.textLight }} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Xác nhận mật khẩu *
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="lock-closed" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={colors.textLight}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  style={{ color: colors.textLight }} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms Agreement */}
          <TouchableOpacity 
            style={[commonStyles.rowCenter, { marginVertical: 20 }]}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: agreeTerms ? colors.primary : colors.textLight,
              backgroundColor: agreeTerms ? colors.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10
            }}>
              {agreeTerms && (
                <Icon name="checkmark" size={12} style={{ color: 'white' }} />
              )}
            </View>
            <Text style={[commonStyles.textLight, { flex: 1 }]}>
              Tôi đồng ý với{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>
                Điều khoản sử dụng
              </Text>
              {' '}và{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>
                Chính sách bảo mật
              </Text>
            </Text>
          </TouchableOpacity>

          <Button
            text={loading ? "Đang đăng ký..." : "Đăng ký"}
            onPress={handleRegister}
            disabled={loading}
            style={{ marginBottom: 20 }}
          />

          {/* Login Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
            <Text style={commonStyles.textLight}>
              Đã có tài khoản? 
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={[commonStyles.textLight, { color: colors.primary, fontWeight: '600' }]}>
                {' '}Đăng nhập ngay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}