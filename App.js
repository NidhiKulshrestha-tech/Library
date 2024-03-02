import { View, Text } from 'react-native'
import React from 'react'
import Welcome from './Pages/Welcome';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Edit from './Pages/Edit';
import Update from './Pages/Update';



const Drawer = createDrawerNavigator();
const stack=createNativeStackNavigator();

const Logout=(props)=>{
  props.navigation.navigate('Login')
}


const MyDrawer=()=> {
  return (
    <Drawer.Navigator >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        
        <Drawer.Screen name="Edit" component={Edit}/>
        <Drawer.Screen name='Update' component={Update}/>
        <Drawer.Screen name="Logout" component={Logout} />
      {/* <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
const App=()=> {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name='Welcome' component={Welcome}/>
        <stack.Screen name='Home' component={Home}/>
        <stack.Screen name='Register' component={Register}/>
        <stack.Screen name='Login' component={Login}/>
        <stack.Screen name='MyDrawer' component={MyDrawer}/>
         {/* <stack.Screen name='Edit' component={Edit}/> */}
        

      </stack.Navigator>
    </NavigationContainer>
  )
}
export default App;