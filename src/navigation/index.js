import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import WelcomScreen from '../screens/WelcomScreen'
import Home from '../screens/Home'
import RecipeDetail from '../screens/RecipeDetail'
    
const Stack=createNativeStackNavigator();
export default AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Welcome' component={WelcomScreen} options={{ gestureEnabled: false}} />
        <Stack.Screen name='Home' component={Home} options={{backBehavior: 'none'}}/>
        <Stack.Screen name='RecipeDetail' component={RecipeDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

