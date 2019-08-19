import { TOPIC_SELECTED, Topic, TOPIC_ADDED, Category, TOPIC_DROPPED, TOPIC_DRAGGED, CATEGORY_ADDED, CategoryAddedAction, TopicDraggedAction, TopicDroppedAction, TopicAddedAction, TopicSelectedAction, TopicToCategoryAction, TOPIC_TO_CATEGORY } from "../types/types";

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
export const createTopicDroppedAction = (topic: Topic, category: Category): TopicDroppedAction => ({
    type: TOPIC_DROPPED,
    topic,
    category
});
// TODO: Find a reason for having this action
export const createTopicDraggedAction = (topic: Topic): TopicDraggedAction => ({
    type: TOPIC_DRAGGED,
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