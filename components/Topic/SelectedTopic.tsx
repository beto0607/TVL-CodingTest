import React from 'react';
import { StyleSheet, View } from 'react-native';
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
            <TopicComponent {...selectedTopic} canBeRemoved={false} />
        </View>
    )
}
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#80cbc4',
        width: '100%',
        alignItems: 'center'
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