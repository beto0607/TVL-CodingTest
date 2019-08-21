import { rootReducer } from "../reducers/reducers";

// ACTIONS

// // TODO: Add topic to a category when dropped - Done in TOPIC_TO_CATEGORY
// // TODO: Remove topic from topic's pool - DONE
// TODO: Remove topic from any other category
export const TOPIC_DROPPED = "TOPIC_DROPPED";
export interface TopicDroppedAction {
    type: typeof TOPIC_DROPPED;
    topic: Topic;
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
export type TopicActions = TopicSelectedAction | TopicDroppedAction | TopicAddedAction;

// export const DRAG_TERMINATED = "DRAG_TERMINATED";
// export type DRAG_TERMINATED = typeof DRAG_TERMINATED;
// export interface DragTerminatedAction {
//     type: DRAG_TERMINATED;
//     y: number;
//     topic: Topic;
// }
export const TOPIC_TO_CATEGORY = "TOPIC_TO_CATEGORY";
export type TOPIC_TO_CATEGORY = typeof TOPIC_TO_CATEGORY;
export interface TopicToCategoryAction {
    type: TOPIC_TO_CATEGORY;
    category: Category;
    topic: Topic;
}
export const TOPIC_REMOVED_FROM_CATEGORY = "TOPIC_REMOVED_FROM_CATEGORY";
export type TOPIC_REMOVED_FROM_CATEGORY = typeof TOPIC_REMOVED_FROM_CATEGORY;
export interface TopicRemovedFromCategoryAction {
    type: TOPIC_REMOVED_FROM_CATEGORY;
    topic: Topic;
}
export type CategoryActions = TopicToCategoryAction | TopicRemovedFromCategoryAction;

export const DRAG = "DRAG";
export type DRAG = typeof DRAG;
export interface DragAction {
    type: typeof DRAG;
    x: number;
    y: number;
    topic: Topic;
}
export const DROP = "DROP";
export type DROP = typeof DROP;
export interface DropAction {
    type: typeof DROP;
    x: number;
    y: number;
    topic: Topic;
}
export type DragAndDropActions = DropAction | DragAction;

export type AppActions = CategoryActions | TopicActions | DragAndDropActions;
// TOPICS

export interface Topic {
    id: string;
    text: string;
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
// DRAG_AND_DROP
export interface DragAndDropState {
    y: number;
    x: number;
    topic: Topic;
    dragging: boolean;
}

export type ApplicationState = ReturnType<typeof rootReducer>
