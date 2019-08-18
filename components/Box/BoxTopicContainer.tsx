import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Topic } from '../../types/types';
// import uuid from 'uuid';

interface OwnProps { }
interface DispatchProps { }
interface StateProps {
    topics: Array<Topic>;
}
export type BoxTopicContainerProps = StateProps & DispatchProps & OwnProps

export const BoxTopicContainer: React.FC<BoxTopicContainerProps> = ({ topics }: BoxTopicContainerProps) => {
    return (
        <View style={styles.container}>
            {topics.map(({ id, text }) => (<Text key={id}>{text}</Text>))}
        </View>
    )
}
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
