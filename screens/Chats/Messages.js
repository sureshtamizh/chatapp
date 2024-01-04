// Message.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Messages = ({ sender, content, timestamp }) => {
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.sender}>{sender}</Text>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sender: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
});

export default Messages;
