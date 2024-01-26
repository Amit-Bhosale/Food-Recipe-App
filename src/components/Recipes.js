import { View, Text, Pressable,Image, FlatList } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
// import Loading from './Loading';



const Recipes = ({recipes}) => {
  const navigation=useNavigation();
  return (
    <View className="space-y-3">
      <Text style={{fontSize:hp(3)}} className="font-semibold text-neutral-600 ">Recipes</Text>
      {recipes && 
      <View className="h-full">
            <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item,i}) =><RecipeCard item={item} index={i} navigation={navigation}/>}
            refreshing={false}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.8}
            // onEndReached={() => onEndReached()}
            />
      </View>}
    </View>
  )
}

export default Recipes


const RecipeCard=({item,index,navigation})=>{
    let isEven = index%2==0;
    return (
        <View entering={FadeInDown.delay(index*100).duration(600).springify().damping(20)} sharedTransitionTag={item.strMeal} >
            <Pressable style={{width:'100%',paddingLeft: isEven ? 0:8, paddingRight:isEven?8:0}} className="flex justify-center mb-4 space-y-1" onPress={()=>navigation.navigate('RecipeDetail',{...item})}>
                <Animated.Image source={{uri:item.strMealThumb}} sharedTransitionTag={item.strMeal} style={{width:'100%', height: index%3==0 ? hp(25):hp(35), borderRadius:35}} className="bg-black/5 " />
                <Text style={{fontSize:hp(1.5)}} className="font-semibold ml-2 text-neutral-600">{ item.strMeal.length>20? item.strMeal.slice(0,20) + '...':item.strMeal}</Text>
            </Pressable>
        </View>
    )
}