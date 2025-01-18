import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get(API_URL);
    return response.data.map((task) => ({
        id: task.id.toString(),
        title: task.title,
        description: 'Sample description',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        status: task.completed ? 'done' : 'todo',
    }));
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await axios.post(API_URL, task);
    return {
        ...response.data,
        id: response.data.id.toString()
    };
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
    return task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            const task = state.find((task) => task.id === id);
            if (task) {
                task.status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                return state.filter((task) => task.id !== action.payload);
            });
    },
});

export const { updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;

