import { View, Text, ScrollViewBase, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState} from 'react'
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {UserCircleIcon,BellIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import Loading from '../components/Loading';


const Home = ({navigation}) => {
    const [activeCategory, setActiveCategory] = useState('beef')
    const [categories, setCategories] = useState([])
    const [recipes, setRecipes] = useState([])

    useFocusEffect(
      React.useCallback(()=>{
        BackHandler.addEventListener('hardwareBackPress',handleBackPress)
        return ()=>{
          BackHandler.removeEventListener('hardwareBackPress',handleBackPress)
        }
      })
    );

    const handleBackPress=()=>{
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [{text:'Cancel',onPress:()=>null,style:'cancel'},{text:'Exit',onPress:()=>BackHandler.exitApp()}]
      )
      return true;
    }
    
    useEffect(() => {
      getCategories();
    }, [])
  

    useEffect(() => {
      setRecipes([])
      getRecipes();
    }, [activeCategory])

   
    const getRecipes=async()=>{
      try{
        const response=await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`);
        if (response && response.data){
          setRecipes(response.data.meals)
        }
          }catch(err){
            console.log(err)
        }
      }

    const getCategories=async()=>{
        try{
            const response=await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
            if (response && response.data){
                setCategories(response.data.categories)
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <SafeAreaView className="mx-4">
      <StatusBar style='dark'/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        className="space-y-6"
      >

      <View className="flex-row justify-between items-center mb-2">
        <UserCircleIcon size={hp(4)} color='black'/>
        <BellIcon size={hp(4)} color='black'/>
      </View>

      {/* Header Tagline */}
      <View className="space-y-2 mb-4">
        <Text style={{fontSize:hp(2)}} className="text-neutral-600">Hello Amit!</Text>
        <View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Make your own Food,</Text>
        </View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">stay at <Text className="text-amber-400">home</Text></Text>
      </View>

      {/* Search Box */}
      <View  className="flex-row items-center rounded-full bg-black/5 p-[6px]">
        <TextInput placeholder='Search any recipe' placeholderTextColor="gray" style={{fontSize:hp(1.7)}} className="flex-1 text-base mb-1 pl-3 tracking-wider" cursorColor='black'/>

        <TouchableOpacity className="rounded-full bg-white p-3">
        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={2} color='gray'/>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View className="my-4">
        {categories.length >0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}
      </View>

      {/* Recipes */}
      <View className="my-4">
      {recipes.length >0 ? <Recipes recipes={recipes} /> :<Loading/>}
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Home