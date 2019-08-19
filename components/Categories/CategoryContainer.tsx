import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TopicComponent } from '../Topic/Topic';
import { Category, ApplicationState, Topic } from '../../types/types';
import { connect } from 'react-redux';
import { createTopicToCategoryAction, createTopicSelectedAction, createTopicDroppedAction } from '../../actions/actions';

/**
 * COMPONENT PROPS
 */
interface OwnProps extends Category { }
interface StateProps {
    selectedTopic?: Topic;
}
interface DispatchProps {
    topicToCategory: (category: Category, topic: Topic) => void;
    removeTopicSelected: (topic: Topic) => void;
    topicDropped: (topic: Topic) => void;
}
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const CategoryContainerConnected: React.FC<Props> = ({ title, id, topics, length, topicToCategory, selectedTopic, removeTopicSelected, topicDropped }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
    console.log(topics.length);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchableContainer}
                onPress={() => {
                    if (selectedTopic) {
                        topicToCategory({ title, topics, id, length }, selectedTopic);
                        // removeTopicSelected(selectedTopic);
                        topicDropped(selectedTopic);
                    }else{
                        setCollapsed(!collapsed);
                    }
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.quantity}>{length}</Text>
                </View>
                {
                    !collapsed && topics.map(topic => <TopicComponent {...topic} key={topic.id} />)
                }
            </TouchableOpacity>
            {
                !collapsed &&
                <Button
                    title={collapsed ? "More" : 'Less'}
                    onPress={() => setCollapsed(!collapsed)}
                    color="#841584"
                />
            }
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
        padding: 7,
        marginVertical:5,
        borderColor: '#999',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    touchableContainer:{},
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
const mapStateToProps = ({ topicReducer: { selectedTopic } }: ApplicationState, ownProps: OwnProps): StateProps => ({
    ...ownProps,
    selectedTopic
});
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    topicToCategory: (category: Category, topic: Topic) => { dispatch(createTopicToCategoryAction(category, topic)) },
    removeTopicSelected: (topic: Topic) => { dispatch(createTopicSelectedAction(topic)) },
    topicDropped: (topic: Topic) => { dispatch(createTopicDroppedAction(topic)) }
});
export const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryContainerConnected);