import { rootReducer } from "../reducers/reducers";

// ACTIONS
export const TOPIC_DRAGGED = "TOPIC_DRAGGED";
export interface TopicDraggedAction {
    type: typeof TOPIC_DRAGGED;
    topic: Topic;
}
export const TOPIC_DROPPED = "TOPIC_DROPPED";
export interface TopicDroppedAction {
    type: typeof TOPIC_DROPPED;
    topic: Topic;
    category: Category;
}
export const TOPIC_ADDED = "TOPIC_ADDED";
export interface TopicAddedAction {
    type: typeof TOPIC_ADDED;
    topic: Topic;
}
export const TOPIC_SELECTED = "TOPIC_SELECTED";
export interface TopicSelectedAction {
    type: typeof TOPIC_SELECTED;
    topic: Topic;
}
export type TopicActions = TopicSelectedAction | TopicDraggedAction | TopicDroppedAction | TopicAddedAction;

export const CATEGORY_ADDED = "CATEGORY_ADDED";
export interface CategoryAddedAction {
    type: typeof CATEGORY_ADDED;
    category: Category;
}
export type CategoryActions = CategoryAddedAction;


export type AppActions = CategoryActions | TopicActions;
// TOPICS

export interface Topic {
    id: string;
    text: string;
    selected: boolean;
}

export interface TopicState {
    topics: Array<Topic>;
    selectedTopic?: Topic;
}

// CATEGORIES

export interface Category {
    id: string;
    title: string;
    topics: Array<Topic>;
}
export interface CategoriesState {
    categories: Array<Category>;
}


export type ApplicationState = ReturnType<typeof rootReducer>
