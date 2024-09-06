import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICON } from '../resources/constant/Icons'
import Header from '../component/Header'
import COLORS from '../resources/constant/Color'
import ProductItem from '../component/item/ProductItem'
import AxiosInstance from '../helper/AxiosInstance'

const Product = ({navigation, route}: any) => {
  const {category} = route.params;
  const [ListData, setListData] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance().get(`/products/category/${category}`);
      const result = response.data;
      if (response.status) {
        setListData(result);
      }
    } catch (error) {
      console.log("Fetch data error: ",error);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <View style = {styles.container}>
      <Header
        title= "Sản phẩm"
        iconLeft={ICON.left}
        iconRight={ICON.cart}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.navigate("Cart")}
        leftIconSize={24}
        rightIconSize={24}
      />
      <View style = {styles.list}>
        <FlatList
          data={ListData}
          renderItem={({item}) => <ProductItem item = {item}/>}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  list: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
})