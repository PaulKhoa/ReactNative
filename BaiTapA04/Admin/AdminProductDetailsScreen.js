import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteProduct, updateProduct } from '../firebase';

const AdminProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: product.id, // Ensure ID is included for updates
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    price: product.price.toString(), // Ensure price is a string
    image: product.image,
  });

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      Alert.alert('Thông báo', 'Sản phẩm đã được xóa.');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi xóa sản phẩm:', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi xóa sản phẩm.');
    }
  };

  const handleEdit = async () => {
    try {
      await updateProduct(editedProduct.id, {
        name: editedProduct.name,
        brand: editedProduct.brand,
        category: editedProduct.category,
        description: editedProduct.description,
        price: parseFloat(editedProduct.price), // Convert price back to number
        image: editedProduct.image,
      });
      Alert.alert('Thông báo', 'Sản phẩm đã được cập nhật.');
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi sửa sản phẩm:', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi sửa sản phẩm.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: editedProduct.image }} style={styles.image} resizeMode="contain" />
      </View>
      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên sản phẩm</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.name}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, name: text })}
              placeholder="Tên sản phẩm"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Thương hiệu</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.brand}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, brand: text })}
              placeholder="Thương hiệu"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Danh mục</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.category}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, category: text })}
              placeholder="Danh mục"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Giá sản phẩm</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.price}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, price: text })}
              placeholder="Giá sản phẩm"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả sản phẩm</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={editedProduct.description}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, description: text })}
              placeholder="Mô tả sản phẩm"
              multiline
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Icon name="save" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{editedProduct.name}</Text>
          <Text style={styles.brand}>{editedProduct.brand}</Text>
          <Text style={styles.category}>{editedProduct.category}</Text>
          <Text style={styles.price}>{editedProduct.price} VNĐ</Text>
          <Text style={styles.description}>{editedProduct.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Icon name="edit" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
              <Icon name="delete" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').width * 0.6,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  brand: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'justify',
  },
});

export default AdminProductDetailsScreen;
