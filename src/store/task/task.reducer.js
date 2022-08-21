import { TASK_ACTION_TYPES } from './task.types';

const initialState = {
    tasks: [],
    columns: [],
    columnOrder: [],
    error: null
};

export const taskReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case TASK_ACTION_TYPES.GET_TASK:
            return {
                ...state,
                tasks: payload.tasks,
                columns: payload.columns,
                columnOrder: payload.columnOrder
            };

        case TASK_ACTION_TYPES.GET_TASK_FAILED:
            return {
                ...state,
                error: payload
            };

        case TASK_ACTION_TYPES.MOVE_TASK:
            return {
                ...state,
                tasks: payload.tasks,
                columns: payload.columns,
                columnOrder: payload.columnOrder
            };

        case TASK_ACTION_TYPES.MOVE_TASK_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
};
