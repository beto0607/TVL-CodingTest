import { TopicState, TOPIC_SELECTED, CategoriesState, TopicActions, CategoryActions, CATEGORY_ADDED, TOPIC_DRAGGED, TOPIC_DROPPED, TOPIC_ADDED, TOPIC_TO_CATEGORY, TopicToCategoryAction } from '../types/types';
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
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Group projects',
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Home assignments',
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Seminars',
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Exam preparation',
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Lectures',
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Guest lectures',
            selected: false
        },
        {
            id: uuid.v1(),
            text: 'Literature',
            selected: false
        }
    ],
    selectedTopic: null
}

export const topicReducer = (state: TopicState = initialTopicsState, action: TopicActions) => {
    const { type } = action;
    const { topics, selectedTopic } = state;
    switch (type) {
        case TOPIC_SELECTED:
            // If there is no selectedTopic or the current topic is different of the tapped one
            if (!selectedTopic || !compareTopics(selectedTopic, action.topic)) {
                return { ...state, selectedTopic: action.topic }
            }
            selectedTopic.selected = false;
            return { ...state, selectedTopic: null }
        case TOPIC_DRAGGED:
            if (selectedTopic) { selectedTopic.selected = false }
            return { ...state, selectedTopic: action.topic };
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
        case CATEGORY_ADDED:
            return { ...state, categories: [...categories, action.category] };
        case TOPIC_TO_CATEGORY:
            // Destructuring
            const { topic, topic: { id }, category: { id: toCategoryId } } = (action as TopicToCategoryAction);
            categories.forEach(category => {
                // Removed the topic for the others categories
                category.topics = category.topics.filter(topic => topic.id !== id)
                // Adds the topic in the correct category
                if (category.id === toCategoryId) {
                    category.topics = [...category.topics, topic];
                }
                // Updates the length
                category.length = category.topics.length;
            });
            return {
                ...state,
                categories,
                // Solution to a bug. Because categories never changes, the component(CategoriesWrapper) is never updated. 
                // This forces the update
                tokenUpdate: uuid.v1()
            };
        default:
            return state;
    }
}
export const rootReducer = combineReducers({
    topicReducer,
    categoryReducer
})

