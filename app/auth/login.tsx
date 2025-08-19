import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any email/password
      console.log('Login successful for:', email);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    Alert.alert('Thông báo', `Đăng nhập bằng ${provider} sẽ được triển khai sau`);
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.centerContent}>
        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            <Text style={{ fontSize: 40 }}>🐕🐱</Text>
          </View>
          <Text style={[commonStyles.title, { color: colors.primary }]}>
            DogMeoMeo
          </Text>
          <Text style={commonStyles.textLight}>
            Chăm sóc thú cưng tốt nhất
          </Text>
        </View>

        {/* Login Form */}
        <View style={{ width: '100%', maxWidth: 400 }}>
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Email
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="mail" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập email của bạn"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Mật khẩu
            </Text>
            <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
              <Icon name="lock-closed" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
              <TextInput
                style={[commonStyles.text, { flex: 1 }]}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
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

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
            <Text style={[commonStyles.textLight, { color: colors.primary }]}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          <Button
            text={loading ? "Đang đăng nhập..." : "Đăng nhập"}
            onPress={handleLogin}
            disabled={loading}
            style={{ marginBottom: 20 }}
          />

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={[commonStyles.divider, { flex: 1 }]} />
            <Text style={[commonStyles.textLight, { marginHorizontal: 15 }]}>
              Hoặc đăng nhập bằng
            </Text>
            <View style={[commonStyles.divider, { flex: 1 }]} />
          </View>

          {/* Social Login */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
            <TouchableOpacity 
              style={[commonStyles.card, { flex: 1, marginRight: 10, paddingVertical: 15, alignItems: 'center' }]}
              onPress={() => handleSocialLogin('Google')}
            >
              <Text style={{ fontSize: 20, marginBottom: 5 }}>🔍</Text>
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[commonStyles.card, { flex: 1, marginLeft: 10, paddingVertical: 15, alignItems: 'center' }]}
              onPress={() => handleSocialLogin('Apple')}
            >
              <Text style={{ fontSize: 20, marginBottom: 5 }}>🍎</Text>
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={commonStyles.textLight}>
              Chưa có tài khoản? 
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={[commonStyles.textLight, { color: colors.primary, fontWeight: '600' }]}>
                {' '}Đăng ký ngay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}