import { Draggable } from 'react-beautiful-dnd';

import { TaskContainer } from './task.styles';

const Task = ({ id, task, index }) => {
    return (
        <Draggable draggableId={id} index={index} type='TASK'>
            {(provided) => (
                <TaskContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {task.content}
                </TaskContainer>
            )}
        </Draggable>
    );
};

export default Task;
