const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'This task is in the backlog' },
        'task-2': { id: 'task-2', content: 'This task is also in the backlog' },
        'task-3': { id: 'task-3', content: 'This task is in progress' },
        'task-4': { id: 'task-4', content: 'This task is in testing' },
        'task-5': { id: 'task-5', content: 'This task is complete' },
        'task-6': { id: 'task-6', content: 'This task is complete' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Backlog',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'QA',
            taskIds: []
        },
        'column-4': {
            id: 'column-4',
            title: 'Done',
            taskIds: ['task-6']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
};

export default initialData;
