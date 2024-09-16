// src/screens/AddProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { addProduct } from '../firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      // Thay đổi kích thước ảnh tại đây
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 600 } }], // Đặt kích thước ảnh mong muốn tại đây
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Tùy chỉnh chất lượng ảnh
      );
      setImage(manipResult.uri); // Cập nhật URI ảnh đã được thay đổi kích thước
    }
  };

  const handleAddProduct = async () => {
    if (!name || !brand || !category || !description || !price || !image) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }

    const productId = Date.now().toString(); // Tạo ID sản phẩm tạm thời
    const productData = {
      name,
      brand,
      category,
      description,
      price,
      image
    };

    try {
      await addProduct(productId, productData); // Thêm sản phẩm vào database
      Alert.alert('Thông báo', 'Sản phẩm đã được thêm thành công!');
      navigation.goBack(); // Quay lại trang trước đó
    } catch (error) {
      console.error('Lỗi thêm sản phẩm:', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi thêm sản phẩm.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <TouchableOpacity style={styles.imagePlaceholder} onPress={handlePickImage}>
            <Icon name="add-a-photo" size={40} color="#666" />
            <Text style={styles.imageText}>Chọn ảnh sản phẩm</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên thiết bị</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thiết bị"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hãng sản xuất</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập hãng sản xuất"
          value={brand}
          onChangeText={setBrand}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Danh mục</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Chọn danh mục" value="" />
          <Picker.Item label="Phổ thông" value="phổ thông" />
          <Picker.Item label="Tầm trung" value="tầm trung" />
          <Picker.Item label="Cận cao cấp" value="cận cao cấp" />
          <Picker.Item label="Cao cấp" value="cao cấp" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mô tả sản phẩm</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mô tả sản phẩm"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Giá sản phẩm</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giá sản phẩm"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Icon name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}>Thêm Sản Phẩm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  imageText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AddProductScreen;
