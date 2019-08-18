import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TopicComponent } from '../Topic/Topic';
import { Category } from '../../types/types';

/**
 * COMPONENT PROPS
 */
interface OwnProps extends Category { }
interface StateProps { }
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const CategoryContainer: React.FC<Props> = ({ title, topics }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.quantity}>0</Text>
            </View>
            {
                collapsed ? null : topics.map(topic => <TopicComponent {...topic} key={topic.id} />)
            }
            <Button
                title={collapsed ? "More" : 'Less'}
                onPress={() => setCollapsed(!collapsed)}
                color="#841584"
            />
        </View>
    )
}
/**
 *  STYLES
 */
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
/**
 * REDUX
 */