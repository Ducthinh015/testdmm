import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function ForumScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'Tất cả', icon: 'grid' },
    { id: 'questions', name: 'Hỏi đáp', icon: 'help-circle' },
    { id: 'tips', name: 'Chia sẻ', icon: 'bulb' },
    { id: 'health', name: 'Sức khỏe', icon: 'medical' },
  ];

  const posts = [
    {
      id: 1,
      title: 'Chó con 2 tháng tuổi nên ăn gì?',
      content: 'Mình mới nuôi chó con Golden 2 tháng tuổi, các bạn tư vấn nên cho ăn gì để phát triển tốt nhất?',
      author: 'Nguyễn Văn A',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      time: '2 giờ trước',
      category: 'questions',
      likes: 12,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: '5 cách huấn luyện mèo đi vệ sinh đúng chỗ',
      content: 'Chia sẻ kinh nghiệm huấn luyện mèo con đi vệ sinh trong khay cát hiệu quả...',
      author: 'Trần Thị B',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      time: '4 giờ trước',
      category: 'tips',
      likes: 25,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Dấu hiệu nhận biết chó bị stress',
      content: 'Những dấu hiệu cần chú ý để phát hiện sớm tình trạng stress ở chó...',
      author: 'Dr. Lê Văn C',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=50&h=50&fit=crop&crop=face',
      time: '1 ngày trước',
      category: 'health',
      likes: 45,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop'
    }
  ];

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(post => post.category === activeTab);

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <Text style={[commonStyles.title, { textAlign: 'left' }]}>
          Diễn đàn
        </Text>
        <TouchableOpacity onPress={() => router.push('/forum/create')}>
          <Icon name="add-circle" size={32} style={{ color: colors.primary }} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 60 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              commonStyles.card,
              {
                marginRight: 10,
                paddingVertical: 10,
                paddingHorizontal: 15,
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

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {filteredPosts.map((post) => (
          <TouchableOpacity 
            key={post.id}
            style={[commonStyles.card, { marginBottom: 15 }]}
            onPress={() => router.push(`/forum/${post.id}`)}
          >
            {/* Author Info */}
            <View style={[commonStyles.rowCenter, { marginBottom: 10 }]}>
              <Image 
                source={{ uri: post.avatar }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 14 }]}>
                  {post.author}
                </Text>
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  {post.time}
                </Text>
              </View>
              <View style={[commonStyles.badge, { backgroundColor: colors.backgroundAlt }]}>
                <Text style={[commonStyles.badgeText, { color: colors.primary }]}>
                  {tabs.find(tab => tab.id === post.category)?.name}
                </Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 16, marginBottom: 8 }]}>
              {post.title}
            </Text>
            <Text style={[commonStyles.textLight, { marginBottom: 10 }]} numberOfLines={2}>
              {post.content}
            </Text>

            {/* Post Image */}
            {post.image && (
              <Image 
                source={{ uri: post.image }}
                style={{ width: '100%', height: 150, borderRadius: 10, marginBottom: 15 }}
              />
            )}

            {/* Actions */}
            <View style={commonStyles.row}>
              <TouchableOpacity style={commonStyles.rowCenter}>
                <Icon name="heart-outline" size={18} style={{ color: colors.textLight, marginRight: 5 }} />
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  {post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.rowCenter, { marginLeft: 20 }]}>
                <Icon name="chatbubble-outline" size={18} style={{ color: colors.textLight, marginRight: 5 }} />
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  {post.comments}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.rowCenter, { marginLeft: 20 }]}>
                <Icon name="share-outline" size={18} style={{ color: colors.textLight, marginRight: 5 }} />
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  Chia sẻ
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={commonStyles.fabButton}
        onPress={() => router.push('/forum/create')}
      >
        <Icon name="add" size={24} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  );
}