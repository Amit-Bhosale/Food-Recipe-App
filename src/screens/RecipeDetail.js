import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetail = (props) => {
    const item =props.route.params
    const navigation = useNavigation();
    const [isFavourite, setFavourite] = useState(false)
    const [meal, setMeal] = useState(null)
    const [loading,setLoading]= useState(true)

    useEffect(() => {
      getRecipeDetail(item.idMeal)
    }, [])

    const getRecipeDetail=async(id)=>{
        try{
          const response=await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          if (response && response.data){
            setMeal(response.data.meals[0])
            setLoading(false)
          }
            }catch(err){
              console.log(err)
          }
    }

    const ingredientsIndexes=(meal)=>{
        if (!meal) return [];
        let indexes=[];
        for (let i=1; i<=20;i++){
            if (meal['strIngredient'+i]){
                indexes.push(i)
            }
        }
        return indexes
    }
    const getYoutubeVideoId=url=>{
        const regex = /[?&]v=([^&]+)/;
        const match=url.match(regex);
        if (match && match[1]){
            return match[1];
        } 
        return null
    }

  return (
    <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
      <StatusBar style='light'/>

      {/* recipe image */}
      <View className="flex-row justify-center" >
        <Animated.Image 
            sharedTransitionTag={item.strMeal}
            source={{uri:item.strMealThumb}}
            style={{width:wp(98),height:hp(50),borderRadius:25,marginTop:4}}
        />
      </View>

    {/* recipe action buttons */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between p-4 pt-10">
        <TouchableOpacity onPress={()=>navigation.goBack()} className="bg-white rounded-full p-1">
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4} color={'orange'}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setFavourite(!isFavourite)} className="bg-white rounded-full p-1">
            <HeartIcon size={hp(3.5)} strokeWidth={4} color={isFavourite?'red':'gray'}/>
        </TouchableOpacity>
      </Animated.View>

    {/* recipe description */}
      {loading? <Loading/>:(

        <View className="px-4 flex justify-between space-y-4 pt-8">
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-3">
                <Text style={{fontSize:hp(3)}} className="font-bold text-neutral-700">{meal?.strMeal}</Text>
                <Text style={{fontSize:hp(2)}} className="font-medium text-neutral-500">{meal?.strArea}</Text>
            </Animated.View>

            {/* Icons */}
            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                <View className="flex rounded-full bg-amber-300 p-2">
                    <View style={{height:hp(6.5), width:hp(6.5)}} className="bg-white rounded-full flex justify-center items-center">
                        <ClockIcon color={'black'} size={hp(4)} strokeWidth={2.5}/>
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">35</Text>
                        <Text style={{fontSize:hp(1.3)}} className="font-medium text-neutral-700">Mins</Text>
                    </View>
                </View>

                <View className="flex rounded-full bg-amber-300 p-2">
                    <View style={{height:hp(6.5), width:hp(6.5)}} className="bg-white rounded-full flex justify-center items-center">
                        <UsersIcon color={'black'} size={hp(4)} strokeWidth={2.5}/>
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">03</Text>
                        <Text style={{fontSize:hp(1.3)}} className="font-medium text-neutral-700">Servings</Text>
                    </View>
                </View>

                <View className="flex rounded-full bg-amber-300 p-2">
                    <View style={{height:hp(6.5), width:hp(6.5)}} className="bg-white rounded-full flex justify-center items-center">
                        <FireIcon color={'black'} size={hp(4)} strokeWidth={2.5}/>
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">103</Text>
                        <Text style={{fontSize:hp(1.3)}} className="font-medium text-neutral-700">Calories</Text>
                    </View>
                </View>

                <View className="flex rounded-full bg-amber-300 p-2">
                    <View style={{height:hp(6.5), width:hp(6.5)}} className="bg-white rounded-full flex justify-center items-center">
                        <Square3Stack3DIcon color={'black'} size={hp(4)} strokeWidth={2.5}/>
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">Easy</Text>
                        {/* <Text style={{fontSize:hp(1.3)}} className="font-medium text-neutral-700">Easy</Text> */}
                    </View>
                </View>
            </Animated.View>


            {/* Ingredients */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4 mb-4">
                <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">Ingredients</Text>
                <View className="space-y-2 ml-3">
                    {
                        ingredientsIndexes(meal).map(i=>{
                            return (
                            <View key={i} className="flex-row space-x-4">
                                <View style={{height:hp(1.5),width:hp(1.5)}} className="rounded-full bg-amber-300"/>
                                <View className="flex-row space-x-2">
                                    <Text style={{fontSize:hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                                    <Text style={{fontSize:hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                                </View>   
                            </View>
                            )
                        })
                    }
                </View>
            </Animated.View>

            {/* Instructions */}
            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">Instructions</Text>
                <Text style={{fontSize:hp(2)}}>{meal?.strInstructions}</Text>
            </Animated.View>

        {/* recipe video */}
        {
            meal.strYoutube && (
                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                    <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">Recipe Video</Text>
                    <View>
                        <YoutubeIframe videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)}/>
                    </View>
                </Animated.View>
            )
        }

        </View>
      )
      }
    </ScrollView>
  )
}

export default RecipeDetail