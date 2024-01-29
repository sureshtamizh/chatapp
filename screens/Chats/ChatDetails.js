import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS } from '../../constants/COLOR';

// Dummy data for testing
const messageDetailsData = [
    { "id": "1", "sender": "John", "content": "Hello!", "timestamp": "10:30 AM" },
    { "id": "2", "sender": "User", "content": "Hi there!", "timestamp": "11:00 AM" },
    { "id": "3", "sender": "User", "content": "How are you?", "timestamp": "11:15 AM" },
    { "id": "4", "sender": "John", "content": "I'm doing well, thanks!", "timestamp": "11:30 AM" },
    { "id": "5", "sender": "User", "content": "That's great to hear!", "timestamp": "11:45 AM" },
    { "id": "6", "sender": "User", "content": "What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?What have you been up to?", "timestamp": "12:00 PM" },
    { "id": "7", "sender": "John", "content": "Just relaxing and catching up on some work.", "timestamp": "12:15 PM" },
    { "id": "8", "sender": "User", "content": "Nice! I'm working on a project too.", "timestamp": "12:30 PM" },
    { "id": "9", "sender": "John", "content": "Tell me more about your project.", "timestamp": "01:00 PM" },
    { "id": "10", "sender": "User", "content": "It's a mobile app for tracking expenses.", "timestamp": "01:30 PM" },
    { "id": "11", "sender": "John", "content": "That sounds interesting! How is it going?", "timestamp": "02:00 PM" },
    { "id": "12", "sender": "User", "content": "It's going well. I'm adding some new features.", "timestamp": "02:30 PM" },
    { "id": "13", "sender": "John", "content": "Good to hear! Any challenges you're facing?", "timestamp": "03:00 PM" },
    { "id": "14", "sender": "User", "content": "Not major ones. Just fine-tuning the UI.", "timestamp": "03:30 PM" },
    { "id": "15", "sender": "John", "content": "UI is crucial. Are you using any specific libraries?", "timestamp": "04:00 PM" },
    { "id": "16", "sender": "User", "content": "Yes, I'm using React Native for the frontend.", "timestamp": "04:30 PM" },
    { "id": "17", "sender": "John", "content": "Great choice! How about the backend?", "timestamp": "05:00 PM" },
    { "id": "18", "sender": "User", "content": "I'm using Node.js with Express for the backend.", "timestamp": "05:30 PM" },
    { "id": "19", "sender": "John", "content": "Solid stack! Anything else you'd like to discuss about the project?", "timestamp": "06:00 PM" },
    { "id": "20", "sender": "User", "content": "Not at the moment. Let's grab a coffee sometime and chat more.", "timestamp": "06:30 PM" },
    { "id": "21", "sender": "John", "content": "Sure! I'm up for it. Just let me know when.", "timestamp": "07:00 PM" },
    { "id": "22", "sender": "User", "content": "Sounds good. Have a great day!", "timestamp": "07:30 PM" },
    { "id": "23", "sender": "John", "content": "You too! Take care.", "timestamp": "08:00 PM" },
    { "id": "24", "sender": "User", "content": "Goodbye!", "timestamp": "08:30 PM" },
    { "id": "25", "sender": "John", "content": "Goodbye!", "timestamp": "09:00 PM" },
    { "id": "26", "sender": "User", "content": "See you soon!", "timestamp": "09:30 PM" },
    { "id": "27", "sender": "John", "content": "Looking forward to it. Bye!", "timestamp": "10:00 PM" },
    { "id": "28", "sender": "User", "content": "Bye!", "timestamp": "10:30 PM" },
    { "id": "29", "sender": "John", "content": "Take care!", "timestamp": "11:00 PM" },
    { "id": "30", "sender": "User", "content": "You too!", "timestamp": "11:30 PM" }
]





const ChatDetails = () => {
    const [msg, setMsg] = useState([]);
    const textInputRef = useRef(null);

    const handleSendPress = () => {
        // Handle sending logic here

        // After sending, focus on the TextInput again
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };


    const handleTextInputFocus = () => {
        Keyboard.dismiss(); // Dismiss keyboard immediately on focus (option 1)
    };

    return (

        <View style={styles.container}>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>   */}

            <FlatList
                data={messageDetailsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.sender === 'User' ? styles.userMessage : styles.otherMessage]}>
                        <Text style={styles.content}>{item.content}</Text>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                )}
            />

            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100} >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Type a message"
                        style={styles.textInput}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
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
