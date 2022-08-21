import './task.styles.css';
import { useDrag } from 'react-dnd';

const Task = ({ content, boardCardId, addTaskToBoard, boardToDropTask }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'task',
        item: { boardCardId },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            //console.log(item, dropResult);

            //addTaskToBoard(item);
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div
            ref={dragRef}
            draggable
            className={`task-container board-id-${boardCardId}`}
        >
            {content}
        </div>
    );
};

export default Task;
