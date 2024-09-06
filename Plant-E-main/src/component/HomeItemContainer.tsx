import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../resources/constant/Color'
import ProductItem from './item/ProductItem'

interface HomeItemContainerProps {
    title?: string;
    moreButton?: () => void;
    listData?: any;
}

const HomeItemContainer = (props: HomeItemContainerProps) => {
    const {title, moreButton, listData} = props
    const [ListData, setListData] = useState([])
    
    useEffect(() => {
        setListData(listData);
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style = {styles.list}>
                <FlatList
                    data={ListData}
                    renderItem={({item}) => <ProductItem item = {item}/>}
                    showsVerticalScrollIndicator = {false}
                    numColumns={2}
                    
                />
            </View>
            <TouchableOpacity
                style={styles.moreButton}
                onPress={moreButton}
            >
                <Text style={styles.moreText}>Xem thêm {title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeItemContainer

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 24,
        color: COLORS.black
    },
    list: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    moreButton: {
        alignSelf: 'flex-end',
        marginVertical: 10
    },
    moreText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
        textDecorationLine: 'underline',
    },
})