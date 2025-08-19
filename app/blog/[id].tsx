import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Mock article data - in real app, fetch from API using the id
  const article = {
    id: 1,
    title: '5 Cách chăm sóc lông cho chó mèo hiệu quả',
    content: `
Chăm sóc lông cho thú cưng là một phần quan trọng trong việc duy trì sức khỏe và vẻ đẹp của chúng. Dưới đây là 5 cách hiệu quả để chăm sóc lông cho chó mèo:

## 1. Chải lông đều đặn

Việc chải lông hàng ngày không chỉ giúp loại bỏ lông rụng mà còn kích thích tuần hoàn máu, giúp lông mọc khỏe mạnh hơn. Đối với các giống có lông dài, bạn nên chải ít nhất 2 lần/ngày.

**Lưu ý:**
- Sử dụng lược phù hợp với loại lông
- Chải theo chiều mọc của lông
- Nhẹ nhàng ở những vùng nhạy cảm

## 2. Tắm đúng cách và đúng tần suất

Tần suất tắm phù hợp cho chó là 2-4 tuần/lần, còn mèo thường tự vệ sinh nên ít cần tắm hơn. Sử dụng sản phẩm chuyên dụng cho thú cưng.

## 3. Dinh dưỡng từ bên trong

Chế độ ăn giàu protein, omega-3 và các vitamin cần thiết sẽ giúp lông bóng mượt từ bên trong. Bổ sung thức ăn chứa:
- Cá hồi
- Dầu cá
- Trứng
- Rau xanh

## 4. Kiểm tra và điều trị ký sinh trùng

Ký sinh trùng như ve, bọ chét có thể gây ngứa, làm hỏng lông. Thường xuyên kiểm tra và sử dụng thuốc phòng trừ ký sinh trùng theo chỉ định của bác sĩ thú y.

## 5. Môi trường sống phù hợp

Độ ẩm không khí phù hợp (40-60%) và nhiệt độ ổn định sẽ giúp lông không bị khô và gãy. Tránh để thú cưng ở nơi quá khô hoặc quá ẩm.

## Kết luận

Chăm sóc lông cho thú cưng cần sự kiên trì và đúng phương pháp. Nếu phát hiện bất thường về lông (rụng nhiều, có vảy, ngứa), hãy đưa thú cưng đến bác sĩ thú y để được tư vấn và điều trị kịp thời.
    `,
    category: 'grooming',
    author: 'Dr. Nguyễn Văn A',
    authorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face',
    publishDate: '2024-02-15',
    readTime: '5 phút',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
    views: 1250,
    likes: 89,
    tags: ['chăm sóc lông', 'sức khỏe thú cưng', 'grooming', 'chó mèo']
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Cách tắm cho chó mèo đúng cách',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=120&fit=crop',
      readTime: '4 phút'
    },
    {
      id: 3,
      title: 'Chọn lược chải lông phù hợp',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=120&fit=crop',
      readTime: '3 phút'
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    console.log('Article liked:', !liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    console.log('Article bookmarked:', !bookmarked);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nĐọc thêm tại DogMeoMeo App`,
        title: article.title,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      if (paragraph.startsWith('## ')) {
        return (
          <Text key={index} style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 10 }]}>
            {paragraph.replace('## ', '')}
          </Text>
        );
      }
      
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <Text key={index} style={[commonStyles.text, { fontWeight: '600', marginBottom: 10 }]}>
            {paragraph.replace(/\*\*/g, '')}
          </Text>
        );
      }
      
      if (paragraph.startsWith('- ')) {
        return (
          <Text key={index} style={[commonStyles.text, { marginLeft: 20, marginBottom: 5 }]}>
            • {paragraph.replace('- ', '')}
          </Text>
        );
      }
      
      return (
        <Text key={index} style={[commonStyles.text, { marginBottom: 15, lineHeight: 24 }]}>
          {paragraph}
        </Text>
      );
    });
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={handleBookmark} style={{ marginRight: 15 }}>
          <Icon 
            name={bookmarked ? "bookmark" : "bookmark-outline"} 
            size={24} 
            style={{ color: bookmarked ? colors.primary : colors.textLight }} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-outline" size={24} style={{ color: colors.textLight }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Article Header */}
        <View style={{ marginBottom: 20 }}>
          <Image 
            source={{ uri: article.image }}
            style={{ width: '100%', height: 200, borderRadius: 15, marginBottom: 20 }}
          />
          
          <Text style={[commonStyles.title, { fontSize: 24, lineHeight: 32, marginBottom: 15 }]}>
            {article.title}
          </Text>
          
          <View style={[commonStyles.rowCenter, { marginBottom: 15 }]}>
            <Image 
              source={{ uri: article.authorAvatar }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {article.author}
              </Text>
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                {article.publishDate} • {article.readTime} đọc
              </Text>
            </View>
            <View style={[commonStyles.rowCenter]}>
              <Icon name="eye" size={16} style={{ color: colors.textLight, marginRight: 5 }} />
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                {article.views}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {article.tags.map((tag, index) => (
              <View key={index} style={[commonStyles.badge, { marginRight: 8, backgroundColor: colors.backgroundAlt }]}>
                <Text style={[commonStyles.badgeText, { color: colors.primary }]}>
                  #{tag}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Article Content */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          {formatContent(article.content)}
        </View>

        {/* Action Buttons */}
        <View style={[commonStyles.card, { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }]}>
          <TouchableOpacity 
            style={[commonStyles.rowCenter, { flex: 1, paddingVertical: 15 }]}
            onPress={handleLike}
          >
            <Icon 
              name={liked ? "heart" : "heart-outline"} 
              size={20} 
              style={{ color: liked ? colors.danger : colors.textLight, marginRight: 8 }} 
            />
            <Text style={[commonStyles.text, { color: liked ? colors.danger : colors.textLight }]}>
              {liked ? article.likes + 1 : article.likes}
            </Text>
          </TouchableOpacity>
          
          <View style={[commonStyles.divider, { width: 1, height: '100%' }]} />
          
          <TouchableOpacity 
            style={[commonStyles.rowCenter, { flex: 1, paddingVertical: 15 }]}
            onPress={() => router.push(`/blog/${id}/comments`)}
          >
            <Icon name="chatbubble-outline" size={20} style={{ color: colors.textLight, marginRight: 8 }} />
            <Text style={[commonStyles.text, { color: colors.textLight }]}>
              Bình luận
            </Text>
          </TouchableOpacity>
          
          <View style={[commonStyles.divider, { width: 1, height: '100%' }]} />
          
          <TouchableOpacity 
            style={[commonStyles.rowCenter, { flex: 1, paddingVertical: 15 }]}
            onPress={handleShare}
          >
            <Icon name="share-outline" size={20} style={{ color: colors.textLight, marginRight: 8 }} />
            <Text style={[commonStyles.text, { color: colors.textLight }]}>
              Chia sẻ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Related Articles */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Bài viết liên quan</Text>
          {relatedArticles.map((relatedArticle) => (
            <TouchableOpacity 
              key={relatedArticle.id}
              style={[commonStyles.card, { marginBottom: 15 }]}
              onPress={() => router.push(`/blog/${relatedArticle.id}`)}
            >
              <View style={commonStyles.rowCenter}>
                <Image 
                  source={{ uri: relatedArticle.image }}
                  style={{ width: 80, height: 60, borderRadius: 8, marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 5 }]} numberOfLines={2}>
                    {relatedArticle.title}
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    {relatedArticle.readTime} đọc
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} style={{ color: colors.textLight }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}