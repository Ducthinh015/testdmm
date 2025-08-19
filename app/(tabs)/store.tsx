import { Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function StoreScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: 'grid' },
    { id: 'food', name: 'Thức ăn', icon: 'restaurant' },
    { id: 'toys', name: 'Đồ chơi', icon: 'football' },
    { id: 'accessories', name: 'Phụ kiện', icon: 'bag' },
    { id: 'health', name: 'Sức khỏe', icon: 'medical' },
  ];

  const products = [
    {
      id: 1,
      name: 'Thức ăn cho chó Royal Canin',
      price: '450.000đ',
      originalPrice: '500.000đ',
      rating: 4.8,
      reviews: 124,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop',
      discount: 10,
      inStock: true
    },
    {
      id: 2,
      name: 'Đồ chơi bóng cao su cho chó',
      price: '85.000đ',
      originalPrice: '100.000đ',
      rating: 4.6,
      reviews: 89,
      category: 'toys',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
      discount: 15,
      inStock: true
    },
    {
      id: 3,
      name: 'Vòng cổ LED an toàn',
      price: '120.000đ',
      originalPrice: '150.000đ',
      rating: 4.9,
      reviews: 156,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
      discount: 20,
      inStock: false
    },
    {
      id: 4,
      name: 'Vitamin tổng hợp cho mèo',
      price: '200.000đ',
      originalPrice: '220.000đ',
      rating: 4.7,
      reviews: 67,
      category: 'health',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
      discount: 9,
      inStock: true
    },
    {
      id: 5,
      name: 'Thức ăn ướt cho mèo Whiskas',
      price: '25.000đ',
      originalPrice: '30.000đ',
      rating: 4.5,
      reviews: 234,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=300&h=300&fit=crop',
      discount: 17,
      inStock: true
    },
    {
      id: 6,
      name: 'Chuồng vận chuyển thú cưng',
      price: '350.000đ',
      originalPrice: '400.000đ',
      rating: 4.8,
      reviews: 45,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
      discount: 12,
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }]}>
        <Text style={[commonStyles.title, { textAlign: 'left' }]}>
          Cửa hàng
        </Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <View>
            <Icon name="bag" size={32} style={{ color: colors.primary }} />
            <View style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: colors.danger,
              borderRadius: 10,
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <View style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }]}>
          <Icon name="search" size={20} style={{ color: colors.textLight, marginRight: 10 }} />
          <TextInput
            style={[commonStyles.text, { flex: 1 }]}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textLight}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 60 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
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

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filteredProducts.map((product) => (
            <TouchableOpacity 
              key={product.id}
              style={[commonStyles.card, { width: '48%', marginBottom: 15, padding: 10 }]}
              onPress={() => router.push(`/store/${product.id}`)}
            >
              {/* Product Image */}
              <View style={{ position: 'relative', marginBottom: 10 }}>
                <Image 
                  source={{ uri: product.image }}
                  style={{ width: '100%', height: 120, borderRadius: 8 }}
                />
                {product.discount > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    backgroundColor: colors.danger,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2
                  }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                      -{product.discount}%
                    </Text>
                  </View>
                )}
                {!product.inStock && (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Hết hàng</Text>
                  </View>
                )}
              </View>

              {/* Product Info */}
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 14, marginBottom: 5 }]} numberOfLines={2}>
                {product.name}
              </Text>
              
              <View style={[commonStyles.rowCenter, { marginBottom: 5 }]}>
                <Icon name="star" size={12} style={{ color: colors.warning, marginRight: 3 }} />
                <Text style={[commonStyles.textLight, { fontSize: 11 }]}>
                  {product.rating} ({product.reviews})
                </Text>
              </View>

              <View style={commonStyles.rowCenter}>
                <Text style={[commonStyles.text, { fontWeight: '700', color: colors.primary, fontSize: 16 }]}>
                  {product.price}
                </Text>
                {product.originalPrice !== product.price && (
                  <Text style={[commonStyles.textLight, { fontSize: 12, textDecorationLine: 'line-through', marginLeft: 5 }]}>
                    {product.originalPrice}
                  </Text>
                )}
              </View>

              {/* Add to Cart Button */}
              <TouchableOpacity 
                style={[
                  {
                    backgroundColor: product.inStock ? colors.primary : colors.textLight,
                    borderRadius: 8,
                    paddingVertical: 8,
                    alignItems: 'center',
                    marginTop: 10
                  }
                ]}
                disabled={!product.inStock}
                onPress={() => console.log('Add to cart:', product.id)}
              >
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                  {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}