import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { COLORS } from '../../constants/COLOR';
import { getChatDetailsList } from '../../services';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';
import { getDataFromStorage } from '../../constants/storage';
import { useRoute } from '@react-navigation/native';
import socket from './socket';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';


const ChatDetails = () => {
    const [msg, setMsg] = useState([]);
    const textInputRef = useRef(null);
    const [chatData, setChatData] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [imageUri, setimageUri] = useState();

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
        socket.on('message', (message) => {
            console.log(message)
        });
        return () => {
            socket.off('message');
        };
    }, []);


    const pickImage = () => {
        ImagePicker.openPicker({
            cropping: true,
            compressImageQuality: 0.15
        }).then(image => {
            console.log(JSON.stringify(image));
            setimageUri(image.sourceURL)
            convertBase64(image.sourceURL)
                .then(base64String => {
                    setimageUri(base64String)
                    console.log(base64String);
                    // Do something with the base64 string
                    handleSendPress("image")
                })
                .catch(error => {
                    console.error('Error converting to base64:', error);
                });
            console.log(res)
            // handleSendPress("image")
        }).catch((error) => {
            console.log('error',);
            var errorTemp = JSON.stringify(error)
            console.log('errorTemp', errorTemp);
        });

    };
    const convertBase64 = (imagePath) => {
        return new Promise((resolve, reject) => {
            RNFS.readFile(imagePath, 'base64')
                .then(base64String => {
                    resolve(base64String);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    useEffect(() => {
        if (!mountedRef.current) {
            return;
        }
        // const pusher = new Pusher('976372772d32501ae512', {
        //     cluster: 'ap2'
        // });
        // const channel = pusher.subscribe('chat');

        // channel.bind('message', (data) => {
        //     console.log(data)
        //     fetchMessages()
        // });

        fetchMessages();
    }, []);


    const mountedRef = { current: true };

    const handleSendPress = async (messageType) => {

        try {
            const formData = new FormData();
            formData.append("senderId", userId);
            formData.append("recepientId", recepientId);

            // Check the message type (image or text)
            if (messageType === "image") {
                formData.append("messageType", "image");
                formData.append("imageFile", imageUri);
            } else {
                formData.append("messageType", messageType);
                formData.append("messageText", msg);
            }

            console.log(formData);

            // Send the form data using axios
            const response = await axios.post("http://localhost:8000/messages", formData);

            // Check the response status
            if (response.status === 200) {
                setMsg("");
                // fetchMessages();
                console.log("Message sent successfully");
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            // Handle errors
            if (error.response) {
                console.error("Server responded with non-2xx status:", error.response.status);
            } else if (error.request) {
                console.error("No response received from the server:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }

            // Additional error handling or logging as needed
            console.log("Error in sending the message:", error);
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
                        value={msg.toString()}
                    />

                    <TouchableOpacity onPress={() => { pickImage() }}>
                        <Icon name="photo-camera" size={28} style={{ marginRight: 10 }} color="grey" />
                    </TouchableOpacity>
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
