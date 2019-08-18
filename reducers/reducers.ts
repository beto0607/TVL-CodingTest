import { TopicState, TOPIC_SELECTED, CategoriesState, TopicActions, CategoryActions, CATEGORY_ADDED, TOPIC_DRAGGED, TOPIC_DROPPED, TOPIC_ADDED } from '../types/types';
import { combineReducers } from 'redux';
import uuid from 'uuid';

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
        case TOPIC_DRAGGED:
            if (selectedTopic) { selectedTopic.selected = false }
            action.topic.selected = true;
            return { ...state, selectedTopic: action.topic };
        case TOPIC_DROPPED:
            selectedTopic.selected = false;
            return { ...state, selectedTopic: null };
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
            topics: []
        },
        {
            id: uuid.v1(),
            title: 'Did badly?',
            topics: []
        },
        {
            id: uuid.v1(),
            title: 'Should start doing?',
            topics: []
        },
        {
            id: uuid.v1(),
            title: 'Should stop doing?',
            topics: []
        }
    ]
}

export const categoryReducer = (state: CategoriesState = initialCategoriesState, action: CategoryActions) => {
    const { type } = action;
    switch (type) {
        case CATEGORY_ADDED:
            return {
                ...state,
                categories: [...state.categories, action.category]
            }
        default:
            return state;
    }
}


export const rootReducer = combineReducers({
    topicReducer,
    categoryReducer
})

