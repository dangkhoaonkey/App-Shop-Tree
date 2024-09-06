import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../resources/constant/Color'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

interface ProductItemProps {
    _id: string;
    name: string;
    price: string;
    images: string;
    thumbnail: string;
    type: string;
}

const ProductItem = ({item}: {item: ProductItemProps}) => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {id: item._id})}
            style = {styles.container}
        >
            <Image
                source={{uri: item.thumbnail}}
                style = {styles.image}
                resizeMode='cover'
            />
            <Text style = {styles.name}>{item.name}</Text>
            <Text style = {styles.type}>{item.type}</Text>
            <Text style = {styles.price}>{item.price}đ</Text>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    image: {
        width: 155,
        height: 134,
        borderRadius: 5
    },
    name: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
        marginTop: 4
    },
    type: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        marginTop: 3
    },
    price: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.primary,
        marginTop: 4
    }
})