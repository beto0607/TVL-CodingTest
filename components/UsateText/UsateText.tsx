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
        <Text style={styles.text}>{text || 'Drop or select one topic and tap in the category to populate it. '}</Text>
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
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 15,
        color: '#263238'
    }
});
