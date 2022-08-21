import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useDrop } from 'react-dnd';

import Task from '../task/task.component';

import { getTasks, moveTask } from '../../store/task/task.action';

import './dashboard.styles.css';

// I'm using this to identify which board-card the task belongs to
const boardCardIds = {
    backlog: 1,
    inProgress: 2,
    testing: 3,
    done: 4
};

const Dashboard = ({
    getTasks,
    moveTask,
    task: { backlog, inProgress, testing, done }
}) => {
    const [boardToDropTask, setBoardToDropTask] = useState(0);

    useEffect(() => {
        getTasks();
    }, []);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'task',
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            addTaskToBoard(didDrop);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const addTaskToBoard = (didDrop) => {
        console.log(`board to drop task: ${boardToDropTask}`);
        console.log(didDrop);
    };

    const handleDragEnd = (e, boardId, taskId) => {
        e.preventDefault();
        if (boardToDropTask !== boardId) {
            console.log('boardId: ' + boardId);
            setBoardToDropTask(boardId);
            console.log(isOver, boardId);
        }
    };

    return (
        <Container>
            <Row>
                {/* In the future, I could make the board-card-container element into a functional component and redirect the ref to make the drag and drop work */}
                <div className='board-card-container col-md-3' ref={dropRef}>
                    <h2 className='board-card-title'>Backlog</h2>
                    <div
                        className={'board-card'}
                        onDragOver={(e) =>
                            handleDragEnd(e, boardCardIds.backlog)
                        }
                    >
                        {backlog.map((task, i) => {
                            return (
                                <Task
                                    boardToDropTask={boardToDropTask}
                                    addTaskToBoard={addTaskToBoard}
                                    key={i}
                                    boardCardId={task.boardCardId}
                                    content={task.content}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className='board-card-container col-md-3' ref={dropRef}>
                    <h2 className='board-card-title'>In Progress</h2>
                    <div
                        className={'board-card'}
                        onDragOver={(e) =>
                            handleDragEnd(e, boardCardIds.inProgress)
                        }
                    >
                        {inProgress.map((task, i) => {
                            return (
                                <Task
                                    boardToDropTask={boardToDropTask}
                                    addTaskToBoard={addTaskToBoard}
                                    key={i}
                                    boardCardId={task.boardCardId}
                                    content={task.content}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className='board-card-container col-md-3' ref={dropRef}>
                    <h2 className='board-card-title'>QA</h2>
                    <div
                        className={'board-card'}
                        onDragOver={(e) =>
                            handleDragEnd(e, boardCardIds.testing)
                        }
                    >
                        {testing.map((task, i) => {
                            return (
                                <Task
                                    boardToDropTask={boardToDropTask}
                                    addTaskToBoard={addTaskToBoard}
                                    key={i}
                                    boardCardId={task.boardCardId}
                                    content={task.content}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className='board-card-container col-md-3' ref={dropRef}>
                    <h2 className='board-card-title'>Done</h2>
                    <div
                        className={'board-card'}
                        onDragOver={(e) => handleDragEnd(e, boardCardIds.done)}
                    >
                        {done.map((task, i) => {
                            return (
                                <Task
                                    boardToDropTask={boardToDropTask}
                                    addTaskToBoard={addTaskToBoard}
                                    key={i}
                                    boardCardId={task.boardCardId}
                                    content={task.content}
                                />
                            );
                        })}
                    </div>
                </div>
            </Row>
        </Container>
    );
};

Dashboard.propTypes = {
    task: PropTypes.object.isRequired,
    getTasks: PropTypes.func.isRequired,
    moveTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    task: state.task
});

export default connect(mapStateToProps, { getTasks, moveTask })(Dashboard);
