// ChatList.js
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Messages from './Messages';
import { getChatList } from '../../services';

const ChatList = ({ navigation }) => {
    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        fetchChatList();
    }, []);

    const fetchChatList = async () => {
        try {
            let params = {
            };
            const responseJson = await getChatList(params);
            console.log(JSON.stringify(responseJson.data))
            setChatData(responseJson.data.memberChatList)

        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("chatdtls")}>
            <FlatList
                data={chatData}
                keyExtractor={(item) => item.memberId.toString()}  // Assuming 'id' is a number; adjust accordingly
                renderItem={({ item }) => (
                    <Messages sender={item.memberName} content={item.chatLastText} timestamp={item.chatCreatedOnlyTime} />
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
