import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'
import { IMAGES } from '../resources/constant/Image'
import LineTextInput from '../component/LineTextInput'
import RegularButton from '../component/RegularButton'
import AxiosInstance from '../helper/AxiosInstance'
import { useSelector } from 'react-redux'

const ChangeProfile = ({navigation}: any) => {
  const useAppSelector = useSelector;
  const appState = useAppSelector((state: any) => state.app);

  const id = appState.user._id;

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");

  const getProfile = async () => {
    try {
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

  const handleUpdate = async () => {
    try {
      const body = {
        name: Name,
        email: Email,
        address: Address,
        phone: parseInt(Phone),
      }
      const result = await AxiosInstance().put(`/users/update/${id}`, body);
      if (result.status) {
        ToastAndroid.show('Cập nhật thông tin thành công', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        console.log('error');
        ToastAndroid.show('Cập nhật thông tin thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  
  }

  useEffect(() => {
    getProfile();
  }, []);

  console.log(id);
  return (
    <View style = {styles.container}>
      <Header
        title='Chỉnh sửa thông tin'
        iconLeft={ICON.left}
        onPressLeft={() => navigation.goBack()}
        leftIconSize={24}
        rightIconSize={24}
      />
      <View style = {styles.body}>
        <Image
          source={IMAGES.chessboard}
          style = {styles.image}
        />
        <View style = {styles.textContainer}>
          <Text style = {styles.text}>Thông tin sẽ được lưu cho lần mua kế tiếp.</Text>
          <Text style = {styles.text}>Bấm vào thông tin chi tiết để chỉnh sửa.</Text>
        </View>

        <View>
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
      </View>
      <View style = {styles.bottom}>
        <RegularButton title="Lưu thông tin" onPress={() => handleUpdate()} style={styles.buyButton} />
      </View>
    </View>
  )
}

export default ChangeProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  body: {
    paddingHorizontal: 40,
    marginTop: 30
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 3
  },
  textContainer: {
    marginVertical: 30
  },
  buyButton: {
    marginTop: 10
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20
  }
})