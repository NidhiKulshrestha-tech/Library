import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect,useState } from 'react';
// import {useState} from 'react';
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function Login(props) {
  const [email, setEmail]=useState('');
  const [error,setError]=useState('');
  // const [Phone_no,setPhone_no]=useState('');
  const [Password,setPassword]=useState('');
  

  
  const emailValidator = async() => {
   
    if(email==""||Password=="")
    {
      Alert.alert("Please fill both the fields")
    }
    else {
      const apidata = {
        eventID: '1001',
        addInfo: {
          UserId: email,
          Password: Password,
        },
      };
      // console.log(User)

      try {
        const url = 'http://192.168.33.154:5226/login';
        const result = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(apidata),
        });
        const data = await result.json();
        console.log(data,'data')
        if (data.rData.rCode == 0) {
          console.log(data);
          props.navigation.navigate('MyDrawer');
          // console.log('function called successfully');
        } else {
          Alert.alert('User not Found');
        }
        
        await AsyncStorage.setItem('user_id', data.rData.U_ID.toString());
      } catch (error) {
        console.log(error);
        console.log('error in api calling');
      }
    }
    console.log(Password);
    setEmail('');
    setPassword('');
  };
 

  const openemail = text => {
    if (!text) {
      setError('Email is required.');
    }
    if (validator.isEmail(text)) {
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
    setEmail(text);
    console.log(text);
  };
  
  return (
    <View style={{flex:1,backgroundColor:'#67a9bf'}}>
      {/* <View>
        <ImageBackground
          source={require('../Images/books.jpg')}
          style={{height: '100%', width: '100%'}}
        />
      </View> */}
      <View style={{flex:1, backgroundColor:'white',marginHorizontal:'8%',marginVertical:'10%',borderRadius:40}}>
        <Image
          source={require('../Images/girl.jpg')}
          style={{
            height: 80,
            width: 80,
            display: 'flex',
            marginLeft: 160,
            top:85,
            right:30,
            // bottom:'20%',
          }}
        />
        <TextInput
          style={{
            width: 290,
            borderColor: 'white',
            backgroundColor: '#67a9bf99',
            borderWidth: 1,
            borderRadius: 40,
            // left:10,
            top:'25%',
            right:8,
            marginLeft: 30,
            paddingLeft:20
            
          }}
          
          
          placeholder="Email/Phone no."
          value=
          {email}
        
          onChangeText={openemail}
        />
        <Text style={{color:'#b01010',marginBottom: 25,paddingLeft: 50,top:'24%'}}>{error}</Text>
        
        <TextInput
          style={{
            width: 290,
            borderColor: 'white',
            backgroundColor: '#67a9bf99',
            borderWidth: 1,
            borderRadius: 40,
            right:8,
            marginLeft: 30,
            top:'22%',
            marginBottom: 40,
            paddingLeft:20
          }}
          onChangeText={(text)=>setPassword(text)}
          secureTextEntry={true}
          placeholder="Enter Password"
          value={Password}
        />
        <TouchableOpacity
          style={styles.touchbox}
          onPress={emailValidator}>
          
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={{textAlign:'center',marginTop:'80%'}}>Create an Account.<Text onPress={()=>props.navigation.navigate('Register')} style={{color:'blue',fontWeight:'bold',display:'flex',flexDirection:'row'}}> Signup</Text></Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  touchbox: {
    display: 'flex',
    // flexDirection:'row',
    // justifyContent:'space-eve?nly',
    color:'white',
    backgroundColor: '#377b91',
    height: '10%',
    width: '60%',
    borderColor: '#377b91',
    borderWidth: 1,
    borderRadius: 20,
    left: '20%',
    top:'22%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
