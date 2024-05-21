import { createSelector } from "reselect"

export const todoListSelector = (state) => state.todoList.todos
export const searchTextSelector = (state) => state.filters.search
export const filterStatusSelector = (state) => state.filters.status
export const filterPrioritiesSelector = (state) => state.filters.priorities

export const matchedTodosSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  filterStatusSelector,
  filterPrioritiesSelector,
  (todoList, searchText, status, priorities) => {
    return todoList.filter(todo => {
      if (status === 'All') {
        return priorities.length
        ? todo.name.toLowerCase().includes(searchText?.toLowerCase()) && priorities.includes(todo.priority)
        : todo.name.toLowerCase().includes(searchText?.toLowerCase())
      }
      return (
        todo.name.toLowerCase().includes(searchText?.toLowerCase()) &&
        (status === 'Completed' ? todo.completed : !todo.completed) &&
        (priorities.length ? priorities.includes(todo.priority) : true)
      )
    })
  }
)