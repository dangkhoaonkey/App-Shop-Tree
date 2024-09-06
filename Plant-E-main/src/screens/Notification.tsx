import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'

const Notification = ({navigation}: any) => {
  return (
    <View style = {styles.container}>
      <Header
        title='Thông báo'
        iconLeft={ICON.left}
        onPressLeft={() => navigation.goBack()}
        leftIconSize={24}
        rightIconSize={24}
      />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
})