// Message.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Messages = ({ sender, content, timestamp, receiverid }) => {
    const navigation = useNavigation();
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return timestamp ? `${hours}:${minutes}` : "";
    };

    return (
        <TouchableOpacity style={styles.messageContainer} onPress={() => navigation.navigate("chatdtls", {
            recepientId: receiverid
        })}>
            <View style={styles.title}>
                <Text style={styles.sender}>{sender}</Text>
                <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
            </View>
            <Text style={styles.content}>{content}</Text>
        </TouchableOpacity>
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
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default Messages;
