// const initState = [
//   { id: 1, name: 'Learn yoga', completed: false, priority: 'Medium' },
//   { id: 2, name: 'Learn React', completed: true, priority: 'High' },
//   { id: 3, name: 'Learn math', completed: false, priority: 'Low' }
// ]


// export const todoListReducer = (state=initState, action) => {
//   // Action la mot object co dang
//   /**
//    * {
//    *  type: 'todoList/addTodo',
//    *  payload: { id: 5, name: 'SLeep', completed: false, priority: 'High' }
//    * }
//    */
//   switch(action.type) {
//     case 'todoList/addTodo':
//       return [...state, action.payload]

//     case 'todoList/toggleTodoStatus':
//       return state.map(todo => todo.id === action.payload
//         ? {...todo, completed: !todo.completed}
//         : {...todo})
//     default:
//       return state
//   }
// }
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const todosSlice = createSlice({
  name: 'todoList',
  initialState: { status: 'idle', todos: [
    // { id: 1, name: 'Sleep', completed: false, priority: 'Hight' }
  ] }, // [] => { status: '', todos: [] }
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    },// => action creator
    toggleTodoStatus: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    }
  },
  // extra reducer để xử lý bất đồng bộ
  extraReducers: builder => {
    builder.addCase(fetchTodosThunk.pending, (state, action) => {
      state.status = 'loading'
    }).addCase(fetchTodosThunk.fulfilled, (state, action) => {
      // console.log({action})
      console.log(state)
      state.todos = action.payload
      state.status = 'idle'
    })
    .addCase(addTodoThunk.fulfilled, (state, action) => {
      state.todos.push(action.payload)
    })
    .addCase(updateTodoThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      const updatedTodo = state.todos.find(todo => todo.id === action.payload.id)
      updatedTodo.completed = action.payload.completed
    })
  }
})

export const fetchTodosThunk = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('api/todos')
  const data = await res.json()
  // console.log('data', {data})
  return data.todos
})
/**
 * => todos/fetchTodos/pending
 * => todos/fetchTodos/fullfilled
 * => todos/fetchTodos/rejected
 */

export const addTodoThunk = createAsyncThunk('todos/addTodo', async (todo) => {
  const res = await fetch('api/todos', {
    method: 'POST',
    body: JSON.stringify(todo)
  })
  const data = await res.json()
  // console.log({data})
  return data.todos
})

export const updateTodoThunk = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const res = await fetch('api/updateTodo', {
    method: 'POST',
    body: JSON.stringify(updatedTodo)
  })
  const data = await res.json()
  // console.log(data)
  return data.todos
})

// thunk action (function) va thunk action creator () => { return thunk action }
// export function addTodo(todo) { // thunk function - thunk action
//   return function addTodoThunk(dispatch, getState) {
//     console.log('addTodoThunk', getState())
//     console.log({todo})
//     //custom
//     todo.name = 'test updated'

//     // bây giờ mới dispatch 1 action thật
//     dispatch(todosSlice.actions.addTodo(todo))
//     console.log('addTodoThunk after', getState())
//   }
// }