import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../component/Header';
import { ICON } from '../resources/constant/Icons';
import COLORS from '../resources/constant/Color';
import RegularButton from '../component/RegularButton';
import Carousel from 'react-native-reanimated-carousel';
import Dots from 'react-native-dots-pagination';
import AxiosInstance from '../helper/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity, quantityDisplay } from '../redux/Reducer';

const Detail = ({ navigation, route }) => {
  const { id } = route.params;

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const [Product, setProduct] = useState({});
  const [ActiveSlide, setActiveSlide] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance().get(`/products/${id}`);
      if (response.status) {
        setProduct(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const quantity = useMemo(() => {
    const item = appState.cart.find((item) => item._id === id);
    return item ? item.quantity : 0;
  }, [appState.cart, id]);

  useEffect(() => {
    fetchProduct();
    return () => { }
  }, []);

  const handleAddToCart = () => {
    const item = {
      _id: Product._id,
      name: Product.name,
      price: Product.price,
      thumbnail: Product.thumbnail,
      type: Product.type,
      quantity: 1
    }
    dispatch(addToCart(item));
  }

  const handleIncrement = () => {
    dispatch(incrementQuantity(Product._id));
  }

  const handleDecrement = () => {
    dispatch(decrementQuantity(Product._id));
  }

  const width = Dimensions.get('window').width;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={Product.name}
        iconLeft={ICON.left}
        iconRight={ICON.cart}
        leftIconSize={24}
        rightIconSize={20}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.navigate('Cart')}
      />

      <Carousel
        loop
        width={width}
        height={width * 0.8}
        style = {styles.carousel}
        autoPlay={true}
        data={Product.images}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ item: imageUri }) => (
          <View
            style={{
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
            />
          </View>
        )}
      />

      <View>
        <Dots length={Product.images ? Product.images.length : 0} active={ActiveSlide}/>
      </View>

      <View style={styles.body}>
        <View style={styles.typeContainer}>
          <View style={styles.type}>
            <Text style={styles.typeText}>{Product.type}</Text>
          </View>
        </View>

        <Text style={styles.price}>{Product.price}đ</Text>

        <View>
          <Text style={styles.detailText}>Chi tiết sản phẩm</Text>
          <View style={styles.lineDark}></View>

          <View style={styles.infoRow}>
            <Text style={styles.blackText}>Kích cỡ</Text>
            <Text style={styles.blackText}>{Product.size}</Text>
          </View>
          <View style={styles.lineGray}></View>

          <View style={styles.infoRow}>
            <Text style={styles.blackText}>Xuất xứ</Text>
            <Text style={styles.blackText}>{Product.origin}</Text>
          </View>
          <View style={styles.lineGray}></View>

          <View style={styles.infoRow}>
            <Text style={styles.blackText}>Tình trạng</Text>
            <Text style={styles.greenText}>{Product.quantity}</Text>
          </View>
          <View style={styles.lineGray}></View>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.moreContainer}>
          <View>
            <Text style={styles.headerAmount}>Đã chọn {quantity} sản phẩm</Text>
            <View style={styles.amountContainer}>
              <TouchableOpacity
                onPress={() => handleDecrement()}
              >
                <Image source={ICON.minus} style={styles.amountIcon} />
              </TouchableOpacity>
              <Text style={styles.amountText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => handleIncrement()}
              >
                <Image source={ICON.plus} style={styles.amountIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.headerPrice}>Tạm tính</Text>
            <Text style={styles.totalPrice}>
              {parseInt(Product.price) * quantity}
            </Text>
          </View>
        </View>

        <RegularButton
          title="Chọn mua"
          style={styles.buyButton}
          onPress={() => handleAddToCart()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  carousel: {
  },
  body: {
    paddingHorizontal: 50,
    height: '56%'
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  type: {
    padding: 7,
    marginRight: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  typeText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    color: COLORS.primary,
    marginVertical: 20,
  },
  lineDark: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black,
  },
  lineGray: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 2,
  },
  blackText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: COLORS.black,
  },
  greenText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: COLORS.primary,
  },
  detailText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    color: COLORS.black,
    marginBottom: 3,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  headerAmount: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    marginBottom: 5,
  },
  headerPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 5,
  },
  totalPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'right',
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyButton: {
    marginTop: 10,
  },
  amountIcon: {
    width: 30,
    height: 30,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
});
