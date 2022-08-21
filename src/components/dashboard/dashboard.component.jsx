import React, { useState, useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDrop } from 'react-dnd';

import BoardCard from '../board-card/board-card.component';
import Task from '../task/task.component';

import './dashboard.styles.css';

// I'm using this to identify which board-card the task belongs to
const boardCardIds = {
    backlog: 1,
    inProgress: 2,
    testing: 3,
    done: 4
};

// This would typically be returned from an api / database.
// Also, we'd typically make an action call defined in a separate folder to retrieve this
const taskData = [
    { id: 1, boardCardId: 1, content: 'This task is in the backlog' },
    { id: 2, boardCardId: 1, content: 'This task is also in the backlog' },
    { id: 2, boardCardId: 1, content: 'This task is in the backlog as well' },
    { id: 3, boardCardId: 2, content: 'This task is in progress' },
    { id: 4, boardCardId: 3, content: 'This task is in QA' },
    { id: 5, boardCardId: 4, content: 'This task is complete' }
];

const Dashboard = () => {
    const [backlog, setBacklog] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [testing, setTesting] = useState([]);
    const [done, setDone] = useState([]);
    const [mapData, setMapData] = useState(new Map());
    const [boardToDropTask, setBoardToDropTask] = useState(0);

    const fillTaskData = () => {
        let backlogData = [];
        let inProgressData = [];
        let testingData = [];
        let doneData = [];

        mapData &&
            mapData.forEach((item) => {
                switch (item.boardCardId) {
                    case boardCardIds.backlog:
                        backlogData.push(item);
                        break;

                    case boardCardIds.inProgress:
                        inProgressData.push(item);
                        break;

                    case boardCardIds.testing:
                        testingData.push(item);
                        break;

                    case boardCardIds.done:
                        doneData.push(item);
                        break;

                    default:
                        break;
                }
            });

        setBacklog(backlogData);
        setInProgress(inProgressData);
        setTesting(testingData);
        setDone(doneData);
    };

    const fillMapWithData = (taskData) => {
        const tempMap = new Map();
        taskData.map((item, i) => {
            tempMap.set(i, item);
        });
        console.log(tempMap);
        setMapData(tempMap);
    };

    useEffect(() => {
        fillMapWithData(taskData);
    }, [taskData]);

    useEffect(() => {
        fillTaskData();
    }, [mapData]);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addTaskToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const addTaskToBoard = (item) => {
        // console.log(`board to drop task: ${boardToDropTask}`);
        console.log(item);
        // console.log(`adding task: ${taskId} to board: ${boardId}`);
    };

    const handleDragEnd = (e, boardId, taskId) => {
        e.preventDefault();
        if (boardToDropTask !== boardId) {
            console.log('boardId: ' + boardId);
            setBoardToDropTask(boardId);
            console.log(isOver, boardId);
        }
        // if (!isOver && boardToDropTask !== 0) {
        //     addTaskToBoard(taskId, boardId);
        // }
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

export default Dashboard;
