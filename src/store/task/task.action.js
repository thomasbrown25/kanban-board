import { TASK_ACTION_TYPES } from './task.types';

// This would typically be returned from an api / database.
// Also, we'd typically make an action call defined in a separate folder to retrieve this
import taskData from '../../task-data.json';

const boardCardIds = {
    backlog: 1,
    inProgress: 2,
    testing: 3,
    done: 4
};

export const getTasks = () => async (dispatch) => {
    // write an api call to get task data from a database
    console.log(taskData);

    const { backlog, inProgress, testing, done } = filterData(taskData);

    try {
        dispatch({
            type: TASK_ACTION_TYPES.GET_TASK,
            payload: { tasks: taskData, backlog, inProgress, testing, done }
        });
    } catch (error) {
        dispatch({
            type: TASK_ACTION_TYPES.GET_TASK_FAILED,
            payload: error
        });
    }
};

// here I'd send an api call to update a signle task with a updated boardId, whichever board the task is moved to
export const moveTask = (id, boardId) => async (dispatch) => {
    try {
        let updatedItem = {};
        let movingIndex = -1;

        taskData &&
            taskData.map((item, i) => {
                if (item.id === id) {
                    item.boardCardId = boardId;
                    movingIndex = i;
                    updatedItem = item;
                }
            });

        const newData = taskData.splice(movingIndex, 1, updatedItem);
        newData = filterData(newData);
        console.log('move task completed, new data below');
        console.log(newData);

        dispatch({ type: TASK_ACTION_TYPES.MOVE_TASK, payload: newData });
    } catch (error) {
        dispatch({
            type: TASK_ACTION_TYPES.MOVE_TASK_FAILED,
            payload: error
        });
    }
};

// This filtering of data would be done in the api. Rather have the server do this than the client.
const filterData = (data) => {
    let backlog = [];
    let inProgress = [];
    let testing = [];
    let done = [];

    data &&
        data.map((item) => {
            switch (item.boardCardId) {
                case boardCardIds.backlog:
                    backlog.push(item);
                    break;

                case boardCardIds.inProgress:
                    inProgress.push(item);
                    break;

                case boardCardIds.testing:
                    testing.push(item);
                    break;

                case boardCardIds.done:
                    done.push(item);
                    break;

                default:
                    break;
            }
        });
    return { backlog, inProgress, testing, done };
};
