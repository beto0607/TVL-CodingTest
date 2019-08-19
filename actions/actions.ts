import { TOPIC_SELECTED, Topic, TOPIC_ADDED, Category, TOPIC_DROPPED, CATEGORY_ADDED, CategoryAddedAction, TopicDroppedAction, TopicAddedAction, TopicSelectedAction, TopicToCategoryAction, TOPIC_TO_CATEGORY, DropAction, DragAction, DRAG, DROP } from "../types/types";

// Dispatchs an action when you press a Topic
export const createTopicSelectedAction = (topic: Topic): TopicSelectedAction => ({
    type: TOPIC_SELECTED,
    topic
});
// Dispatchs an action when you sumbit a new topic
export const createTopicAddedAction = (topic: Topic): TopicAddedAction => ({
    type: TOPIC_ADDED,
    topic
});
// // TODO: Find a reason for having this action - DONE
// Dispatchs an action when a topic is putted in a category(touch or drop)
export const createTopicDroppedAction = (topic: Topic): TopicDroppedAction => ({
    type: TOPIC_DROPPED,
    topic
});
// Dispatchs an action when a Drag starts and updates
export const createDragAction = (y: number, topic: Topic): DragAction => ({
    type: DRAG,
    y,
    topic
});
// Dispatchs an action when a Drag finishs
export const createDropAction = (y: number, topic: Topic): DropAction => ({
    type: DROP,
    y,
    topic
});
// TODO: Dispatchs an action when you submit a new category
export const createCategoryAddedAction = (category: Category): CategoryAddedAction => ({
    type: CATEGORY_ADDED,
    category
});
// Dispatchs an action when you press in a category having a Topic selected
export const createTopicToCategoryAction = (category: Category, topic: Topic): TopicToCategoryAction => ({
    type: TOPIC_TO_CATEGORY,
    category,
    topic
});