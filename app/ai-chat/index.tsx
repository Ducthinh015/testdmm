import { useState, useRef, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là AI tư vấn thú cưng của DogMeoMeo. Tôi có thể giúp bạn giải đáp các thắc mắc về chăm sóc, sức khỏe và hành vi của thú cưng. Bạn có câu hỏi gì không?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickQuestions = [
    'Chó tôi bị tiêu chảy phải làm sao?',
    'Mèo không chịu ăn có sao không?',
    'Lịch tiêm phòng cho chó con như thế nào?',
    'Cách huấn luyện chó đi vệ sinh đúng chỗ?',
    'Thú cưng bị rụng lông nhiều có bình thường?'
  ];

  const aiResponses = {
    'tiêu chảy': 'Tiêu chảy ở chó có thể do nhiều nguyên nhân: thay đổi thức ăn đột ngột, ăn phải thứ gì đó không phù hợp, stress, hoặc nhiễm trùng. Bạn nên:\n\n1. Cho chó nhịn ăn 12-24 giờ (vẫn cho uống nước)\n2. Sau đó cho ăn thức ăn nhạt như cơm trắng + thịt gà luộc\n3. Nếu tình trạng kéo dài >2 ngày hoặc có máu, hãy đưa đến bác sĩ thú y ngay',
    'không ăn': 'Mèo không chịu ăn có thể do:\n\n1. Stress từ môi trường mới\n2. Thức ăn không hợp khẩu vị\n3. Vấn đề sức khỏe (sốt, đau răng, etc.)\n4. Thay đổi thời tiết\n\nHãy thử:\n- Đổi loại thức ăn khác\n- Làm ấm thức ăn một chút\n- Tạo môi trường yên tĩnh\n- Nếu >24h không ăn, cần đến bác sĩ thú y',
    'tiêm phòng': 'Lịch tiêm phòng chuẩn cho chó con:\n\n6-8 tuần: Vaccine 5 trong 1 (DHPP) + Kennel Cough\n10-12 tuần: Vaccine 5 trong 1 lần 2 + Dại\n14-16 tuần: Vaccine 5 trong 1 lần 3 + Dại lần 2\n\nSau đó tiêm nhắc lại hàng năm. Lưu ý: Không cho chó ra ngoài cho đến 2 tuần sau mũi cuối.',
    'huấn luyện': 'Huấn luyện chó đi vệ sinh đúng chỗ:\n\n1. Chọn 1 vị trí cố định\n2. Đưa chó đến đó sau khi ăn, ngủ dậy\n3. Khen ngợi + thưởng khi làm đúng\n4. Không la mắng khi làm sai, chỉ dọn sạch\n5. Kiên trì 2-4 tuần\n\nMẹo: Chó thường đi vệ sinh 15-30 phút sau khi ăn',
    'rụng lông': 'Rụng lông là hiện tượng bình thường, đặc biệt vào mùa thay lông (xuân/thu). Tuy nhiên, nếu:\n\n- Rụng quá nhiều, có vùng hói\n- Kèm ngứa, viêm da\n- Lông xỉn màu, gãy nhiều\n\nCó thể do: stress, dinh dưỡng thiếu hụt, ký sinh trùng, hoặc bệnh da. Hãy tăng cường chải lông và đến bác sĩ thú y nếu bất thường.'
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    for (const [keyword, response] of Object.entries(aiResponses)) {
      if (lowerText.includes(keyword)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = [
      'Cảm ơn bạn đã hỏi! Đây là một câu hỏi hay về chăm sóc thú cưng. Tôi khuyên bạn nên tham khảo ý kiến của bác sĩ thú y để có lời khuyên chính xác nhất cho tình huống cụ thể của thú cưng.',
      'Tôi hiểu mối quan tâm của bạn. Mỗi thú cưng đều có đặc điểm riêng, vì vậy tốt nhất bạn nên đặt lịch khám với bác sĩ thú y để được tư vấn chi tiết.',
      'Đây là vấn đề thường gặp trong chăm sóc thú cưng. Tôi khuyên bạn nên theo dõi thêm và liên hệ với bác sĩ thú y nếu tình trạng không cải thiện.',
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendQuickQuestion = (question: string) => {
    setInputText(question);
    sendMessage();
  };

  return (
    <KeyboardAvoidingView 
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[commonStyles.subtitle, { fontSize: 18 }]}>
            AI Tư vấn thú cưng
          </Text>
          <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
            🤖 Trực tuyến
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/ai-chat/history')}>
          <Icon name="time" size={24} style={{ color: colors.textLight }} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={[commonStyles.content, { flex: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              {
                marginVertical: 5,
                marginHorizontal: 15,
                maxWidth: '80%',
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              }
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: message.isUser ? colors.primary : colors.card,
                  borderRadius: 15,
                  padding: 12,
                  borderBottomRightRadius: message.isUser ? 5 : 15,
                  borderBottomLeftRadius: message.isUser ? 15 : 5,
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }
              ]}
            >
              <Text
                style={[
                  commonStyles.text,
                  {
                    color: message.isUser ? 'white' : colors.text,
                    lineHeight: 20,
                  }
                ]}
              >
                {message.text}
              </Text>
            </View>
            <Text
              style={[
                commonStyles.textLight,
                {
                  fontSize: 10,
                  marginTop: 2,
                  textAlign: message.isUser ? 'right' : 'left',
                }
              ]}
            >
              {message.timestamp.toLocaleTimeString('vi-VN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        ))}

        {isTyping && (
          <View style={{ marginVertical: 5, marginHorizontal: 15, maxWidth: '80%' }}>
            <View style={[commonStyles.card, { borderRadius: 15, padding: 12, borderBottomLeftRadius: 5 }]}>
              <Text style={[commonStyles.textLight, { fontStyle: 'italic' }]}>
                AI đang trả lời...
              </Text>
            </View>
          </View>
        )}

        {/* Quick Questions */}
        {messages.length === 1 && (
          <View style={{ margin: 15 }}>
            <Text style={[commonStyles.textLight, { marginBottom: 10, textAlign: 'center' }]}>
              Hoặc chọn câu hỏi thường gặp:
            </Text>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.card, { marginBottom: 8, backgroundColor: colors.backgroundAlt }]}
                onPress={() => sendQuickQuestion(question)}
              >
                <Text style={[commonStyles.text, { color: colors.primary }]}>
                  {question}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Input */}
      <View style={[
        commonStyles.card, 
        { 
          margin: 15, 
          flexDirection: 'row', 
          alignItems: 'center',
          paddingVertical: 10
        }
      ]}>
        <TextInput
          style={[commonStyles.text, { flex: 1, maxHeight: 100 }]}
          placeholder="Nhập câu hỏi về thú cưng..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
          style={[
            {
              backgroundColor: inputText.trim() && !isTyping ? colors.primary : colors.textLight,
              borderRadius: 20,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }
          ]}
        >
          <Icon name="send" size={20} style={{ color: 'white' }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}