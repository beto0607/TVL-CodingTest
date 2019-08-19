import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Topic } from '../../types/types';
import { connect } from 'react-redux';
import { createTopicSelectedAction, createTopicRemovedFromCategoryAction, createTopicAddedAction } from '../../actions/actions';
/// <reference path="types/module.d.ts"/>
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
/**
 * COMPONENT PROPS
 */
interface OwnProps extends Topic {
    canBeRemoved: boolean;
}
interface StateProps { }
interface DispatchProps {
    topicSelected: (topic: Topic) => void;
    topicRemoved: (topic: Topic) => void;
    addTopicToPool: (topic: Topic) => void;
}
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const TopicComponentConnected: React.FC<Props> = ({ text, id, topicSelected, topicRemoved, addTopicToPool, canBeRemoved = false }: Props) => {
    const topic: Topic = { text, id };
    return (
        <View
            style={{ ...styles.container, ...(canBeRemoved ? styles.removableContainer : {}) }}
        >
            <TouchableOpacity
                onPress={() => {
                    topicSelected(topic)
                }}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
            {
                canBeRemoved &&
                <TouchableOpacity
                    style={styles.removeContainer}
                    onPress={() => {
                        topicRemoved(topic)
                        addTopicToPool(topic);
                    }}
                >
                    <FontAwesomeIcon icon={faTimesCircle} size={20} color={'#ccc'} />
                </TouchableOpacity>
            }
        </View >
    )
};
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 4,
        borderColor: '#2a36b1',
        borderBottomWidth: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removableContainer: {
        width: '100%'
    },
    removeContainer: {
    },
    text: {
        fontSize: 18,
        color: '#263238'
    },
});
/**
 * REDUX
 */
const mapDispatchToProps = (dispatch: any, ownprops: OwnProps): DispatchProps => ({
    ...ownprops,
    topicSelected: (topic: Topic) => dispatch(createTopicSelectedAction(topic)),
    topicRemoved: (topic: Topic) => dispatch(createTopicRemovedFromCategoryAction(topic)),
    addTopicToPool: (topic: Topic) => dispatch(createTopicAddedAction(topic))
});
export const TopicComponent = connect(null, mapDispatchToProps)(TopicComponentConnected);