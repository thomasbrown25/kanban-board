import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Board from '../board/board.component';

import { getTasks, saveTask } from '../../store/task/task.action';

import { DashboardContainer } from './dashboard.styles';

const Dashboard = ({
    getTasks,
    saveTask,
    task,
    task: { tasks, columns, columnOrder }
}) => {
    useEffect(() => {
        getTasks();
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // if no destination, then do nothing
        if (!destination) return;

        // checks to see if the user drops the item back to the original board
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        // re-order the tasks id array from the column / board
        const startColumn = columns[source.droppableId];
        const finishColumn = columns[destination.droppableId];

        // if we're only re-ordering the tasks in the same column
        if (startColumn === finishColumn) {
            // create a new tasks id array with same content as the last array
            const newTaskIds = Array.from(startColumn.taskIds);

            // move the task id from it's old index to new index in the array
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const updatedColumn = {
                ...startColumn,
                taskIds: newTaskIds
            };

            const newTaskState = {
                ...task,
                columns: {
                    ...task.columns,
                    [updatedColumn.id]: updatedColumn
                }
            };

            console.log(newTaskState);
            // here we can save the data or update the state
            saveTask(newTaskState);
            return;
        }

        // if we're moving item to another board
        // remove the task that we're dragging from the tasks array in the start column
        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStartColumn = {
            ...startColumn,
            taskIds: startTaskIds
        };

        // insert the draggable id / task at the destination in the finish column
        const finishTaskIds = Array.from(finishColumn.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinishColumn = {
            ...finishColumn,
            taskIds: finishTaskIds
        };

        const newTaskState = {
            ...task,
            columns: {
                ...task.columns,
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn
            }
        };

        saveTask(newTaskState);
    };

    return (
        <DragDropContext onDragEnd={(event) => handleDragEnd(event)}>
            <DashboardContainer>
                {columnOrder &&
                    columns &&
                    columnOrder.map((columnId) => {
                        const column = columns[columnId];
                        const filteredTasks =
                            column &&
                            column.taskIds.map((taskId) => tasks[taskId]);
                        if (column) {
                            return (
                                <Board
                                    key={column.id}
                                    column={column}
                                    tasks={filteredTasks}
                                />
                            );
                        }
                    })}
            </DashboardContainer>
        </DragDropContext>
    );
};

Dashboard.propTypes = {
    task: PropTypes.object.isRequired,
    getTasks: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    task: state.task
});

export default connect(mapStateToProps, { getTasks, saveTask })(Dashboard);
