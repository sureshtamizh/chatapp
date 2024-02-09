import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ActivityIndicator } from 'react-native';
import { setDataToStorage } from '../../constants/storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state



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

        setLoading(true); // Set loading to true before making the API request

        const user = {
            email: username,
            password: password
        };

        axios
            .post("http://localhost:8000/login", user)
            .then((response) => {
                console.log(JSON.stringify(response.status));
                if (response.status === 200) {
                    console.log(JSON.stringify(response.data))
                    setDataToStorage('TOKEN_KEY', response.data.token);
                    setDataToStorage('USER_ID', response.data.userId);
                    setDataToStorage('USER_PROF', response.data.image);
                    navigation.replace("chat");
                }
                // Alert.alert(
                //     "You have been Login Successfully"
                // );
            })
            .catch((error) => {
                Alert.alert(
                    "Login Error",
                    "An error occurred while logging in"
                );
                console.log("login failed", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the API request completes
            });
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
            <Pressable onPress={() => { handleLogin() }} style={styles.loginButton}>
                <Text style={styles.buttonText}>LOG IN</Text>
            </Pressable>

            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <Pressable onPress={() => { navigation.navigate("register") }}>
                    <Text style={styles.registerLink}>Register</Text>
                </Pressable>
            </View>

            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#194F8B" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
    },
    header: {
        fontSize: 32,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    loginButton: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#194F8B',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    registerContainer: {
        flexDirection: 'row',
        padding: 25,
        justifyContent: 'center',
    },
    registerText: {
        paddingRight: 5,
        fontSize: 18,
    },
    registerLink: {
        color: '#194F8B',
        fontSize: 18,
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
