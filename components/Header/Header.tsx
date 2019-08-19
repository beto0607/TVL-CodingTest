import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Header as HeaderElement } from 'react-native-elements';

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
    <HeaderElement
        placement="left"
        containerStyle={styles.container}
        centerComponent={{ text: title, style: styles.text }}
    />
)
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#80cbc4'
    },
    text: {
        color: '#263238',
        fontSize: 20
    }
});
