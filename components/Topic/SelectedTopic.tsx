import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Topic, ApplicationState } from '../../types/types';
import { connect } from 'react-redux';
import { createTopicAddedAction } from '../../actions/actions';
import { TopicComponent } from './Topic';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps {
    selectedTopic?: Topic
}
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const SelectedTopicConnected: React.FC<Props> = ({ selectedTopic }: Props) => {
    if (!selectedTopic)
        return null;
    return (
        <View style={styles.container}>
            <TopicComponent {...selectedTopic} />
        </View>
    )
}
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#056f00',
        width: '100%',
        height: 60
    },
    button: {
        color: '#fff'
    }
});
/**
 * REDUX
 */
const mapStateToProps = ({ topicReducer: { selectedTopic } }: ApplicationState): StateProps => ({
    selectedTopic
});
const mapDispatchToProps = (dispatch: any, ownprops: OwnProps): DispatchProps => ({
    ...ownprops,
    topicAdded: (topic: Topic) => dispatch(createTopicAddedAction(topic))
});
export const SelectedTopicComponent = connect(mapStateToProps, mapDispatchToProps)(SelectedTopicConnected);