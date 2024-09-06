import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../resources/constant/Color';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

interface ProductItemProps {
    _id: string;
    name: string;
    price: string;
    images: string;
    thumbnail: string;
    type: string;
}

const HistoryItem = ({item}: {item: ProductItemProps}) => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {id: item._id})}
            style={styles.container}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View>
                <Text style={styles.text}>
                    {item.name} | <Text style={styles.type}>{item.type}</Text>
                </Text>

                <Text style={styles.price}>{item.price}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default HistoryItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
    },
    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
    },
    type: {
        color: COLORS.gray,
        fontSize: 14,
    },
    price: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.primary,
        marginVertical: 5,
    },
})