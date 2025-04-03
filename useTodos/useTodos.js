import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

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
