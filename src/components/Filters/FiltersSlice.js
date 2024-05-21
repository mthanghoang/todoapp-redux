// const initState = {
//   search: '',
//   status: 'All',
//   priorities: []
// }

// export const filtersReducer = (state=initState, action) => {
//   // Action la mot object co dang
//   /**
//    * {
//    *  type: 'todoList/addTodo',
//    *  payload: { id: 5, name: 'SLeep', completed: false, priority: 'High' }
//    * }
//    */
//   switch(action.type) {
//     case 'filters/searchFilterChange':
//       return {
//         ...state,
//         search: action.payload
//       }
//     case 'filters/statusFilterChange':
//       return {
//         ...state,
//         status: action.payload
//       }
//     case 'filters/prioritiesFilterChange':
//       return {
//         ...state,
//         priorities: action.payload
//       }
//     default:
//       return state
//   }
// }
import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    status: 'All',
    priorities: []
  },
  reducers: {
    searchFilterChange: (state, action) => {
      // co the viet code mutation (nhung thuc te hoat dong nhu code immutation)
      state.search = action.payload
    },  // no se tu tao action creator, return => { type: 'filters/searchFilterChange' }
    statusFilterChange: (state, action) => {
      state.status = action.payload
    },
    prioritiesFilterChange: (state, action) => {
      state.priorities = action.payload
    }
  }
})