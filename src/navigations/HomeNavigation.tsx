import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import Cart from '../screens/Cart';
import Product from '../screens/Product';
import Detail from '../screens/Detail';
import ChangeProfile from '../screens/ChangeProfile';
import Payment from '../screens/Payment';
import PayComplete from '../screens/PayComplete';
import PaymentHistory from '../screens/PaymentHistory';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='BottomTabNavigation'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation} />
            <Stack.Screen name='Cart' component={Cart} />
            <Stack.Screen name='Product' component={Product} />
            <Stack.Screen name='Detail' component={Detail} />
            <Stack.Screen name='ChangeProfile' component={ChangeProfile} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='PaymentHistory' component={PaymentHistory} />
            <Stack.Screen name='PayComplete' component={PayComplete} />
        </Stack.Navigator>

    )
}

export default HomeNavigation