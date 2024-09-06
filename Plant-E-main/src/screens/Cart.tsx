import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import {ICON} from '../resources/constant/Icons';
import COLORS from '../resources/constant/Color';
import CartItem from '../component/item/CartItem';
import RegularButton from '../component/RegularButton';
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../helper/AxiosInstance';
import { clearCart } from '../redux/Reducer';

const Cart = ({navigation}: any) => {
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state: any) => state.app); 

  return (
    <View style={styles.container}>
      <Header
        title="Giỏ hàng"
        iconLeft={ICON.left}
        leftIconSize={24}
        onPressLeft={() => navigation.goBack()}
        iconRight={ICON.trash}
        onPressRight={() => dispatch(clearCart())}
        rightIconSize={24}
      />
      {
        appState.cart.map((item: any) => (
          <CartItem item={item} key={item._id} />
        ))
      }
      <View style = {styles.bottom}>
        <View style = {styles.priceConatiner}>
          <Text style = {styles.text}>Tạm tính</Text>
          <Text style = {styles.price}
          >
            {appState.cart.reduce((total: number, item: any) => {
              return total + item.price * item.quantity;
            }, 0)}đ
          </Text>
        </View>
        <RegularButton 
          title="Lưu thông tin"
          style={styles.buyButton}
          onPress={() => navigation.navigate('Payment')}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  priceConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black
  },
  buyButton: {
    marginTop: 10,
  },
  bottom: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 10,
  }
});
