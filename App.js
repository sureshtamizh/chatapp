// App.js

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ChatList from './screens/Chats/ChatList';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="chat" component={ChatList} />

        {/* Add more screens as needed, for example:
        <Stack.Screen name="Home" component={HomeScreen} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
