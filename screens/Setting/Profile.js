import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, Pressable } from 'react-native';
import { getDataFromStorage } from '../../constants/storage';
import axios from 'axios';

const Profile = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [bio, setBio] = useState('I love coding!');
    const [userData, setUserData] = useState({});


    const [image, setImage] = useState(''); // You can store the image URI or base64 data here

    const handleSave = () => {
        // Handle the logic to save the profile data
        console.log('Profile data saved!');
    };

    useEffect(() => {
        fetchChatList();
    }, []);

    const fetchChatList = async () => {
        try {

            const token = await getDataFromStorage('TOKEN_KEY');
            let params = { "token": token }
            console.log(params);

            axios
                .post("http://localhost:8000/usersDtls", params)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setUserData(response.data)
                })
                .catch((error) => {
                    Alert.alert("An error occurred while registering");
                    console.log("registration failed", error);
                });
        } catch (error) {
            console.log("error in sending the message", error);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={{ uri: userData.image }} style={styles.profileImage} />
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={userData.username}
                onChangeText={(text) => setName(text)}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={userData.useremail}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
                style={styles.input}
                value={userData.bio}
                onChangeText={(text) => setBio(text)}
                multiline
            />

            <Pressable onPress={() => { handleSave() }} style={styles.loginButton}>
                <Text style={styles.buttonText}>SAVE</Text>
            </Pressable>
            {/* <Button title="Save" onPress={handleSave} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginBottom: 20,
        marginTop: 40,
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'left'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        // paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    loginButton: {
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#194F8B',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
});

export default Profile;
