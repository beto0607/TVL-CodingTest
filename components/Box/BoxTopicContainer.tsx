import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
// import uuid from 'uuid';

export interface BoxTopicContainerProps {
    topics: Array<string>;
};

export const BoxTopicContainer: React.FC<BoxTopicContainerProps> = ({ topics }: BoxTopicContainerProps) => {
    return (
        <View style={styles.container}>
        </View>
    )
}
// {topics.map(topic => (<Text key={uuid.v1()}>{topic}</Text>))}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0f7fa',
        width: '100%',
        padding: 15,
        marginBottom: 5,
        marginTop: 5,
    },
    title: {
        color: '#2a36b1',
        fontSize: 20,
    }
});
