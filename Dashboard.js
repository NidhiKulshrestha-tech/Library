import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Dashboard() {
  const isFocused = useIsFocused();
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');
  const [image, setImage] = useState('');
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
      const url = 'http://192.168.33.154:5226/getuser';
      const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apidata),
      });
      const data = await result.json();

      setName(data.rData.name);
      setEmail(data.rData.email);
      setPhone_no(data.rData.Phone_no);
      setImage(data.rData.image);

      console.log('function called successfully');
    } catch (error) {
      console.log(error);
      console.log('error in api calling');
    }
  };

  const getapidata1 = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    // console.log(ID ,'hfhhhhff')
    const apidata1 = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
      },
    };
    try {
      const url1 = 'http://192.168.33.154:5226/getdocument';
      const result = await fetch(url1, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apidata1),
      });
      const data = await result.json();

      console.log(data.rData.rMessage[1].Doc_Image, 'oooohgvvgvgo');

      setAadhar(data.rData.rMessage[0].Doc_Image);
      setPan(data.rData.rMessage[1].Doc_Image);
      // console.log(data, 'jhgjjjhj');

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
    
    <View style={{flex: 1, backgroundColor: '#83b8c9'}}>
      
      <View>
        <Text style={[styles.txtInput, {top: 20}]}>NAME</Text>
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
      </View>
      <Text style={[styles.txtInput, {top: 15}]}>EMAIL:</Text>
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
      <Text style={[styles.txtInput, {top: 15}]}>PHONE NO. :</Text>
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
      PROFILE PICTURE
      </Text>
      <View style={{
            height: 120,
            width: 280,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 18,
            marginHorizontal: 80,
            justifyContent:'center',
            paddingHorizontal:'10%'

          }}>

      <Image
        style={styles.imageStyle}
        source={{
          uri: `data:image/jpeg;base64,${image}`,
        }}
      />
      </View>
      <Text style={[styles.txtInput, {top: 15}]}>
      <Icon name="document" size={20} color="black" />
      Aadhar Card
      </Text>
      <View style={{
            height: 120,
            width: 280,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 18,
            marginHorizontal: 80,
            justifyContent:'center',
            paddingHorizontal:'10%'

          }}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: `data:image/jpeg;base64,${aadhar}`,
        }}
      />
      </View>
      <Text style={[styles.txtInput, {top: 15}]}>
      <Icon name="document" size={20} color="black" />
      Pan Card
      </Text>
      <View style={{
            height: 120,
            width: 280,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 18,
            marginHorizontal: 80,
            justifyContent:'center',
            paddingHorizontal:'10%'

          }}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: `data:image/jpeg;base64,${pan}`,
        }}
      />
      </View>
    </View>
   
   
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 100,
    // borderRadius: 10,
    borderWidth: 1,
    // borderColor:'black'
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
