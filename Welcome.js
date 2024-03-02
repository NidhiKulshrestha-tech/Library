import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useEffect } from 'react'

const Welcome = (props) => {
    useEffect(()=>{
        const redirectTimeout= setTimeout(()=>{
            console.log('Hello');
            props.navigation.navigate('Home')
        },2000);

    return()=>clearTimeout(redirectTimeout);
    },[props.nevigation]);
// render

    return (
        <View style={{backgroundColor:'#f2fcf5', display:'flex', flex:1}}>
            <Image source={require('../Images/pic_1.png')} style={{height:170, width:170,marginHorizontal:'28%', marginVertical:'55%' }}></Image>
        </View>
    )
}

export default Welcome
