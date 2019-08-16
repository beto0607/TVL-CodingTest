import React from 'react';

import { StyleSheet, Text, View } from 'react-native';


export interface HeaderProps {
    title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }: HeaderProps) => (
    <View style={styles.container}>
        <Text>{title || 'Header'}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
