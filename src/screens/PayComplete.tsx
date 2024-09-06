import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../resources/constant/Color'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import RegularButton from '../component/RegularButton'

const PayComplete = ({navigation}: any) => {
  return (
    <View style = {styles.container}>
      <Header
        title='Thông báo'
        iconLeft={ICON.left}
        leftIconSize={24}
        onPressLeft={() => navigation.goBack()}
        rightIconSize={24}
      />
      <Text style = {styles.successText}>Bạn đã đặt hàng thành công</Text>
      <View style = {styles.bottom}>
        <View style = {styles.row}>
            <Text style = {styles.rowText}>Đã thanh toán</Text>
            <Text style = {styles.rowText}>151.515đ</Text>
        </View>
        <RegularButton
            title="Xem Cẩm nang trồng cây"
            onPress={() => navigation.navigate('Home')}
        />
        <TouchableOpacity
            style = {styles.homeButton}
            onPress={() => navigation.navigate('Home')}
        >
            <Text style = {styles.homeButtonText}>Quay về Trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PayComplete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    successText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.primary,
        textAlign: 'center',
        marginTop: 20,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    rowText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
    },
    homeButton: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    homeButtonText: {
        fontFamily: 'Lato-Regular',
        textDecorationLine: 'underline',
        color: COLORS.black,
        fontSize: 16,
    }
})