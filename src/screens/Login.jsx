import { Button, Image, Keyboard, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import LOGINSTYLE from '../styles/LoginStyle';
import { IMAGES } from '../resources/constant/Image';
import { ICON } from '../resources/constant/Icons';
import GradientButton from '../component/GradientButton';
import RegularTextInput from '../component/RegularTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/UserAPI';

const Login = ({navigation}) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const useAppDispatch = () => useDispatch();
    const useAppSelector = useSelector;
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);

    const handleLogin = async () => {
        try {
            const body = {
                email: Email,
                password: Password
            }
            dispatch(login(body));
            console.log(appState.user, 'user');
            console.log(Email);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     if (appState.user) {
    //       navigation.navigate("BottomTabNavigation");
    //     }
    //   }, [appState.user]);
    return (
        <ScrollView>
            <StatusBar
                hidden
            />
            <View>
                <Image
                    style={LOGINSTYLE.loginBackground}
                    resizeMode='stretch'
                    source={IMAGES.background}
                />
                <TouchableOpacity
                    style = {LOGINSTYLE.backButton}
                >
                    <Image
                        style = {LOGINSTYLE.backIcon}
                        source={require('../resources/icons/back.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style = {LOGINSTYLE.container}>
                <Text style = {LOGINSTYLE.loginHeaderText}>Chào mừng bạn</Text>
                <Text style = {LOGINSTYLE.loginTitle}>Đăng nhập tài khoản</Text>
                <RegularTextInput
                    placeholder='E-mail'
                    onChangeText={(text) => setEmail(text)}
                />
                <RegularTextInput
                    placeholder='Mật khẩu'
                    hiddenButton
                    onChangeText={(text) => setPassword(text)}
                    errorText='Invalid email or Password . Try Again !'
                />
                <View style = {LOGINSTYLE.rowContainer}>
                    
                    <TouchableOpacity
                        style = {LOGINSTYLE.checkBox}
                    >
                        <Image
                            style = {LOGINSTYLE.checkBoxIcon}
                            source={ICON.checkboxInvisible}
                        />
                        <Text style = {LOGINSTYLE.checkBoxTitle}>Nhớ tài khoản</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style = {LOGINSTYLE.forgotText}>Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                </View>
                <GradientButton
                    title="Đăng nhập"
                    buttonStyle={LOGINSTYLE.loginButton}
                    onPress={() => handleLogin()}
                />
                <View style = {LOGINSTYLE.rowContainer}>
                    <View style = {LOGINSTYLE.line}></View>
                    <Text style = {LOGINSTYLE.lineText}>Hoặc</Text>
                    <View style = {LOGINSTYLE.line}></View>
                </View>
                <View style = {LOGINSTYLE.otherRow}>
                    <TouchableOpacity>
                        <Image source={ICON.google} style = {LOGINSTYLE.otherIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={ICON.facebook} style = {LOGINSTYLE.otherIcon}/>
                    </TouchableOpacity>
                </View>
                <View style = {LOGINSTYLE.otherRow}>
                    <Text style = {LOGINSTYLE.otherText}>Bạn không có tài khoản</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style = {LOGINSTYLE.otherTouchText}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login
