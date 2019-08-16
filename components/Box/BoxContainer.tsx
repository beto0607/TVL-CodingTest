import React, { useState } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { BoxTopicContainer } from './BoxTopicContainer';

export interface BoxContainerProps {
    title: string;
    topics: Array<string>;
};

export const BoxContainer: React.FC<BoxContainerProps> = ({ title, topics }: BoxContainerProps) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.quantity}>0</Text>
            </View>
            <Button
                title={collapsed ? "More" : 'Less'}
                onPress={() => setCollapsed(!collapsed)}
                color="#841584"
            />
            {
                collapsed ? null : (<BoxTopicContainer topics={topics || []} />)
            }
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
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    title: {
        color: '#2a36b1',
        fontSize: 20,
    },
    quantity: {
        color: '#2a36b1',
        fontSize: 20,
    },
});
