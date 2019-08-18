import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
export const CategoryContainer: React.FC<Props> = ({ text, selected, id }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
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