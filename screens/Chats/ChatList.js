// ChatList.js
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import Messages from './Messages';
import { getDataFromStorage, setDataToStorage } from '../../constants/storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ChatList = ({ navigation }) => {
    const [chatList, setChatList] = useState([]);


    useLayoutEffect(() => {
        const setHeaderOptions = async () => {
            const userImage = await getDataFromStorage('USER_PROF');
            navigation.setOptions({
                headerTitle: "Home",
                headerRight: () => (
                    <TouchableOpacity style={styles.avatarContainer} onPress={() => navigation.navigate("profile")}>
                        <Image source={{ uri: userImage }} style={styles.avatarImage} />
                    </TouchableOpacity>
                ),
            });
        };

        setHeaderOptions(); // Call the function to set header options

        // Cleanup function if needed
        return () => {
            // Your cleanup code here, if necessary
        };
    }, [navigation]);


    useFocusEffect(
        React.useCallback(() => {
            // Additional code related to focus effect, if needed
            return () => {

                fetchChatList();
            };
        }, [])
    );

    useEffect(() => {
        fetchChatList();
    }, []);

    const memoizedFetchChatList = useCallback(() => {
        fetchChatList();
    }, []); // Pass an empty dependency array if no dependencies are needed

    // Use useFocusEffect with the memoized function
    useFocusEffect(memoizedFetchChatList);

    const fetchChatList = async () => {
        try {

            const token = await getDataFromStorage('TOKEN_KEY');
            let params = { "token": token }
            console.log(params);

            axios
                .post("http://localhost:8000/users", params)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setChatList(response.data)
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
        <TouchableOpacity style={styles.container}  >
            <FlatList
                data={chatList}
                keyExtractor={(item) => item._id.toString()}  // Assuming 'id' is a number; adjust accordingly
                renderItem={({ item }) => (
                    <View >
                        <Messages sender={item.name} content={item.lastMessage} timestamp={item.lastMessageTimestamp} receiverid={item._id} type={item.messageType} image={item.image} />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    avatarContainer: {
        width: 35, // Set the width and height as per your requirements for the circular avatar
        height: 35,
        borderRadius: 40, // Make it half of the width/height to create a circular shape
        overflow: 'hidden',
        borderWidth: 0.7,
        margin: 10 // Clip the image to the rounded shape
    },
    avatarImage: {
        flex: 1, // Ensure the image takes the full container space
        width: null, // Make sure the width and height are null to stretch the image
        height: null,
    },
});

export default ChatList;
