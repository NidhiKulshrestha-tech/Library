import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Update() {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');

  const getapidata = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    const apidata = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
        Password: oldpassword,
        New_Password: newpassword,
      },
    };
    try {
      const url = 'http://192.168.33.154:5226/NewPassword';
      const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apidata),
      });
      const data = await result.json();
      if (data.rData.rMessage == 0) {
        setOldpassword('');
        setNewpassword('');
        Alert.alert('Password update Successfully');
      }

      console.log(data.rData.rMessage);
      console.log('function called successfully');
    } catch (error) {
      console.log(error);
      console.log('error in api calling');
    }
  };
  return (
    <View style={{backgroundColor: '#83b8c9', height: '100%'}}>
      <Text
        style={{
          fontSize: 42,
          textAlign: 'center',
          marginTop: 35,
          paddingLeft: 4,
          marginBottom: 40,
          fontWeight: 'bold',
          color: 'white',
          borderBottomColor: 'white',
          borderBottomWidth: 3,
          marginHorizontal:15
        }}>
        Update Password
      </Text>
      <View
        style={{
          height: 50,
          width: 340,
          backgroundColor: '#ffffff99',
          borderRadius: 10,
          marginTop: 25,
          marginHorizontal: 35,
          textAlignVertical: 'center',
        }}>
        <TextInput
          placeholder="Enter your Old Password"
          secureTextEntry={true}
          onChangeText={text => setOldpassword(text)}></TextInput>
      </View>

      <View
        style={{
          height: 50,
          width: 340,
          backgroundColor: '#ffffff99',
          borderRadius: 10,
          marginTop: 25,
          marginHorizontal: 35,
          textAlignVertical: 'center',
        }}>

      <TextInput
        placeholder="Enter your New Password"
        // placeholderTextColor={'white'}
        secureTextEntry={true}
        onChangeText={text => setNewpassword(text)}></TextInput></View>

      <TouchableOpacity
        onPress={getapidata}
        style={{
          margin: 30,
          marginLeft: 100,
          backgroundColor: 'white',
          borderRadius: 50,
          borderColor: 'white',
          borderWidth: 1,
          alignItems: 'center',
          width: 180,
          paddingVertical: 10,
        //   marginTop:39
        top:30
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}
