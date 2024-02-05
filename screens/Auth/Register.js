import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doLogin, doRegister } from '../../services';
import { setDataToStorage } from '../../constants/storage';
import axios from 'axios';


const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const validateCredentials = () => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return false;
        } else if (password.length < 6) {
            Alert.alert('Invalid Password', 'Please enter a password with at least 6 characters');
            return false;
        }

        return true;
    };

    const handleLogin = async () => {

        const user = {
            name: username,
            email: email,
            password: password
        };

        // send a POST  request to the backend API to register the user
        axios
            .post("http://localhost:8000/register", user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration successful",
                    "You have been registered Successfully"
                );
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred while registering"
                );
                console.log("registration failed", error);
            });


    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
                <Text style={{ paddingRight: 5, fontSize: 15 }}>Already have an account?</Text>
                <Pressable onPress={() => { navigation.navigate("login") }}><Text style={{ color: 'blue', fontSize: 15 }}>Login</Text></Pressable>
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

export default RegisterScreen;
