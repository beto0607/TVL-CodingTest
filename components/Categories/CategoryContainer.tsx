import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { TopicComponent } from '../Topic/Topic';
import { Category, ApplicationState, Topic, DragAndDropState } from '../../types/types';
import { connect } from 'react-redux';
import { createTopicToCategoryAction, createTopicDroppedAction } from '../../actions/actions';
import { checkIfYInBox } from '../../utils/functions';
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
        this.setState({ collapsed: !this.state.collapsed });
    }
    componentDidUpdate(prevProps: Props, prevState: State) {
        const { layoutPosition } = this.state;
        const { y, topicDropped, topicToCategory, topic, title, topics, id, length } = this.props;
        // If was dragging, now it isn't and it ocurred above this category
        if (prevProps.dragging && !this.props.dragging && checkIfYInBox(y, layoutPosition)) {
            console.log("dropped");
            console.log({ title, topics, id, length }, topic)
            topicToCategory({ title, topics, id, length }, topic);
            topicDropped(topic);
        }
    }
    updateLayoutPosition = (e: LayoutChangeEvent) => {
        if (this.boxRef) {
            this.boxRef.measure((...rest) => {
                this.setState({ layoutPosition: { y: rest[5], heigth: rest[3] } })
            })
        }
    }
    render() {
        const { collapsed, layoutPosition } = this.state;
        const { dragging, title, topics, id, length, selectedTopic, topicToCategory, topicDropped, y } = this.props;
        const hovered = dragging && checkIfYInBox(y, layoutPosition) || false;
        return (
            <View
                style={{ ...styles.container, ...(hovered ? styles.containerHovered : {}) }}
                onLayout={this.updateLayoutPosition}
                ref={ref => (this.boxRef = ref)}
            >
                <TouchableOpacity
                    style={styles.touchableContainer}
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
                        onPress={this.toggleCollapsed}
                        color="#841584"
                    />
                }
            </View>
        )
    }
}
export const CategoryContainerConnected2: React.FC<Props> = ({ title, id, topics, length, topicToCategory, selectedTopic, topicDropped, topic, y, dragging }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
    const [layoutPosition, setLayout] = useState({});
    if (dragging) {
        console.log(layoutPosition);
    }
    return (
        <View
            style={{ ...styles.container, ...(dragging ? styles.containerHovered : {}) }}
            onLayout={e => {
                setLayout(e.nativeEvent.layout)
            }}
        >
            <TouchableOpacity
                style={styles.touchableContainer}
                onPress={() => {
                    if (selectedTopic) {
                        topicToCategory({ title, topics, id, length }, selectedTopic);
                        topicDropped(selectedTopic);
                    } else {
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
        marginVertical: 5,
        borderColor: '#999',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    containerHovered: {
        backgroundColor: '#8bebf7'
    },
    touchableContainer: {},
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