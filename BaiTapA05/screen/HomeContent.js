import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterMenu from './FilterMenu'; // Import FilterMenu
import { getProducts } from '../firebase'; // Import hàm lấy sản phẩm từ firebase.js
import tw from 'tailwind-react-native-classnames';

const HomeContent = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // Initialize sortOrder
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
        setFilteredProducts(productList);

        const uniqueCategories = [...new Set(productList.map(product => product.category))];
        setCategories(uniqueCategories);

        const uniqueBrands = [...new Set(productList.map(product => product.brand))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Lỗi lấy sản phẩm:', error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra khi lấy danh sách sản phẩm.');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts(searchQuery, products, selectedCategory, selectedBrand, sortOrder);
  }, [searchQuery, products, selectedCategory, selectedBrand, sortOrder]);

  const filterAndSortProducts = (query, productList, category, brand, order) => {
    let filtered = productList;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (brand) {
      filtered = filtered.filter(product => product.brand === brand);
    }
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery)
      );
    }
    if (order) {
      filtered = filtered.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price;
        } else if (order === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });
    }
    setFilteredProducts(filtered);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
  };

  const handleViewDetails = (product) => {
    navigation.navigate('ProductDetailsScreen', { product });
  };

  return (
    <View style={tw`flex-1 p-5 bg-gray-100`}>
      <View style={tw`flex-row items-center mb-5`}>
        <TouchableOpacity
          style={tw`mr-4`}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={tw`flex-1 h-10 border border-gray-300 rounded-full px-4 bg-gray-200 shadow-md`}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={tw`ml-2`}>
          <Icon name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {showMenu && (
        <FilterMenu
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onClose={() => setShowMenu(false)}
        />
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row bg-white mb-4 border border-gray-300 rounded-lg p-2 shadow-lg`}
            onPress={() => handleViewDetails(item)}
          >
            <Image source={{ uri: item.image }} style={tw`w-32 h-32 rounded-md m-2`} />
            <View style={tw`ml-4 justify-center flex-1`}>
              <Text style={tw`text-xl font-bold mb-2 text-gray-800`}>{item.name}</Text>
              <Text style={tw`text-lg text-red-600 font-semibold`}>{formatPrice(item.price)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeContent;
