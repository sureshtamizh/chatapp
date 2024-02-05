// ChatList.js
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Messages from './Messages';
import { getChatList } from '../../services';
import { getDataFromStorage } from '../../constants/storage';
import axios from 'axios';

const ChatList = ({ navigation }) => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        fetchChatList();
    }, []);

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
                    <Messages sender={item.name} content={item.lastMessage} timestamp={item.lastMessageTimestamp} receiverid={item._id} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChatList;
