// App.js

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Auth/LoginScreen';
import ChatList from './screens/Chats/ChatList';
import ChatDetails from './screens/Chats/ChatDetails';
import RegisterScreen from './screens/Auth/Register';
import { getDataFromStorage } from './constants/storage';
import io from 'socket.io-client';

const Stack = createStackNavigator();

const socket = io('http://localhost:8000');
const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Event listener for server messages
    socket.on('messageFromServer', (data) => {
      alert("ds")
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerBackTitle: 'Back', headerTitle: '', headerShown: false }} />

        <Stack.Screen name="chat" component={ChatList} />
        <Stack.Screen name="chatdtls" component={ChatDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
