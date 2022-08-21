import { TASK_ACTION_TYPES } from './task.types';

// This would typically be returned from an api / database.
// Also, we'd typically make an action call defined in a separate folder to retrieve this
import initialData from '../../task-initial-data';

export const getTasks = () => async (dispatch) => {
    // write an api call to get task data from a database

    try {
        dispatch({
            type: TASK_ACTION_TYPES.GET_TASK,
            payload: initialData
        });
    } catch (error) {
        dispatch({
            type: TASK_ACTION_TYPES.GET_TASK_FAILED,
            payload: error
        });
    }
};

export const saveTask = (newTaskState) => async (dispatch) => {
    // create api call to save data in db and will return updated data
    console.log('running save task method');
    try {
        console.log('logging newTaskState');
        console.log(newTaskState);
        console.log('saving newTaskState');

        dispatch({ type: TASK_ACTION_TYPES.MOVE_TASK, payload: newTaskState });
    } catch (error) {
        dispatch({
            type: TASK_ACTION_TYPES.MOVE_TASK_FAILED,
            payload: error
        });
    }
};
