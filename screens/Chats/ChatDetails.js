import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { COLORS } from '../../constants/COLOR';
import { getChatDetailsList } from '../../services';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';
import { getDataFromStorage } from '../../constants/storage';
import { useRoute } from '@react-navigation/native';



const ChatDetails = () => {
    const [msg, setMsg] = useState([]);
    const textInputRef = useRef(null);
    const [chatData, setChatData] = useState([]);
    const [Messages, setMessages] = useState([]);
    const route = useRoute();
    const { recepientId } = route.params;

    const [userId, setUserId] = useState();
    const [receiverId, setreceiverId] = useState(recepientId);

    const scrollViewRef = useRef(null);

    useEffect(() => {
        scrollToBottom()
    }, []);

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false })
        }
    }

    const handleContentSizeChange = () => {
        scrollToBottom();
    }

    const fetchMessages = async () => {
        try {
            const userId = await getDataFromStorage('USER_ID');
            setUserId(userId)

            const pusher = new Pusher('976372772d32501ae512', {
                cluster: 'ap2'
            });
            const channel = pusher.subscribe('chat');

            channel.bind('message', (data) => {
                console.log(data)
                fetchMessages()
            });

            let params = { "recepientId": recepientId, "senderId": userId }
            console.log(params);

            axios
                .post("http://localhost:8000/getMessages", params)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setChatData(response.data)
                })
                .catch((error) => {
                    Alert.alert("An error occurred while registering");
                    console.log("registration failed", error);
                });
        } catch (error) {
            console.log("error in sending the message", error);
        }
    };


    useEffect(() => {
        fetchMessages();
    }, []);


    const handleSendPress = async (messageType) => {
        console.log("d")
        try {
            let params = {
                "senderId": userId,
                "recepientId": receiverId,
                "messageType": "text",
                "messageText": msg,
                "timestamp": "2024-02-01T06:41:15.969Z",
                "imageUrl": false
            }
            axios
                .post("http://localhost:8000/messages", params)
                .then((response) => {
                    console.log(JSON.stringify(response.status));
                    if (response.status == 200) {
                        setMsg("")
                        fetchMessages();
                    }
                })
                .catch((error) => {
                    Alert.alert(
                        "Registration Error",
                        "An error occurred while registering"
                    );
                    console.log("registration failed", error);
                });
        } catch (error) {
            console.log("error in sending the message", error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }} onContentSizeChange={handleContentSizeChange} >
                {chatData.map((item, index) => (
                    <View key={item._id} style={[styles.messageContainer, item.recepientId === receiverId ? styles.userMessage : styles.otherMessage]}>
                        <Text style={styles.content}>{item.message}</Text>
                        <Text style={styles.timestamp}>{formatTimestamp(item.timeStamp)}</Text>
                    </View>
                ))}
            </ScrollView>

            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100} >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Type a message"
                        style={styles.textInput}
                        onChangeText={(text) => setMsg(text)}
                        value={msg}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => { handleSendPress("text") }}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        maxWidth: '80%', // Limit the width of the message container
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C5', // Background color for user's messages
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5e5', // Background color for other's messages
    },
    sender: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: '#888888',
        textAlign: 'right'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        borderColor: '#CCCCCC',
        paddingVertical: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChatDetails;
