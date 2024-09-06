import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'
import LineTextInput from '../component/LineTextInput'
import AxiosInstance from '../helper/AxiosInstance'
import SearchItem from '../component/item/SearchItem'

const Search = ({navigation}: any) => {
  const [Item, setItem] = useState('');
  const [List, setList] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await AxiosInstance().get(`/products/search/${Item}`);
      if (result.status) {
        console.log(result.data);
        setList(result.data);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style = {styles.container}>
      <Header
        title='Tìm kiếm'
        iconLeft={ICON.left}
        onPressLeft={() => navigation.goBack()}
        leftIconSize={24}
        rightIconSize={24}
      />
      <LineTextInput
        errorText='123'
        placeholder='Tìm kiếm'
        onChangeText={(text) => setItem(text)}
        style={styles.textInput}
        rightImage={ICON.search}
        onPressRight={handleSearch}
      />
      {
        List.map((item: any) => (
          <SearchItem item={item} key={item._id} />
        ))
      }
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  textInput: {
    paddingHorizontal: 40
  }
})