import React from 'react';

import { StyleSheet, Text, View } from 'react-native';


export interface UsateTextProps {
    text?: string;
};

export const UsateText: React.FC<UsateTextProps> = ({ text }: UsateTextProps) => (
    <View style={styles.container}>
        <Text style={styles.text}>{text || 'Drag a topic into a box to populate the field...'}</Text>
    </View>
)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f8e9',
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        width: '100%',
        padding: 15
    },
    text: {
        fontSize: 20,
        color: '#000000'
    }
});
