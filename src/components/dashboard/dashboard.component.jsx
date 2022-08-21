import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Board from '../board/board.component';

import { getTasks, saveTask } from '../../store/task/task.action';

import { DashboardContainer } from './dashboard.styles';

const Dashboard = ({
    getTasks,
    saveTask,
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
        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            // create a new tasks id array with same content as the last array
            const newTaskIds = Array.from(start.taskIds);

            // move the task id from it's old index to new index in the array
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const updatedColumn = {
                ...start,
                taskIds: newTaskIds
            };

            console.log(updatedColumn);
            // here we can save the data or update the state
            saveTask(updatedColumn);
        }

        // moving from one board to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(source.index, 1);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        saveTask(newStart);
        saveTask(newFinish);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
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
