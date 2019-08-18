import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * COMPONENT PROPS
 */
export interface Props {
    title?: string;
};
/**
 * REACT COMPONENT
 */
export const Header: React.FC<Props> = ({ title }: Props) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title || 'Header'}</Text>
    </View>
)
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#056f00',
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        width: '100%',
        height: 90,
        paddingTop: 40,
        paddingLeft: 15,
    },
    text: {
        fontSize: 25,
        color: '#fff'
    }
});
