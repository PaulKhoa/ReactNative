// ProductManagementScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getProducts } from '../firebase'; // Import hàm lấy sản phẩm từ firebase.js

const ProductManagementScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Lỗi lấy sản phẩm:', error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra khi lấy danh sách sản phẩm.');
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    navigation.navigate('AdminProductDetailsScreen', { product });
  };

  const handleAdd = () => {
    navigation.navigate('AddProductScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Sản Phẩm</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => handleViewDetails(item)}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price} VNĐ</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleAdd}>
          <Icon name="add-circle-outline" size={30} color="#4CAF50" />
          <Text style={styles.footerButtonText}>Thêm sản phẩm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  footerButtonText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default ProductManagementScreen;
