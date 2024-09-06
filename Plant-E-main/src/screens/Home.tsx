import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES } from '../resources/constant/Image';
import COLORS from '../resources/constant/Color';
import { ICON } from '../resources/constant/Icons';
import HomeItemContainer from '../component/HomeItemContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import AxiosInstance from '../helper/AxiosInstance';

const Home = ({ navigation }: any) => {
  const [ListPlant, setListPlant] = useState([]);
  const [ListPot, setListPot] = useState([]);
  const [ListAccessory, setListAccessory] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);

  const fetchPlant = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get(`/products/category/66097a0d378d336f7f23e71a`);
      const result = response.data;
      if (response.status) {
        setListPlant(result);
      }
      setRefreshing(false);
    } catch (error) {
      console.log("Fetch data error: ",error);
    }
  };

  const fetchPot = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get(`/products/category/66097a35378d336f7f23e71c`);
      const result = response.data;
      if (response.status) {
        setListPot(result);
      }
      setRefreshing(false);
    } catch (error) {
      console.log("Fetch data error: ",error);
    }
  };

  const fetchAccessory = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get(`/products/category/66097a5f378d336f7f23e71e`);
      const result = response.data;
      if (response.status) {
        setListAccessory(result);
      }
      setRefreshing(false);
    } catch (error) {
      console.log("Fetch data error: ",error);
    }
  };

  useEffect(() => {
    fetchPlant();
    fetchPot();
    fetchAccessory();
    return () => {}
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
        hidden={false}
      />
      <ScrollView>
        <View style={[styles.header]}>
          <Image source={IMAGES.homebg} style={styles.homebg} />
          <View style={styles.headerBody}>
            <Text style={styles.headerText}>
              Planta - Toả sáng không gian nhà bạn
            </Text>
            <TouchableOpacity style={styles.newProductRow}>
              <Text style={styles.newProductText}>Xem hàng mới về</Text>
              <Image source={ICON.arrow_right} style={styles.newProductIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cart}
            onPress={() => navigation.navigate('Cart')}>
            <Image source={ICON.cart} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.body}>
            <HomeItemContainer
              title="Cây trồng"
              moreButton={() => navigation.navigate('Product', {category: '66097a0d378d336f7f23e71a'})}
              listData={ListPlant}
            />
            <HomeItemContainer
              title="Chậu cây trồng"
              moreButton={() => navigation.navigate('Product', {category: '66097a35378d336f7f23e71c'})}
              listData={ListPot}
            />
            <HomeItemContainer
              title="Phụ kiện chăm sóc"
              moreButton={() => navigation.navigate('Product', {category: '66097a5f378d336f7f23e71e'})}
              listData={ListAccessory}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 320,
    backgroundColor: COLORS.lightgray,
  },
  homebg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 410,
    height: 240,
  },
  headerBody: {
    marginTop: 50,
    marginLeft: 20,
  },
  headerText: {
    width: '60%',
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    lineHeight: 35,
    color: COLORS.black,
  },
  newProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  newProductText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.primary,
  },
  newProductIcon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  cart: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  container: {
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
});
