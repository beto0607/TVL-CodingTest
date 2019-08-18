import { TOPIC_SELECTED, Topic, TOPIC_ADDED, Category, TOPIC_DROPPED, TOPIC_DRAGGED, CATEGORY_ADDED, CategoryAddedAction, TopicDraggedAction, TopicDroppedAction, TopicAddedAction, TopicSelectedAction } from "../types/types";

export const createTopicSelectedAction = (topic: Topic): TopicSelectedAction => ({
    type: TOPIC_SELECTED,
    topic
});

export const createTopicAddedAction = (topic: Topic): TopicAddedAction => ({
    type: TOPIC_ADDED,
    topic
});

export const createTopicDroppedAction = (topic: Topic, category: Category): TopicDroppedAction => ({
    type: TOPIC_DROPPED,
    topic,
    category
});

export const createTopicDraggedAction = (topic: Topic): TopicDraggedAction => ({
    type: TOPIC_DRAGGED,
    topic
});

export const createCategoryAddedAction = (category: Category): CategoryAddedAction => ({
    type: CATEGORY_ADDED,
    category
})