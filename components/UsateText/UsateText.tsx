import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * COMPONENT PROPS
 */
export interface Props {
    text?: string;
};
/**
 * REACT COMPONENT
 */
export const UsateText: React.FC<Props> = ({ text }: Props) => (
    <View style={styles.container}>
        <Text style={styles.text}>{text || 'Drag a topic into a box to populate the field...'}</Text>
    </View>
)
/**
 *  STYLES
 */
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
