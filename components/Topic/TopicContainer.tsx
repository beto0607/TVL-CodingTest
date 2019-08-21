import React from 'react';
import { StyleSheet, View, PanResponder, PanResponderInstance, FlatList, Animated, PanResponderGestureState, Image } from 'react-native';
import { TopicState, ApplicationState, Topic } from '../../types/types';
import { connect } from 'react-redux';
import { TopicComponent } from './Topic';
import { createDragAction, createDropAction } from '../../actions/actions';
/// <reference path="types/module.d.ts"/>
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { Text } from 'react-native-elements';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps extends TopicState { }
interface DispatchProps {
    drag: (x: number, y: number, topic: Topic) => void;
    drop: (x: number, y: number, topic: Topic) => void;
}
export type Props = StateProps & DispatchProps & OwnProps;
/**
 * COMPONENT STATE
 */
export interface State {
    dragging: boolean;
    draggingIndex: number;
    draggingTopic: Topic;
}
/**
 * REACT COMPONENT
 */
export class TopicContainerConnected extends React.Component<Props, State>{
    _panResponder: PanResponderInstance;
    scrollOffset = 0;
    flatListTopOffset = 0;
    elementHeigth = 0;
    currentIdx = -1;
    boxRef: View;
    point = new Animated.ValueXY();

    yToIndex = (y: number) => {
        const value = Math.floor((this.scrollOffset + y - this.flatListTopOffset) / this.elementHeigth) - 1
        return value < 0 ? 0 : (value >= this.props.topics.length ? this.props.topics.length - 1 : value)
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            dragging: false,
            draggingIndex: -1,
            draggingTopic: null
        }
        // This code if from React Native Documentation
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            // Drag start
            onPanResponderGrant: (evt, gestureState) => {
                // Animated.event([null, { dx: this.point.x, dy: this.point.y }])(evt, gestureState);
                Animated.event([{ y: this.point.y, x: this.point.x }])({
                    y: gestureState.y0 - this.elementHeigth / 2,
                    x: gestureState.x0
                });
                this.dragStarted(gestureState.x0, gestureState.y0);
            },
            // Drag update
            onPanResponderMove: (evt, gestureState) => {
                // Animated.event([null, { dx: this.point.x, dy: this.point.y }])(evt, gestureState);
                Animated.event([{ y: this.point.y, x: this.point.x }])({
                    y: gestureState.moveY - this.elementHeigth / 2,
                    x: gestureState.moveX
                });
                this.dragUpdate(gestureState.moveX, gestureState.moveY);
            },
            // Drop
            onPanResponderRelease: (evt, gestureState) => {
                this.reset(gestureState)
            },
            // Drop
            onPanResponderTerminate: (evt, gestureState) => {
                this.reset(gestureState)
            },
        });
    }
    dragStarted = (x: number, y: number) => {
        this.currentIdx = this.yToIndex(y);
        const currentTopic = this.props.topics[this.currentIdx];
        // Dispatch Redux action
        this.props.drag(x, y, currentTopic)
        this.setState({
            dragging: true,
            draggingIndex: this.currentIdx,
            draggingTopic: currentTopic
        });
    }
    dragUpdate = (x: number, y: number) => {
        const currentTopic = this.state.draggingTopic || this.props.topics[this.currentIdx];
        // Dispatch Redux action
        this.props.drag(x, y, currentTopic)
    }
    reset = (gestureState: PanResponderGestureState) => {
        // Dispatch Redux action
        this.props.drop(gestureState.moveX, gestureState.moveY, this.state.draggingTopic);
        this.setState({ dragging: false, draggingIndex: -1, draggingTopic: null });
    }
    render() {
        const { dragging, draggingIndex, draggingTopic } = this.state;
        const { topics } = this.props;

        const renderItem = ({ item, index }, panResponder = true) => (
            <View
                onLayout={e => {
                    this.elementHeigth = e.nativeEvent.layout.height;
                }}
                style={{
                    opacity: (draggingIndex === index ? 0 : 1),
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: 10
                }}>
                <View {...(panResponder ? this._panResponder.panHandlers : {})}>
                    <FontAwesomeIcon icon={faGripVertical} size={15} color={'#80cbc4'} />
                </View>
                <TopicComponent {...item} />
            </View>
        )
        return (
            <View style={styles.container}
                onLayout={e => {
                    this.flatListTopOffset = e.nativeEvent.layout.y;
                    if (this.boxRef) {
                        this.boxRef.measure((...rest) => {
                            this.point.setOffset({ x: 0, y: -rest[5] })
                        })
                    }
                }}
                ref={ref => (this.boxRef = ref)}
            >
                <Text style={{ width: '100%', textAlign: 'center', fontSize: 18 }}>Topics</Text>
                {
                    dragging &&
                    <Animated.View style={{
                        top: this.point.getLayout().top,
                        ...styles.animatedView
                    }}>
                        {renderItem({ item: draggingTopic, index: -1 }, false)}
                    </Animated.View>
                }
                <FlatList
                    style={{ width: '100%' }}
                    data={topics}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    onScroll={e => { this.scrollOffset = e.nativeEvent.contentOffset.y }}
                    scrollEventThrottle={30}
                    scrollEnabled={!dragging}
                />
            </View>
        );
    }
}
// {topics.reverse().map(topic => <TopicComponent {...topic} key={topic.id} />)}
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        marginTop: 5
    },
    animatedView: {
        position: 'absolute',
        width: '100%',
        zIndex: 2,
        opacity: 0.5
    }
});
/**
 * REDUX 
 */
const mapStateToProps = ({ topicReducer: { topics } }: ApplicationState): StateProps => ({
    topics: topics.reverse()
});
const mapDispatchToProps = (dispath: any) => ({
    drag: (x: number, y: number, topic: Topic) => dispath(createDragAction(x, y, topic)),
    drop: (x: number, y: number, topic: Topic) => dispath(createDropAction(x, y, topic))
})
export const TopicContainer = connect(mapStateToProps, mapDispatchToProps)(TopicContainerConnected);