import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, Pressable, ActivityIndicator } from 'react-native';

import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

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

    const handleRegister = async () => {
        if (!validateCredentials()) {
            return;
        }

        setLoading(true); // Set loading to true before making the API request

        const user = {
            name: username,
            email: email,
            password: password
        };

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
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the API request completes
            });
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 50 }}>
                <Image source={require('../../assets/logo.png')} style={{ width: 150, height: 150 }} />
            </View>
            <Text style={styles.header}>Create an Account</Text>
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
            <Pressable onPress={() => { handleRegister() }} style={styles.submitButton}>
                <Text style={styles.buttonText}>SUBMIT</Text>
            </Pressable>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Pressable onPress={() => { navigation.navigate("login") }}>
                    <Text style={styles.loginLink}>Login</Text>
                </Pressable>
            </View>

            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 32,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    submitButton: {
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
    loginContainer: {
        flexDirection: 'row',
        padding: 25,
        justifyContent: 'center',
    },
    loginText: {
        paddingRight: 5,
        fontSize: 18,
    },
    loginLink: {
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

export default RegisterScreen;
