import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Topic } from '../../types/types';
/**
 * COMPONENT PROPS
 */
interface OwnProps extends Topic { }
interface StateProps { }
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const TopicComponent: React.FC<Props> = ({ text, selected, id }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={selected ? styles.selected : styles.text}>{text}</Text>
        </View>
    )
}
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5
    },
    text: {
    },
    selected: {
    },
});
/**
 * REDUX
 */