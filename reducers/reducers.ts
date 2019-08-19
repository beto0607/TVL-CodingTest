import { TopicState, TOPIC_SELECTED, CategoriesState, TopicActions, CategoryActions, TOPIC_DROPPED, TOPIC_ADDED, TOPIC_TO_CATEGORY, TopicToCategoryAction, DragAndDropState, DragAndDropActions, DRAG, DROP, TOPIC_REMOVED_FROM_CATEGORY } from '../types/types';
import { combineReducers } from 'redux';
import uuid from 'uuid';
// Compares 2 topics ids
import { compareTopics } from '../utils/functions';

// INITIAL STATES

const initialTopicsState: TopicState = {
    topics: [
        {
            id: uuid.v1(),
            text: 'Points on exam',
        },
        {
            id: uuid.v1(),
            text: 'Group projects',
        },
        {
            id: uuid.v1(),
            text: 'Home assignments',
        },
        {
            id: uuid.v1(),
            text: 'Seminars',
        },
        {
            id: uuid.v1(),
            text: 'Exam preparation',
        },
        {
            id: uuid.v1(),
            text: 'Lectures',
        },
        {
            id: uuid.v1(),
            text: 'Guest lectures',
        },
        {
            id: uuid.v1(),
            text: 'Literature',
        }
    ],
    selectedTopic: null
}

export const topicReducer = (state: TopicState = initialTopicsState, action: TopicActions): TopicState => {
    const { type } = action;
    const { topics, selectedTopic } = state;
    switch (type) {
        case TOPIC_SELECTED:
            // If there is no selectedTopic or the current topic is different of the tapped one
            if (!selectedTopic || !compareTopics(selectedTopic, action.topic)) {
                return { ...state, selectedTopic: action.topic }
            }
            return { ...state, selectedTopic: null }
        case TOPIC_DROPPED:
            return {
                ...state,
                topics: topics.filter(topic => !compareTopics(topic, action.topic)),
                selectedTopic: compareTopics(selectedTopic, action.topic) ? null : selectedTopic
            };
        case TOPIC_ADDED:
            return { topics: [...topics, action.topic] };
        default:
            return state;
    }
}
const initialCategoriesState: CategoriesState = {
    categories: [
        {
            id: uuid.v1(),
            title: 'Did well?',
            topics: [],
            length: 0
        },
        {
            id: uuid.v1(),
            title: 'Did badly?',
            topics: [],
            length: 0
        },
        {
            id: uuid.v1(),
            title: 'Should start doing?',
            topics: [],
            length: 0
        },
        {
            id: uuid.v1(),
            title: 'Should stop doing?',
            topics: [],
            length: 0
        }
    ],
    tokenUpdate: ''
}

export const categoryReducer = (state: CategoriesState = initialCategoriesState, action: CategoryActions): CategoriesState => {
    const { type } = action;
    const { categories } = state;
    switch (type) {
        case TOPIC_REMOVED_FROM_CATEGORY:
            categories.forEach(category => {
                // Removed the topic for the others categories
                category.topics = category.topics.filter(each => !compareTopics(action.topic, each))
                category.length = category.topics.length;
            });
            return {
                ...state,
                categories,
                // Workaround for a bug. Because categorie's length never changes, the component(CategoriesWrapper) is never updated. 
                // This forces the update
                tokenUpdate: uuid.v1()
            };
        case TOPIC_TO_CATEGORY:
            // Destructuring
            const { topic, category: { id: toCategoryId } } = (action as TopicToCategoryAction);
            // Finds the category
            let cat = categories.find(category => category.id === toCategoryId)
            // Adds the topic
            cat.topics = [...cat.topics, topic];
            // Updates the length
            cat.length = cat.topics.length;
            return {
                ...state,
                categories,
                // Workaround for a bug. Because categorie's length never changes, the component(CategoriesWrapper) is never updated. 
                // This forces the update
                tokenUpdate: uuid.v1()
            };
        default:
            return state;
    }
}
const initialDragAndDropState: DragAndDropState = {
    y: 0,
    topic: null,
    dragging: false
}
export const dragAndDropReducer = (state: DragAndDropState = initialDragAndDropState, action: DragAndDropActions) => {
    const { type } = action;
    switch (type) {
        case DROP:
        case DRAG:
            const { y, topic } = action;
            return {
                ...state,
                dragging: type === DRAG,
                y,
                topic
            };
        default:
            return state;
    }
};
export const rootReducer = combineReducers({
    topicReducer,
    categoryReducer,
    dragAndDropReducer
})

