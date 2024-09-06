import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../resources/constant/Color';
import { ICON } from '../../resources/constant/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../redux/Reducer';

const CartItem = ({ item }: any) => {
  const [ToggleCheckBox, setToggleCheckBox] = useState(false);

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state: any) => state.app);

  console.log(item);

  const handlePlus = () => {
    dispatch(incrementQuantity(item._id));
  };
  const handleMinus = () => {
    dispatch(decrementQuantity(item._id));
  };
  const handleDelete = () => {
    dispatch(removeFromCart(item._id));
  }
  return (
    <View style={styles.container}>
      <CheckBox
        disabled={false}
        value={ToggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        tintColors={{ true: COLORS.black }}
      />
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View>
        <Text style={styles.text}>
          {item.name} | <Text style={styles.type}>{item.type}</Text>
        </Text>

        <Text style={styles.price}>{item.price}đ</Text>

        <View style={styles.bottom}>
          <View style={styles.amountContainer}>
            <TouchableOpacity onPress={() => handleMinus()}>
              <Image source={ICON.minus} style={styles.amountIcon} />
            </TouchableOpacity>
            <Text style={styles.amountText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handlePlus()}>
              <Image source={ICON.plus} style={styles.amountIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete()}
          >
            <Text style={styles.delete}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  type: {
    color: COLORS.gray,
    fontSize: 14,
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.primary,
    marginVertical: 5,
  },
  bottom: {

    flexDirection: 'row',
  },
  amountIcon: {
    width: 20,
    height: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
  },
  amountText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 25
  },
  delete: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
});
