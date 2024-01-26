import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View className="h-[250px]">
      <LottieView style={{flex:1}}  source={require('../../assets/loading_animation.json')} autoPlay loop />
    </View>
  )
}

export default Loading