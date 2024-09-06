import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IMAGES } from '../resources/constant/Image'
import LOGINSTYLE from '../styles/LoginStyle'
import { ICON } from '../resources/constant/Icons'
import GradientButton from '../component/GradientButton'
import RegularTextInput from '../component/RegularTextInput'
import AxiosInstance from '../helper/AxiosInstance'

const SignUp = ({ navigation }: any) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [Refreshing, setRefreshing] = useState(false);

  const [NameErrorText, setNameErrorText] = useState("");
  const [EmailErrorText, setEmailErrorText] = useState("");
  const [PhoneErrorText, setPhoneErrorText] = useState("");
  const [PasswordErrorText, setPasswordErrorText] = useState("");

  const handleSignUp = async () => {
    try {
      setNameErrorText("");
      setEmailErrorText("");
      setPhoneErrorText("");
      setPasswordErrorText("");

      if (Name === "") {
        setNameErrorText("Họ tên không được để trống");
        return;
      }
      if (Email === "") {
        setEmailErrorText("Email không được để trống");
        return;
      }
      if (Phone === "") {
        setPhoneErrorText("Số điện thoại không được để trống");
        return;
      }
      if (Password === ""){
        setPasswordErrorText("Mật khẩu không được để trống");
        return;
      }
      if (Password.length < 8) {
        setPasswordErrorText("Mật khẩu phải có ít nhất 8 ký tự");
        return;
      }
      if (Phone.length < 10) {
        setPhoneErrorText("Số điện thoại không hợp lệ");
        return;
      }
      setRefreshing(true);
      const response = await AxiosInstance().post(`/users/register`, {
        name: Name,
        email: Email,
        phone: Phone,
        password: Password,
      });
      const result = response.data;
      if (response.status) {
        navigation.navigate("Login");
        ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
      } else {
        console.log("Lỗi đăng ký: ", result);
        ToastAndroid.show("Xảy ra lỗi khi đăng ký", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Xảy ra lỗi khi đăng ký: ", error);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View>
          <Image
            source={IMAGES.suBackground}
            resizeMode='stretch'
            style={LOGINSTYLE.signUpBackground}
          />
        </View>
        <View style={LOGINSTYLE.container}>
          <Text style={LOGINSTYLE.loginHeaderText}>Đăng ký</Text>
          <Text style={LOGINSTYLE.loginTitle}>Tạo tài khoản</Text>
          <RegularTextInput
            placeholder='Họ tên'
            onChangeText={(item) => setName(item)}
            errorText= {NameErrorText}
          />
          <RegularTextInput
            placeholder='E-mail'
            onChangeText={(item) => setEmail(item)}
            errorText= {EmailErrorText}
          />
          <RegularTextInput
            placeholder='Số điện thoại'
            onChangeText={(item) => setPhone(item)}
            errorText= {PhoneErrorText}
          />
          <RegularTextInput
            placeholder='Mật khẩu'
            hiddenButton
            onChangeText={(item) => setPassword(item)}
            errorText= {PasswordErrorText}
          />
          <Text style={LOGINSTYLE.text}>
            Để đăng ký tài khoản, bạn đồng ý
            <Text style={LOGINSTYLE.termText}> Term & Conditions</Text> and
            <Text style={LOGINSTYLE.termText}> Privacy Policy </Text>
          </Text>
          <GradientButton
            title="Đăng ký"
            buttonStyle={LOGINSTYLE.loginButton}
            onPress={() => handleSignUp()}
          />
          <View style={LOGINSTYLE.rowContainer}>
            <View style={LOGINSTYLE.line}></View>
            <Text style={LOGINSTYLE.lineText}>Hoặc</Text>
            <View style={LOGINSTYLE.line}></View>
          </View>
          <View style={LOGINSTYLE.otherRow}>
            <TouchableOpacity>
              <Image source={ICON.google} style={LOGINSTYLE.otherIcon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={ICON.facebook} style={LOGINSTYLE.otherIcon} />
            </TouchableOpacity>
          </View>
          <View style={LOGINSTYLE.otherRow}>
            <Text style={LOGINSTYLE.otherText}>Tôi đã có tài khoản</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={LOGINSTYLE.otherTouchText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

export default SignUp