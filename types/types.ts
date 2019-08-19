import { rootReducer } from "../reducers/reducers";

// ACTIONS
export const TOPIC_DRAGGED = "TOPIC_DRAGGED";
export interface TopicDraggedAction {
    type: typeof TOPIC_DRAGGED;
    topic: Topic;
}
// TODO: Add topic to a category when dropped
// TODO: Remove topic for any other category
export const TOPIC_DROPPED = "TOPIC_DROPPED";
export interface TopicDroppedAction {
    type: typeof TOPIC_DROPPED;
    topic: Topic;
    category: Category;
}
// // TODO: Add topic onSubmit
export const TOPIC_ADDED = "TOPIC_ADDED";
export interface TopicAddedAction {
    type: typeof TOPIC_ADDED;
    topic: Topic;
}
// // TODO: Add Topic onPress
export const TOPIC_SELECTED = "TOPIC_SELECTED";
export interface TopicSelectedAction {
    type: typeof TOPIC_SELECTED;
    topic: Topic;
}
export type TopicActions = TopicSelectedAction | TopicDraggedAction | TopicDroppedAction | TopicAddedAction;

export const CATEGORY_ADDED = "CATEGORY_ADDED";
export type CATEGORY_ADDED = typeof CATEGORY_ADDED;
export interface CategoryAddedAction {
    type: CATEGORY_ADDED;
    category: Category;
}
export const TOPIC_TO_CATEGORY = "TOPIC_TO_CATEGORY";
export type TOPIC_TO_CATEGORY = typeof TOPIC_TO_CATEGORY;
export interface TopicToCategoryAction {
    type: TOPIC_TO_CATEGORY;
    category: Category;
    topic: Topic;
}
export type CategoryActions = CategoryAddedAction | TopicToCategoryAction;


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
    length: number;
}
export interface CategoriesState {
    categories: Array<Category>;
    // Used as workaround for updating all the categories
    tokenUpdate: string;
}


export type ApplicationState = ReturnType<typeof rootReducer>
