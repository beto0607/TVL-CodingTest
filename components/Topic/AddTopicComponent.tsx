import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Topic } from '../../types/types';
import uuid from 'uuid';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import { createTopicAddedAction } from '../../actions/actions';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps { }
interface DispatchProps {
    topicAdded: (topic: Topic) => void
}
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const AddTopicComponentConnected: React.FC<Props> = ({ topicAdded }: Props) => {
    const [topicName, setTopicName] = useState('');
    const [showingPropmt, togglePromt] = useState(false);
    const handleCancelledPrompt = () => {
        togglePromt(false);
    };
    const handleSubmittedPropmt = () => {
        togglePromt(false);
        topicAdded({
            text: topicName,
            selected: false,
            id: uuid.v1()
        })
    }
    return (
        <View style={styles.container}>
            <Button
                title="Add topic"
                onPress={() => togglePromt(true)}
            />
            <Dialog.Container visible={showingPropmt}>
                <Dialog.Title>New topic</Dialog.Title>
                <Dialog.Input placeholder="Name" onChangeText={(name) => setTopicName(name)} />
                <Dialog.Button label="Cancel" onPress={handleCancelledPrompt} />
                <Dialog.Button label="Create" onPress={handleSubmittedPropmt} />
            </Dialog.Container>
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
const mapDispatchToProps = (dispatch: any, ownprops: OwnProps): DispatchProps => ({
    ...ownprops,
    topicAdded: (topic: Topic) => dispatch(createTopicAddedAction(topic))
});
export const AddTopicComponent = connect(null, mapDispatchToProps)(AddTopicComponentConnected);