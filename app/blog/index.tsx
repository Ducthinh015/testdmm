import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function BlogScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: 'grid' },
    { id: 'health', name: 'Sức khỏe', icon: 'medical' },
    { id: 'nutrition', name: 'Dinh dưỡng', icon: 'restaurant' },
    { id: 'training', name: 'Huấn luyện', icon: 'school' },
    { id: 'grooming', name: 'Chăm sóc', icon: 'brush' },
    { id: 'behavior', name: 'Hành vi', icon: 'happy' },
  ];

  const articles = [
    {
      id: 1,
      title: '5 Cách chăm sóc lông cho chó mèo hiệu quả',
      excerpt: 'Hướng dẫn chi tiết cách chăm sóc lông cho thú cưng để chúng luôn khỏe mạnh và đẹp...',
      category: 'grooming',
      author: 'Dr. Nguyễn Văn A',
      publishDate: '2024-02-15',
      readTime: '5 phút',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
      views: 1250,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: 'Chế độ dinh dưỡng cho chó con dưới 6 tháng tuổi',
      excerpt: 'Những điều cần biết về dinh dưỡng cho chó con để đảm bảo sự phát triển khỏe mạnh...',
      category: 'nutrition',
      author: 'Dr. Trần Thị B',
      publishDate: '2024-02-14',
      readTime: '7 phút',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=250&fit=crop',
      views: 980,
      likes: 67,
      featured: false
    },
    {
      id: 3,
      title: 'Dấu hiệu nhận biết mèo bị stress và cách xử lý',
      excerpt: 'Tìm hiểu các dấu hiệu stress ở mèo và phương pháp giúp mèo cưng thư giãn...',
      category: 'behavior',
      author: 'Dr. Lê Văn C',
      publishDate: '2024-02-13',
      readTime: '6 phút',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=250&fit=crop',
      views: 1450,
      likes: 112,
      featured: true
    },
    {
      id: 4,
      title: 'Lịch tiêm phòng chuẩn cho chó từ 0-12 tháng',
      excerpt: 'Hướng dẫn lịch tiêm phòng đầy đủ và đúng thời điểm cho chó con...',
      category: 'health',
      author: 'Dr. Phạm Thị D',
      publishDate: '2024-02-12',
      readTime: '8 phút',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=250&fit=crop',
      views: 2100,
      likes: 156,
      featured: false
    },
    {
      id: 5,
      title: 'Huấn luyện chó đi vệ sinh đúng chỗ trong 7 ngày',
      excerpt: 'Phương pháp hiệu quả để huấn luyện chó con đi vệ sinh đúng nơi quy định...',
      category: 'training',
      author: 'Huấn luyện viên Mai',
      publishDate: '2024-02-11',
      readTime: '10 phút',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=250&fit=crop',
      views: 1800,
      likes: 134,
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.title, { textAlign: 'center', flex: 1 }]}>
          Blog & Kiến thức
        </Text>
        <TouchableOpacity onPress={() => router.push('/blog/search')}>
          <Icon name="search" size={24} style={{ color: colors.primary }} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
          <Icon name="search" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
          <TextInput
            style={[commonStyles.text, { flex: 1 }]}
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textLight}
          />
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Articles */}
        {searchQuery === '' && (
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Bài viết nổi bật</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredArticles.map((article) => (
                <TouchableOpacity 
                  key={article.id}
                  style={[commonStyles.card, { width: 280, marginRight: 15 }]}
                  onPress={() => router.push(`/blog/${article.id}`)}
                >
                  <Image 
                    source={{ uri: article.image }}
                    style={{ width: '100%', height: 150, borderRadius: 10, marginBottom: 15 }}
                  />
                  <View style={[commonStyles.badge, { alignSelf: 'flex-start', marginBottom: 10 }]}>
                    <Text style={commonStyles.badgeText}>
                      {categories.find(cat => cat.id === article.category)?.name}
                    </Text>
                  </View>
                  <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 16, marginBottom: 8 }]} numberOfLines={2}>
                    {article.title}
                  </Text>
                  <Text style={[commonStyles.textLight, { marginBottom: 10 }]} numberOfLines={2}>
                    {article.excerpt}
                  </Text>
                  <View style={[commonStyles.row, { alignItems: 'center' }]}>
                    <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                      {article.author} • {article.readTime}
                    </Text>
                    <View style={[commonStyles.rowCenter, { marginLeft: 'auto' }]}>
                      <Icon name="eye" size={12} style={{ color: colors.textLight, marginRight: 3 }} />
                      <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                        {article.views}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ maxHeight: 60, marginBottom: 20 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                commonStyles.card,
                {
                  marginRight: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: activeCategory === category.id ? colors.primary : colors.card,
                  flexDirection: 'row',
                  alignItems: 'center',
                }
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Icon 
                name={category.icon as any} 
                size={16} 
                style={{ 
                  color: activeCategory === category.id ? 'white' : colors.primary,
                  marginRight: 8
                }} 
              />
              <Text style={[
                commonStyles.text,
                {
                  color: activeCategory === category.id ? 'white' : colors.text,
                  fontWeight: '600',
                  fontSize: 14
                }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Articles List */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>
            {searchQuery ? `Kết quả tìm kiếm (${filteredArticles.length})` : 'Tất cả bài viết'}
          </Text>
          
          {filteredArticles.map((article) => (
            <TouchableOpacity 
              key={article.id}
              style={[commonStyles.card, { marginBottom: 15 }]}
              onPress={() => router.push(`/blog/${article.id}`)}
            >
              <View style={commonStyles.rowCenter}>
                <Image 
                  source={{ uri: article.image }}
                  style={{ width: 80, height: 80, borderRadius: 10, marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.badge, { alignSelf: 'flex-start', marginBottom: 8 }]}>
                    <Text style={[commonStyles.badgeText, { fontSize: 10 }]}>
                      {categories.find(cat => cat.id === article.category)?.name}
                    </Text>
                  </View>
                  <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 14, marginBottom: 5 }]} numberOfLines={2}>
                    {article.title}
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12, marginBottom: 8 }]} numberOfLines={2}>
                    {article.excerpt}
                  </Text>
                  <View style={[commonStyles.row, { alignItems: 'center' }]}>
                    <Text style={[commonStyles.textLight, { fontSize: 11 }]}>
                      {article.author}
                    </Text>
                    <Text style={[commonStyles.textLight, { fontSize: 11, marginLeft: 10 }]}>
                      {article.readTime}
                    </Text>
                    <View style={[commonStyles.rowCenter, { marginLeft: 'auto' }]}>
                      <Icon name="heart" size={12} style={{ color: colors.danger, marginRight: 3 }} />
                      <Text style={[commonStyles.textLight, { fontSize: 11 }]}>
                        {article.likes}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}