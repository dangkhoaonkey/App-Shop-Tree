import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'
import LineTextInput from '../component/LineTextInput'
import RegularButton from '../component/RegularButton'
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../helper/AxiosInstance'
import { clearCart } from '../redux/Reducer'

const Payment = ({navigation}: any) => {
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state: any) => state.app);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");

  const [ShippingText, setShippingText] = useState(true);
  const [FastShipping, setFastShipping] = useState(COLORS.primary);
  const [CODShipping, setCODShipping] = useState(COLORS.black);
  const [PaymentText, setPaymentText] = useState(true)
  const [VISAtext, setVISAtext] = useState(COLORS.primary);
  const [ATMtext, setATMtext] = useState(COLORS.black);

  const [ShipFee, setShipFee] = useState(15000);

  const handleShippingText = () => {
    setShippingText(!ShippingText);
    if (ShippingText) {
      setFastShipping(COLORS.black);
      setCODShipping(COLORS.primary);
      setShipFee(20000);
    } else {
      setFastShipping(COLORS.primary);
      setCODShipping(COLORS.black);
      setShipFee(15000);
    }
  }

  const handlePaymentText = () => {
    setPaymentText(!PaymentText);
    if (PaymentText) {
      setVISAtext(COLORS.black);
      setATMtext(COLORS.primary);
    } else {
      setVISAtext(COLORS.primary);
      setATMtext(COLORS.black);
    }
  }

  const checkout = async () => {
    try {
      const body = {
        user_id: appState.user._id,
        products: appState.cart.map((item: any) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      }
      const result = await AxiosInstance().post('/carts', body);
      if (result.status) {
        dispatch(clearCart());
        navigation.navigate('PayComplete');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getProfile = async () => {
    try {
      const id = appState.user._id;
      const result = await AxiosInstance().get(`/users/getId/${id}`);
      if (result.status) {
        console.log(result.data);
        setName(result.data.name);
        setEmail(result.data.email);
        setAddress(result.data.address);
        setPhone(result.data.phone.toString());
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style = {styles.container}>
      <Header
        title='Thanh Toán'
        iconLeft={ICON.left}
        leftIconSize={24}
        onPressLeft={() => navigation.goBack()}
        rightIconSize={24}
      />
      <View style = {styles.body}>
        <View style = {styles.info}>
          <Text style = {styles.headerText}>Thông tin khách hàng</Text>
          <View style = {styles.line}></View>
          <LineTextInput
            placeholder='Họ Tên'
            value={Name}
            onChangeText={(text) => setName(text)}
          />
          <LineTextInput
            placeholder='Email'
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />
          <LineTextInput
            placeholder='Địa chỉ'
            value={Address}
            onChangeText={(text) => setAddress(text)}
          />
          <LineTextInput
            placeholder='Số điện thoại'
            value={Phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>

        <View style = {[styles.info, {marginTop: 30}]}>
          <Text style = {styles.headerText}>Phương thức vận chuyển</Text>
          <View style = {styles.line}></View>
          <TouchableOpacity
            onPress={() => handleShippingText()}
            style = {styles.shipButton}
          >
            <Text style = {[styles.rowTitle, {color: FastShipping}]}>Giao hàng nhanh = 15.000đ</Text>
            <Text style = {styles.rowTitle}>Dự kiến giao hàng 7 -8/4</Text>
          </TouchableOpacity>
          <View style = {styles.line}></View>
          <TouchableOpacity
            onPress={() => handleShippingText()}
            style = {styles.shipButton}
          >
            <Text style = {[styles.rowTitle, {color: CODShipping}]}>Giao hàng COD = 20.000đ</Text>
            <Text style = {styles.rowTitle}>Dự kiến giao hàng 6 -9/4</Text>
          </TouchableOpacity>
          <View style = {styles.line}></View>
        </View>

        <View style = {[styles.info, {marginTop: 10}]}>
          <Text style = {styles.headerText}>Hình thức thanh toán</Text>
          <View style = {styles.line}></View>
          <TouchableOpacity
            onPress={() => handlePaymentText()}
            style = {styles.shipButton}
          >
            <Text style = {[styles.rowTitle, {color: VISAtext}]}>Thẻ VISA/MASTERCARD</Text>
          </TouchableOpacity>
          <View style = {styles.line}></View>
          <TouchableOpacity
            onPress={() => handlePaymentText()}
            style = {styles.shipButton}
          >
            <Text style = {[styles.rowTitle, {color: ATMtext}]}>Thẻ ATM</Text>
          </TouchableOpacity>
          <View style = {styles.line}></View>
        </View>

      </View>

      <View style = {styles.bottom}>
        <View style = {styles.rowContainer}>
          <View style = {styles.row}>
            <Text style = {styles.rowTitle}>Tạm tính</Text>
            <Text style = {styles.rowBody}
          >
            {appState.cart.reduce((total: number, item: any) => {
              return total + item.price * item.quantity;
            }, 0)}đ
          </Text>
          </View>
          <View style = {styles.row}>
            <Text style = {styles.rowTitle}>Phí vận chuyển</Text>
            <Text style = {styles.rowBody}>{ShipFee}đ</Text>
          </View>
          <View style = {styles.row}>
            <Text style = {[styles.rowTitle, {fontSize: 16, color: COLORS.black}]}>Tổng cộng</Text>
            <Text style = {[styles.rowTitle, {fontSize: 16, color: COLORS.primary}]}>
              {appState.cart.reduce((total: number, item: any) => {
                return total + item.price * item.quantity;
              }, 0) + ShipFee}đ
            </Text>
          </View>
        </View>
        <RegularButton
          title='Tiếp tục'
          onPress={() => checkout()}
        />
      </View>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  body: {
    padding: 20
  },
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black
  },
  info: {
    paddingHorizontal: 20
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  rowContainer: {
    marginVertical: 10
  },
  rowTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  rowBody: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: COLORS.black,
  },
  shipButton: {
    marginTop: 10,
    paddingVertical: 10
  }
})