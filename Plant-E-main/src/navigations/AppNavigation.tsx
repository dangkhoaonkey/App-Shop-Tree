import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import HomeNavigation from './HomeNavigation';
import UserNavigation from './UserNavigation';

const useAppSelector = useSelector;

const AppNavigation = () => {
  const appState = useAppSelector((state: any) => state.app);
  return (
    <NavigationContainer>
      {
        appState.user ? <HomeNavigation/> : <UserNavigation/>
      }
    </NavigationContainer>
  )
}

export default AppNavigation
