import { Droppable } from 'react-beautiful-dnd';

import { BoardContainer, BoardTitle, BoardTaskList } from './board.styles';

import Task from '../task/task.component';

const Board = ({ column, tasks }) => {
    return (
        <BoardContainer>
            <BoardTitle>{column.title}</BoardTitle>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <BoardTaskList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks &&
                            tasks.map((task, index) => (
                                <Task
                                    id={task.id}
                                    key={task.id}
                                    task={task}
                                    index={index}
                                />
                            ))}
                        {provided.placeholder}
                    </BoardTaskList>
                )}
            </Droppable>
        </BoardContainer>
    );
};

export default Board;
