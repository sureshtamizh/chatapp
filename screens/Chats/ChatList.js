// ChatList.js
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Messages from './Messages';


const ChatList = () => {
    const chatData = [
        { id: '1', sender: 'John', content: 'Hello there!', timestamp: '10:30 AM' },
        { id: '2', sender: 'Alice', content: 'Hi John!', timestamp: '10:32 AM' },
        // Add more messages as needed
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={chatData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Messages sender={item.sender} content={item.content} timestamp={item.timestamp} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChatList;
