import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Topic } from '../../types/types';
import { connect } from 'react-redux';
import { createTopicSelectedAction } from '../../actions/actions';
/**
 * COMPONENT PROPS
 */
interface OwnProps extends Topic { }
interface StateProps { }
interface DispatchProps {
    topicSelected: (topic: Topic) => void
}
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const TopicComponentConnected: React.FC<Props> = ({ text, selected, id, topicSelected }: Props) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    topicSelected({ text, selected: !selected, id })
                }}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
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
        borderColor: '#cdcdcd',
        borderRadius: 30,
        borderWidth: 3,
        backgroundColor: '#eee'
    },
    text: {
        fontSize: 20
    },
});
/**
 * REDUX
 */
const mapDispatchToProps = (dispatch: any, ownprops: OwnProps): DispatchProps => ({
    ...ownprops,
    topicSelected: (topic: Topic) => dispatch(createTopicSelectedAction(topic))
});
export const TopicComponent = connect(null, mapDispatchToProps)(TopicComponentConnected);