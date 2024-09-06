import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import COLORS from '../resources/constant/Color';
import WrapInput from './WrapInput';
import { ICON } from '../resources/constant/Icons';

interface RegularTextInputProps {
    placeholder?: string;
    secureTextEntry?: boolean;
    rightComponent?: ReactNode;
    errorText?: string;
    hiddenButton?: boolean;
    onChangeText?: (text: string) => void;
}

const RegularTextInput = (props: RegularTextInputProps) => {
    const {placeholder, rightComponent,
    errorText, hiddenButton, onChangeText} = props
    const [borderColor, setborderColor] = useState(COLORS.gray);
    const [SecureTextEntry, setSecureTextEntry] = useState(true);

    const handleFocus = () => {
        setborderColor(COLORS.primary);
    };
    const handleBlur = () => {
        setborderColor(COLORS.gray)
    };

    const handleHiddenButton = () => {
        return (
            rightComponent || (
                <View>
                    {hiddenButton ? (
                        <TouchableOpacity
                            onPress={() => setSecureTextEntry(!SecureTextEntry)}
                        >
                            <Image
                                source={SecureTextEntry ? ICON.eye : ICON.eyeOff}
                                style = {styles.hiddenButton}
                            />
                        </TouchableOpacity>
                    ) : (
                        null
                    )}
                </View>
            )
        )
    }
    
    
    return (
        <WrapInput
            errorText= {errorText}
        >
            <View style = {[styles.container, {borderColor: borderColor}]}>
                <TextInput
                    placeholder= {placeholder}
                    style = {styles.input}
                    secureTextEntry = {hiddenButton ? SecureTextEntry : false}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {handleHiddenButton()}
            </View>
            
        </WrapInput>
    )
}

export default RegularTextInput

const styles = StyleSheet.create({
    container: {
        height: 46,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        height: 47,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 15,
        fontSize: 15,
        width: '100%',
        color: COLORS.black
    },
    hiddenButton: {
        width: 20,
        height: 20,
        position: 'relative',
        right: 35
    }
}) 