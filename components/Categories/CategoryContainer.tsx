import React from 'react';
import { StyleSheet, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { TopicComponent } from '../Topic/Topic';
import { Category, ApplicationState, Topic, DragAndDropState } from '../../types/types';
import { connect } from 'react-redux';
import { createTopicToCategoryAction, createTopicDroppedAction } from '../../actions/actions';
import { checkIfPointInBox } from '../../utils/functions';
import { Button, Text } from 'react-native-elements';

/// <reference path="types/module.d.ts"/>
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

/**
 * COMPONENT PROPS
 */
interface OwnProps extends Category { }
interface StateProps extends DragAndDropState {
    selectedTopic?: Topic;
}
interface DispatchProps {
    topicToCategory: (category: Category, topic: Topic) => void;
    topicDropped: (topic: Topic) => void;
}
export type Props = StateProps & DispatchProps & OwnProps;

/**
 * COMPONENT STATE
 */
interface State {
    collapsed: boolean;
    layoutPosition: any;
    hovered: boolean;
}
/**
 * REACT COMPONENT
 */
export class CategoryContainerConnected extends React.Component<Props, State>{
    boxRef: View;
    constructor(props: Props) {
        super(props);
        this.state = {
            collapsed: true,
            layoutPosition: {},
            hovered: false
        };
    }
    toggleCollapsed = () => {
        if (this.props.length === 0) {
            this.setState({ collapsed: true })
        } else {
            this.setState({ collapsed: !this.state.collapsed });
        }
    }
    componentDidUpdate(prevProps: Props, prevState: State) {
        const { layoutPosition } = this.state;
        const { y, x, topicDropped, topicToCategory, topic, title, topics, id, length } = this.props;
        // If was dragging, now it isn't and it ocurred above this category
        if (prevProps.dragging && !this.props.dragging && checkIfPointInBox({ x, y }, layoutPosition)) {
            topicToCategory({ title, topics, id, length }, topic);
            topicDropped(topic);
        }
        if (prevProps.length > 0 && this.props.length === 0) {
            this.setState({ collapsed: true });
        }
    }
    updateLayoutPosition = (e: LayoutChangeEvent) => {
        if (this.boxRef) {
            this.boxRef.measure((...rest) => {
                /**
                 * x => rest[0] relative to parent
                 * y => rest[1] relative to parent
                 * width => rest[2]
                 * height => rest[3]
                 * pageX => rest[4]
                 * pageY => rest[5]
                 * */
                this.setState({ layoutPosition: { x: rest[4], width: rest[2], y: rest[5], heigth: rest[3] } })
            })
        }
    }
    // onLayout={this.updateLayoutPosition}
    // ref={ref => (this.boxRef = ref)}
    render() {
        const { collapsed, layoutPosition } = this.state;
        const { dragging, title, topics, id, length, selectedTopic, topicToCategory, topicDropped, x, y } = this.props;
        const hovered = dragging && checkIfPointInBox({ x, y }, layoutPosition) || false;
        return (
            <View
                style={{ ...styles.container, ...(hovered ? styles.containerHovered : {}) }}
            >
                {dragging &&
                    <View style={styles.dropZone} onLayout={this.updateLayoutPosition}
                        ref={ref => (this.boxRef = ref)}>
                        <FontAwesomeIcon icon={faArrowRight} size={16} color={'#80cbc4'} />
                    </View>
                }
                <TouchableOpacity
                    style={{ width: '100%' }}
                    onPress={() => {
                        if (selectedTopic) {
                            topicToCategory({ title, topics, id, length }, selectedTopic);
                            // removeTopicSelected(selectedTopic);
                            topicDropped(selectedTopic);
                        } else {
                            this.toggleCollapsed();
                        }
                    }}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.size}>{length}</Text>
                    </View>
                    {
                        !collapsed && topics.map(topic => <TopicComponent {...topic} key={topic.id} canBeRemoved={true} />)
                    }
                </TouchableOpacity>
                {
                    !collapsed &&
                    <Button
                        title='Less'
                        onPress={this.toggleCollapsed}
                        type="clear"
                        titleStyle={{
                            color: "#841584"
                        }}
                    />
                }
            </View>
        )
    }
}
/**
 *  STYLES
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0f7fa',
        width: '100%',
        padding: 0,
        marginVertical: 3,
        borderColor: '#999',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    containerHovered: {
        backgroundColor: '#8bebf7'
    },
    dropZone: {
        marginLeft: 10,
        paddingHorizontal: 5,
        borderColor: '#80cbc4',
        borderWidth: 1
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    text: {
        color: '#2a36b1',
        fontSize: 15,
        marginLeft: 10
    },
    size: {
        color: '#2a36b1',
        fontSize: 15,
        alignSelf: 'flex-end',
    }
});
/**
 * REDUX
 */
const mapStateToProps = ({ topicReducer: { selectedTopic }, dragAndDropReducer }: ApplicationState, ownProps: OwnProps): StateProps => ({
    ...ownProps,
    selectedTopic,
    ...dragAndDropReducer
});
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    topicToCategory: (category: Category, topic: Topic) => { dispatch(createTopicToCategoryAction(category, topic)) },
    topicDropped: (topic: Topic) => { dispatch(createTopicDroppedAction(topic)) }
});
export const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryContainerConnected);