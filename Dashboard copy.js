import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import { img } from '../util';

// const [Password, setPassword] = useState('');
export default function Home(props) {
  const isFocused = useIsFocused();

  const [image, setImage] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone_no, setPhone_no] = useState('');


  const getapidata = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    console.log(ID, 'ID');
    const apidata = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
      },
    };
    try {
      const url = 'http://192.168.33.154:5224/getuser';
      const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apidata),
      });
      const data = await result.json();

      // console.log(data, 'jjjjjj');

      // console.log(data.rData.name);
      setName(data.rData.name);
      setEmail(data.rData.email);
      setPhone_no(data.rData.Phone_no);
      setImage(data.rData.image);
      // console.log(data);

      console.log('function called successfully');
    } catch (error) {
      console.log(error);
      console.log('error in api calling');
    }
    // getapidata1();
  };

  const getapidata1 = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    // console.log(ID ,'hfhhhhff')
    const apidata1 = {
      eventID: '1001',
      addInfo: {
        U_ID:+ ID,
      },
    };
    try {
      const url1 = 'http://192.168.33.154:5224/getdocument';
      const result = await fetch(url1, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apidata1),
      });
      const data = await result.json();
      // console.log(data.rData.rMessage[1].Doc_Image, 'oooohgvvgvgo');
      // setImage(data.rData.rData[0].image);

      // console.log("DATA: ", data.rData.rMessage);

      setAadhar( data.rData.rMessage[0].Doc_Image);
      setPan(data.rData.rMessage[1].Doc_Image);
      console.log(data)

      console.log('function called successfully--------------------------');
    } catch (error) {
      console.log(error);
      console.log('error in api calling');
    }
  };

  useEffect(() => {
    getapidata();
    getapidata1();
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#67a9bf'}}>
      {/* <View style={{flex: 1.1, backgroundColor: '#67a9bf'}}>
        <Text
          style={{
            fontSize: 45,
            fontWeight: 'bold',
            color: 'white',
            marginVertical: '10%',
            marginHorizontal: '20%',
            marginBottom: '2%',
            top: '20%',
          }}>
          Dashboard
        </Text>

        <ImageBackground source={require('../Images/home.jpg')} style={{height:'100%', width:'100%'}}/>
      </View> */}
      <View
        style={{
          flex: 6,
          backgroundColor: '#e3f6fc95',
          // borderTopStartRadius: 90,
          // borderTopEndRadius: 90,
        }}>
        <Text style={[styles.txtInput, {top: 20}]}>
          {/* <Icon name="person" size={25} color="black" /> */}
          NAME:
        </Text>
        <View
          style={{
            height: 50,
            width: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 25,
            marginHorizontal: 50,
            textAlignVertical: 'center',
          }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              color: 'black',
              textAlignVertical: 'center',
              top: 8,
            }}>
            {name}
          </Text>
        </View>
        <Text style={[styles.txtInput, {top: 15}]}>
          {/* <Icons name="email" size={20} color="black" /> */}
          EMAIL:
        </Text>
        <View
          style={{
            height: 50,
            width: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 15,
            marginHorizontal: 50,
          }}>
          <Text style={{paddingLeft: 10, fontSize: 20, color: 'black', top: 8}}>
            {email}
          </Text>
        </View>
        <Text style={[styles.txtInput, {top: 15}]}>
          {/* <Icons name="phone" size={20} color="black" /> */}
          PHONE NO:
        </Text>
        <View
          style={{
            height: 50,
            width: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 15,
            marginHorizontal: 50,
          }}>
          <Text style={{paddingLeft: 10, fontSize: 20, color: 'black', top: 8}}>
            {Phone_no}
          </Text>
        </View>

        <Text style={[styles.txtInput, {top: 15}]}>
          <Icon name="document" size={20} color="black" />
          PROFILE PICTURE:
        </Text>
        <View
          style={{
            height: 90,
            width: 270,
            // backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 15,
            marginHorizontal: 80,
          }}>
          {/* <Text style={{paddingLeft: 10, fontSize: 20, color: 'black'}}>
            {image}
          </Text> */}
          <Image
            source={{uri: `data:image/jpeg;base64,${image}`}}
            style={{height: 100, width: 100}}></Image>
            {/* <Image
            source={{uri: `data:image/jpeg;base64,${pan}`}}
            style={{height: 100, width: 100}}></Image> */}
        </View>
        <Text style={[styles.txtInput, {top: 18}]}>
          <Icon name="document" size={20} color="black" />
          AADHAR CARD:
        </Text>
        {/* <View
          style={{
            height: 90,
            width: 300,
            // backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 18,
            marginHorizontal: 50,
          }}> */}
          {/* <Text style={{paddingLeft: 10, fontSize: 20, color: 'black'}}>
            {aadhar}
          </Text> */}
          <Image
            source={{uri: `data:image/jpeg;base64,${aadhar}`}}
            style={{height: 100, width: 100}} />
        {/* </View> */}
        <Text style={[styles.txtInput, {top: 15}]}>
          <Icon name="document" size={20} color="black" />
          PAN CARD:
        </Text> 
        <Image
            source={{uri: `data:image/jpeg;base64,${pan}`}}
            style={{height: 100, width: 100}}></Image>
        <View
          style={{
            height: 90,
            width: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 15,
            marginHorizontal: 50,
          }}>
          <Text style={{paddingLeft: 10, fontSize: 20, color: 'black'}}>
            {pan}
          </Text>
        </View>
        <TouchableOpacity
          style={{height:30,width:60,backgroundColor:'black'}}
          onPress={() => props.navigation.navigate('Doc')}>
          <Text>
            Doc
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
    backgroundColor: '#362229',
    height: '10%',
    width: '40%',
    borderColor: '#362229',
    borderWidth: 1,
    borderRadius: 20,
    left: '30%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInput: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'black',
    // borderBottomWidth: 1,
    marginHorizontal: 40,
    // marginBottom: 10,
    paddingLeft: 18,
  },
});
