import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

export default function Home(props) {
  return (
    <View style={{flex: 1, backgroundColor: '#67a9bf'}}>
      <View style={{flex: 1.1, backgroundColor: '#67a9bf'}}>
        <Text
          style={{
            fontSize: 38,
            fontWeight: 'bold',
            color: 'white',
            // marginVertical: '10%',
            marginHorizontal: '29%',
            // marginBottom: '2%',
            top:'20%'
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: 'white',
            bottom: 95,
            left: '45%',
            top:'20%'
          }}>
          To
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: 'white',
            bottom: 90,
            left: '25%',
            top:'20%'
          }}>
          Books World
        </Text>

        {/* <ImageBackground source={require('../Images/home.jpg')} style={{height:'100%', width:'100%'}}/> */}
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: '#e3f6fc',
          borderTopStartRadius: 80,
          borderTopEndRadius: 80,
        }}>
        <TouchableOpacity
          style={styles.touchbox}
          onPress={() => props.navigation.navigate('Register')}>
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            color: '#67a9bf',
            fontWeight: 'bold',
            textAlign: 'center',
            top: '32%',
            marginBottom: 20,
          }}>
          Or
        </Text>
        <TouchableOpacity
          style={styles.touchbox}
          onPress={() => props.navigation.navigate('Login')}>
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  touchbox: {
    display: 'flex',
    // flexDirection:'row',
    // justifyContent:'space-eve?nly',
    backgroundColor: '#67a9bf',
    height: '12%',
    width: '60%',
    borderColor: '#4e9992',
    borderWidth: 1,
    borderRadius: 20,
    left: '20%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
  },
});
