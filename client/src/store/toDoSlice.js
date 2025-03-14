import { createSlice } from "@reduxjs/toolkit";

// Initial STate Object
const initialState = {
  nextId: 2,
  todos: [{ id: 1, name: "wake up" }],
  // Whether to show add or update
  toggleForm: true,
  todoUpdate: {},
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // add list item
    addTodo: (state, action) => {
      // spread operator that sends payload to array
      state.todos = [...state.todos, action.payload];
      // increase next id
      state.nextId += 1;
    },
    // clear list items
    clearTodos: (state) => {
      // sets empty array
      state.todos = [];
      state.nextId = 1;
    },
    // clear list items
    deleteTodo: (state, action) => {
      // filter returns array where payload does not match
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // edit list item
    editTodo: (state, action) => {
      state.toggleForm = !state.toggleForm;
      state.todoUpdate = { ...state.todoUpdate, ...action.payload };
    },
    // update edited list item
    updateTodo: (state, action) => {
      const updateTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      updateTodo.name = action.payload.name;
      state.toggleForm = !state.toggleForm;
    },
  },
});

// Export Reducers
export const { addTodo, clearTodos, deleteTodo, editTodo, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
