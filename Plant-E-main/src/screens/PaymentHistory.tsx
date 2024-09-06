import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../resources/constant/Color'
import { ICON } from '../resources/constant/Icons'
import Header from '../component/Header'
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../helper/AxiosInstance'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


const PaymentHistory = ({ navigation }: any) => {
  const useAppSelector = useSelector;
  const appState = useAppSelector((state: any) => state.app);

  const id = appState.user._id;

  const [ListData, setListData] = useState([]);
  const [ProductList, setProductList] = useState([]);

  const handlePaymentHistory = async () => {
    try {
      const response = await AxiosInstance().get(`/carts/${id}`);
      if (response.status) {
        setListData(response.data);
      } else {
        ToastAndroid.show("Có lỗi xảy ra", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handlePaymentHistory();
  }, [])

  return (
    <View style={styles.container}>
      <Header
        title='Lịch sử giao dịch'
        iconLeft={ICON.left}
        leftIconSize={24}
        onPressLeft={() => navigation.goBack()}
        rightIconSize={24}
      />
      <View>
      </View>
    </View>
  )
}

export default PaymentHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
})