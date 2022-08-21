import { TASK_ACTION_TYPES } from './task.types';

const initialState = {
    tasks: [],
    backlog: [],
    inProgress: [],
    testing: [],
    done: [],
    error: null
};

export const taskReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case TASK_ACTION_TYPES.GET_TASK:
            return {
                ...state,
                tasks: payload.tasks,
                backlog: payload.backlog,
                inProgress: payload.inProgress,
                testing: payload.testing,
                done: payload.done
            };
        case TASK_ACTION_TYPES.GET_TASK_FAILED:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            return state;
    }
};
