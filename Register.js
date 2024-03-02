import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import Icones from 'react-native-vector-icons/Entypo';
import Iconis from 'react-native-vector-icons/FontAwesome';


export default function Register(props) {
  const [image, setimage] = useState('');
  const [imageText,setimageText]=useState('');
  const [aadhar, setaadhar] = useState('');
  const [aadharText,setaadharText]=useState('');
  const [pan, setpan] = useState('');
  const [panText,setpanText]=useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone_no, setPhone_no] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [error_name, setErrorName] = useState('');
  const [error_number, setErrorNumber] = useState('');
  const [conpassword, setConpassword] = useState('');
  const [emailerror, setEmailerror] = useState('');

  const validateemail = () => {
    console.log("function called")
    const emailvalidation =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!emailvalidation.test(email)) {
      setEmailerror('Enter valid email address');
    } else {
      setEmailerror('');
    }
  };

  const Pick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'Photos',
      includeBase64: true,
    });
    setimage(result.assets[0].base64);
    setimageText(result.assets[0].fileName)
  };
  const Pic = async () => {
    const result = await launchImageLibrary({
      mediaType: 'Photos',
      includeBase64: true,
    });
    setaadhar(result.assets[0].base64);
    setaadharText(result.assets[0].fileName)
  };
  const Pan = async () => {
    const result = await launchImageLibrary({
      mediaType: 'Photos',
      includeBase64: true,
    });
    setpan(result.assets[0].base64);
    setpanText(result.assets[0].fileName)
  };
  const [data, setData] = useState('');

  const SaveData = async () => {
    console.log("function")
    if (
      name === '' ||
      Phone_no === '' ||
      email === '' ||
      aadhar === '' ||
      pan === '' ||
      image === '' ||
      Password === '' ||
      conpassword === ''
    ) {
      Alert.alert('Enter Valid details');
    } else {
      if (emailerror === '') {
        const data = {
          eventID: '1001',
          addInfo: {
            name: name,
            email: email,
            Phone_no: Phone_no,
            Password: Password,
            aadhar: aadhar,
            pan: pan,
            image: image,
          },
        };
        try {
          const url = 'http://192.168.33.154:5226/registration';
          let getresult = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
          const result = await getresult.json();
          // console.log(result, ',hhh');

          if (result.rData.rCode == 0) {
            setName('');
            setEmail('');
            setPhone_no('');
            setPassword('');
            setConpassword('');
            setaadhar('');
            setimage('');
            setpan('');
            Alert.alert('User Registred Successfully');

            props.navigation.navigate('Login');
          }
        } catch (error) {
          console.log(error);
          console.log("error in api calling")
        }
       
      } else {
        Alert.alert('Enter valid details');
      }
    }
  };

  
  return (
  
    <View style={{flex: 1}}>
      <ScrollView scrollEnabled style={{flex: 1}}>
       

        <View style={{backgroundColor: '#67a9bf', borderBottomStartRadius: 85}}>
          <Text
            style={{
              fontSize: 42,
              textAlign: 'center',
              marginTop: 35,
              paddingLeft: 10,
              marginBottom: 40,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Welcome
          </Text>
        </View>
        <View>
          <TextInput
            style={[styles.textbox, {top: 15}]}
            maxLength={30}
            isRequired="true"
            placeholder="Enter your name"
            value={name}
            onChangeText={text => setName(text)}
           
            
          />
          
          <Text style={{color: 'red', paddingLeft: 50, marginBottom: 5}}>
            {error_name}
          </Text>

          <TextInput
            style={[styles.textbox, {top: 8}]}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={validateemail}
          />
          <Text style={{color: 'red', paddingLeft: 50, marginBottom: 5}}>
            {emailerror}
          </Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textbox}
            maxLength={10}
            minLength={10}
            placeholder="Enter Your Phone no."
            value={Phone_no}
            onChangeText={text => setPhone_no(text)}
          />
          <Text style={{color: 'red', paddingLeft: 50, marginBottom: 1}}>
            {error_number}
          </Text>
          <TextInput
            style={{
              width: 350,
              borderColor: 'white',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 40,
              paddingLeft: 50,
              marginLeft: 30,
              marginBottom: 15,
             
            }}
            secureTextEntry={true}
            onChangeText={val => setPassword(val)}
            value={Password}
            placeholder="Create Password"
          />
          <TextInput
            style={{
              width: 350,
              borderColor: 'white',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 40,
              paddingLeft: 50,
              marginLeft: 30,
              marginBottom: 15,
             
            }}
            secureTextEntry={true}
            onChangeText={val => setConpassword(val)}
            value={conpassword}
            placeholder="Confirm Password"
          />

          <TouchableOpacity onPress={Pick}>
            <Icon
              name="person"
              size={45}
              color="black"
              style={{top: 10, left: 30, position: 'relative'}}
            />
            <Text
              style={{
                width: 300,
                height: 50,
                borderColor: 'white',
                backgroundColor: 'white',
                borderWidth: 1,
                borderRadius: 40,
                paddingLeft: 50,
                marginLeft: '20%',
                marginBottom: -30,
                marginTop: '-8%',
                
                textAlignVertical: 'center',
                justifyContent: 'center',
              }}>
              {imageText}Upload Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Pic}>
            <Icons
              name="idcard"
              size={40}
              color="black"
              style={{top: 45, left: 30}}
            />
            <Text
              style={{
                width: 300,
                height: 50,
                borderColor: 'white',
                backgroundColor: 'white',
                borderWidth: 1,
                borderRadius: 40,
                paddingLeft: 50,
                marginLeft: '20%',
                marginBottom: 20,
               
                textAlignVertical: 'center',
              }}>
              {aadharText}Upload Addhar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Pan}>
            <Icones
              name="v-card"
              size={40}
              color="black"
              style={{top: 6, left: 30, position: 'absolute'}}
            />
            <Text
              style={{
                width: 300,
                height: 50,
                borderColor: 'white',
                backgroundColor: 'white',
                borderWidth: 1,
                borderRadius: 40,
                paddingLeft: 50,
                marginLeft: '20%',
                marginBottom: 10,
                
                textAlignVertical: 'center',
              }}>
              {panText}Upload PAN
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.touchbox} onPress={SaveData}>
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
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  touchbox: {
    backgroundColor: '#67a9bf',
    width: '40%',
    borderColor: '#67a9bf',
    borderWidth: 1,
    borderRadius: 20,
    left: '30%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 1,
  },
  textbox: {
    width: 350,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 40,
    marginLeft: 30,
  },
});
