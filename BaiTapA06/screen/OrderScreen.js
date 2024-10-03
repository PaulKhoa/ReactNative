import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { auth, database } from '../firebase'; // Import Firebase
import { ref, onValue } from 'firebase/database';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
      const ordersRef = ref(database, `users/${userId}/orders`);
      onValue(ordersRef, (snapshot) => {
        const ordersData = snapshot.val();
        if (ordersData) {
          const ordersList = Object.entries(ordersData).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setOrders(ordersList);
        } else {
          setOrders([]);
        }
        setLoading(false);
      }, (error) => {
        Alert.alert('Lỗi', 'Không thể tải đơn hàng.');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {orders.length === 0 ? (
            <Text style={tw`text-lg text-center text-gray-600`}>Bạn chưa có đơn hàng nào.</Text>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
                <Text style={tw`text-lg font-bold text-blue-600`}>Đơn hàng ID: {order.id}</Text>
                <Text style={tw`text-base font-bold`}>Thời gian: {order.orderTime}</Text>
                <Text style={tw`text-base font-bold text-green-600`}>Tổng cộng: {formatPrice(order.totalAmount)}</Text>
                <Text style={tw`text-base font-bold`}>Hình thức thanh toán: {order.paymentMethod}</Text>
                <Text style={tw`text-base font-bold`}>Trạng thái: {order.status}</Text>

                <Text style={tw`text-lg font-bold mt-2`}>Sản phẩm:</Text>
                {order.items.map((item, index) => (
                  <View key={index} style={tw`flex-row items-center mt-1 border-b border-gray-300 py-2`}>
                    {item.image && ( // Check if image exists
                      <Image
                        source={{ uri: item.image }} // Assuming item has an image URL
                        style={tw`w-16 h-16 rounded-md mr-2`} // Adjust size as needed
                      />
                    )}
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-base`}>{item.name} x {item.quantity}</Text>
                      <Text style={tw`text-base font-bold text-yellow-600`}>
                        {formatPrice(item.totalPrice)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

// Hàm định dạng giá
const formatPrice = (price) => {
  if (price === undefined || price === null) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
};

export default OrderScreen;
