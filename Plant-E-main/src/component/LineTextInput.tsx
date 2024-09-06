import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import COLORS from '../resources/constant/Color'
import WrapInput from './WrapInput'
import { ICON } from '../resources/constant/Icons'


interface LineTextInput {
    errorText?: string,
    placeholder?: string,
    style?: ViewStyle,
    rightComponent?: ReactNode,
    rightImage?: ImageSourcePropType,
    onChangeText?: (text: string) => void,
    onPressRight?: () => void,
    value?: string,
}

const LineTextInput = (props: LineTextInput) => {
    const { errorText, placeholder, style, rightComponent,
        rightImage, onChangeText, value, onPressRight } = props
    const handleRightIcon = () => {
        return (
            rightComponent || (
                <View>
                    {rightImage ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onPressRight}
                        >
                            <Image
                                source={rightImage}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    ) : (null)
                    }

                </View>
            )
        )
    }
    return (
        <WrapInput
            errorText={errorText}
            style={style}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={placeholder}
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    value={value}
                />
                {handleRightIcon()}
            </View>

            <View style={styles.line}></View>
        </WrapInput>
    )
}

export default LineTextInput

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.black
    },
    textInput: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        width: '100%',
        height: 44
    },
    button: {
        position: 'relative',
        right: 20,
    },
    icon: {
        
        width: 20,
        height: 20
    }
})