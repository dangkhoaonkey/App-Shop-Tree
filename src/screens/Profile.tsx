import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'
import { IMAGES } from '../resources/constant/Image'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/Reducer'

const Profile = ({navigation}: any) => {
  const useAppSelector = useSelector;
  const appState = useAppSelector((state: any) => state.app); 
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <View style = {styles.container}>
      <Header
        title='Profile'
        leftIconSize={24}
        rightIconSize={24}
      />

      <TouchableOpacity
        style = {styles.userContainer}
      >
        <Image
          source={IMAGES.chessboard}
          style = {styles.userImage}
        />
        <View>
          <Text style = {styles.userName}>{appState.user.name}</Text>
          <Text style = {styles.userEmail}>{appState.user.email}</Text>
        </View>
      </TouchableOpacity>

      <View style = {styles.body}>
        <View style = {styles.setting}>
          <Text style = {styles.title}>Chung</Text>
          <View style = {styles.line}></View>
          <View>
            <TouchableOpacity
              style = {styles.button}
              onPress={() => navigation.navigate("ChangeProfile")}
            >
              <Text style = {styles.buttonText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.button}
            >
              <Text style = {styles.buttonText}>Cẩm nang trồng cây</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.button}
              onPress={() => navigation.navigate("PaymentHistory")}
            >
              <Text style = {styles.buttonText}>Lịch sử giao dịch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.button}
            >
              <Text style = {styles.buttonText}>Q & A</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style = {styles.setting}>
          <Text style = {styles.title}>Bảo mật và Điều khoản</Text>
          <View style = {styles.line}></View>
          <View>
            <TouchableOpacity
              style = {styles.button}
            >
              <Text style = {styles.buttonText}>Điều khoản và Điều kiện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.button}
            >
              <Text style = {styles.buttonText}>Chính sách quyền riêng tư</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.button}
              onPress={handleLogout}
            >
              <Text
                style = {[styles.buttonText, {color: COLORS.red}]}
              >
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginStart: '10%',
    marginEnd: '5%',
    marginVertical: 20
  },
  userName: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black
  },
  userEmail: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    marginTop: 2
  },
  body: {
    marginTop: 20,
    paddingHorizontal: 40
  },
  setting: {
    marginTop: 10
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
    marginTop: 8
  },
  button: {
    marginVertical: 15
  },
  buttonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black
  }
})