import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doLogin } from '../../services';
import { setDataToStorage } from '../../constants/storage';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateCredentials = () => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (!emailRegex.test(username)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return false;
        } else if (password.length < 6) {
            Alert.alert('Invalid Password', 'Please enter a password with at least 6 characters');
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateCredentials()) {
            return;
        }

        const user = {
            email: username,
            password: password
        };

        // send a POST  request to the backend API to register the user
        axios
            .post("http://localhost:8000/login", user)
            .then((response) => {
                console.log(JSON.stringify(response.status));
                if (response.status == 200) {
                    console.log(JSON.stringify(response.data))
                    setDataToStorage('TOKEN_KEY', response.data.token);
                    setDataToStorage('USER_ID', response.data.userId);
                    navigation.replace("chat");
                }
                Alert.alert(
                    "You have been Login Successfully"
                );
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred while registering"
                );
                console.log("registration failed", error);
            });

        // try {
        //     const params = {
        //         email: username,
        //         password: password,
        //     };
        //     const responseJson = await doLogin(params);
        //     if (responseJson.data.statusCode === 200) {
        //         console.log(JSON.stringify(responseJson.data))
        //         setDataToStorage('TOKEN_KEY', responseJson.data.jwtToken);
        //         navigation.navigate("chat");
        //     } else {
        //         Alert.alert('Login Failed', responseJson.data.message);
        //     }
        // } catch (error) {
        //     console.error('Login Error:', error);
        //     Alert.alert('Error', 'Something went wrong. Please try again.');
        // }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
                <Text style={{ paddingRight: 5, fontSize: 15 }}>Don't have an account?</Text>
                <Pressable onPress={() => { navigation.navigate("register") }}><Text style={{ color: 'blue', fontSize: 15 }}>Register</Text></Pressable>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
