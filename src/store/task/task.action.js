import { TASK_ACTION_TYPES } from './task.types';

// This would typically be returned from an api / database.
// Also, we'd typically make an action call defined in a separate folder to retrieve this
import initialData from '../../task-initial-data';

export const getTasks = () => async (dispatch) => {
    // write an api call to get task data from a database
    console.log(initialData);

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

export const saveTask = (updatedColumn) => async (dispatch) => {
    // create api call to save data in db
    try {
        const newData = {
            ...initialData,
            columns: {
                [updatedColumn.id]: updatedColumn
            }
        };
        console.log(newData);

        dispatch({ type: TASK_ACTION_TYPES.MOVE_TASK, payload: newData });
    } catch (error) {
        dispatch({
            type: TASK_ACTION_TYPES.MOVE_TASK_FAILED,
            payload: error
        });
    }
};
