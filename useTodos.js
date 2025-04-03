    // TODO: Create a custom hook called useTodos.
    // GOAL: Reduce component complexity by encapsulating todo logic.
    // useTodos should include:n handleDeleteTodo, handleToggleTodo, handleNewTodo, initialState, init
    // EXAMPLE:
    // const { todos, handleDeleteTodo, handleToggleTodo, handleNewTodo } = useTodos();
    //----------------------------------------------------------------------------

import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

const initialState = []
const init = () => {
    return JSON.parse( localStorage.getItem('todos') || [] )
}
export const useTodos = () => {
    const [ todos, dispatchTodo] = useReducer( todoReducer, initialState, init )
    
    //localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ))
    }, [todos])
        
    const handleNewTodo = ( newTodo ) => {
        const action = {
            type: '[TODO] Add TODO',
            payload: newTodo
        }
        dispatchTodo(action)
    }
    const handleDeleteTodo = ( id ) => {
        dispatchTodo({
            type: '[TODO] Delete TODO',
            payload: id
        })
    }
    const handleToggleTodo = ( id ) => {
        dispatchTodo({
            type: '[TODO] Toggle TODO',
            payload: id
        })
    }

  return {
    todos,
    todosCount:  todos.length,
    pendingTodosCount:  todos.filter((x) => !x.done).length ,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  }
}
