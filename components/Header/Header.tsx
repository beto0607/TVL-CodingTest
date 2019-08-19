import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

/**
 * COMPONENT PROPS
 */
export interface Props {
    title: string;
};
/**
 * REACT COMPONENT
 */
export const Header: React.FC<Props> = ({ title }: Props) => (
    <View style={styles.container}>
        <Text style={styles.text} h4>{title}</Text>
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
        height: 80,
        paddingTop: 40,
        paddingLeft: 15,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    }
});
