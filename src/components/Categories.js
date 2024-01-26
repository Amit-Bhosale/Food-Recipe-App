import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated,{FadeInDown} from 'react-native-reanimated';

const Categories = ({categories,activeCategory, setActiveCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4" contentContainerStyle={{paddingHorizontal:15}}>
        {categories.map((data,index)=>{
            let isActive=data.strCategory==activeCategory;
            let activeImage=isActive? ' bg-amber-400':' bg-black/10';
            let activeText=isActive && ' font-bold'
            return (
                <TouchableOpacity onPress={()=>setActiveCategory(data.strCategory)} key={index} className="flex items-center space-y-1">
                    <View className={"rounded-full p-[6px]"+activeImage}>
                        <Image source={{uri:data.strCategoryThumb}} style={{height:hp(6),width:hp(6)}} className="rounded-full" />
                    </View>
                    <Text className={"text-neutral-600"+activeText} style={{fontSize:hp(1.6)}}>{data.strCategory}</Text>
                </TouchableOpacity>
            )
        }
        )}
    </ScrollView>
    </Animated.View>
  )
}

export default Categories