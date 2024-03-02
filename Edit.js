import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Edit(props) {
  const isFocused = useIsFocused();

  const [image, setImage] = useState(' ');
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone_no, setPhone_no] = useState('');

  const getapidata = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    console.log(ID, 'ID');
    const Data = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
      },
    };
    try {
      const url = 'http://192.168.33.154:5226/getuser';
      let getresult = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Data),
      });
      const result = await getresult.json();
      // console.log(result, 'hhvhhjh');

      setName(result.rData.name);
      setPhone_no(result.rData.Phone_no);
      setEmail(result.rData.email);
      setImage(result.rData.image);
    } catch (error) {
      console.log(error);
    }
    Document();
  };


  const Document = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    // console.log('ID---------', ID);
    const Data = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
      },
    };

    try {
      const url = 'http://192.168.33.154:5226/getdocument';
      let getresult = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Data),
      });
      const result = await getresult.json();
      console.log(result);
      setAadhar(result.rData.rMessage[0].aadhar);
      setPan(result.rData.rMessage[1].pan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getapidata();
  }, [isFocused]);

  const EditData = async () => {
    const ID = await AsyncStorage.getItem('user_id');
    console.log(ID, 'id');
    const Data = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
        name: name,
        email: email,
        Phone_no: Phone_no,
        image: image,
      },
    };

    // console.log(Data);
    try {
      const url = 'http://192.168.33.154:5226/Updatation';
      let getresult = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Data),
      });

      const result = await getresult.json();
      console.log(result, 'result document');
      if (result.rData.rCode !== 0) throw new Error(result.rData.rMessage);

      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const imagePicker = async () => {
    const result = await launchImageLibrary({mediaType: 'photo',
    includeBase64: true});
    setImage(result?.assets[0]?.base64);
  };
  
  const Delete=async()=>{
    const ID = await AsyncStorage.getItem('user_id');
    const Data = {
      eventID: '1001',
      addInfo: {
        U_ID: +ID,
      },
    };
    try {
      const url = 'http://192.168.33.154:5226/Deletion';
      let getresult = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Data),
      });
      const result = await getresult.json();
      if (result.rData.rcode == 0) {
        Alert.alert('user Deleted');
        props.navigation.navigate('Login');
        setName('');
        setEmail('');
        setPhone_no('');
        setImage('');


      } else {
        Alert.alert('User not Deleted');
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#67a9bf'}}>
      <View style={{flex: 1.1, backgroundColor: '#67a9bf'}}>
        <Text
          style={{
            fontSize: 38,
            fontWeight: 'bold',
            color: 'white',
            // marginVertical: '10%',
            marginHorizontal: '25%',
            // marginBottom: '2%',
            top: '20%',
            borderBottomWidth: 2,
            borderBottomColor: 'white',
          }}>
          Edit Profile
        </Text>

       
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: '#e3f6fc',
          borderTopStartRadius: 80,
          borderTopEndRadius: 80,
        }}>
        <TextInput
          style={[styles.txtInput, {top: 40}]}
          placeholder="Enter Your Name"
          keyboardType={'default'}
          value={name}
          onChangeText={txt => setName(txt)}
        />

        <TextInput
          style={[styles.txtInput, {top: 30}]}
          placeholder="Enter Your Email"
          keyboardType={'email-address'}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <TextInput
          style={[styles.txtInput, {top: 25}]}
          placeholder="Enter Your Mobile"
          keyboardType={'numeric'}
          value={Phone_no}
          onChangeText={txt => setPhone_no(txt)}
        />

        <TouchableOpacity onPress={imagePicker}>
          <Icon
            name="document"
            size={30}
            color="black"
            style={{top: 40, left: 40, position: 'relative'}}
          />
          
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
        </TouchableOpacity>

        

        <TouchableOpacity
          style={styles.touchbox}
          // onPress={() =>{ props.navigation.navigate('Dashboard')}}
          onPress={EditData}>
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}>
            SAVE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchbox}
          onPress={Delete}>
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}>
            Delete
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
    height: '10%',
    width: '60%',
    borderColor: '#67a9bf',
    borderWidth: 1,
    borderRadius: 20,
    left: '20%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
    marginBottom:40
  },
  txtInput: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 40,
    marginBottom: 20,
    paddingLeft: 11,
  },
  imageStyle: {
    width: 200,
    height: 100,
    // borderRadius: 10,
    borderWidth: 1,
    // borderColor:'black'
  },
});
