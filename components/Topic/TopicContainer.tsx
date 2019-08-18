import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TopicState, ApplicationState, TOPIC_SELECTED } from '../../types/types';
import { connect } from 'react-redux';
import { TopicComponent } from './Topic';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps extends TopicState { }
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps;
/**
 * COMPONENT STATE
 */
export interface State { }
/**
 * REACT COMPONENT
 */
export class TopicContainerConnected extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { topics } = this.props;
        return (
            <View>
                {topics.map(topic => <TopicComponent {...topic} key={topic.id} />)}
            </View>
        );
    }
}
/**
 *  STYLES
 */
const styles = StyleSheet.create({});
/**
 * REDUX 
 */
const mapStateToProps = ({ topicReducer: { topics } }: ApplicationState): StateProps => ({
    topics
});
export const TopicContainer = connect(mapStateToProps)(TopicContainerConnected);