import { useEffect, useReducer } from "react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

function TodoLogic() {

    function arrayReducer(todoArray, action) {
        switch (action.type) {
            case 'ADD':
                return [
                    ...todoArray, {
                        ...action.payload,
                        id: uuidv4()
                    }]
            case 'UPDATE':
                return todoArray.map((item) =>
                    item.id === action.payload.id ? { ...item, todoTask: action.payload.editTask } : item
                )

            case 'DELETE':
                return todoArray.filter((element) => element.id !== action.payload);

            case 'VERIFY':
                return todoArray.map((item) =>
                    item.id === action.payload.id ? { ...item, verified: !item.verified } : item
                )
            default:
                return todoArray;
        }
    }

    const [todoArray, dispatch] = useReducer(arrayReducer, [], () => {
        const storedTodoArray = localStorage.getItem('todoArray');
        return storedTodoArray ? JSON.parse(storedTodoArray) : []
    });

    useEffect(() => {
        localStorage.setItem('todoArray', JSON.stringify(todoArray));
    }, [todoArray]);


    return (
        <div className="todoContaniner">
            <InputTodo dispatch={dispatch} />
            <TodoList todoArray={todoArray} dispatch={dispatch} />
        </div>
    )
}

export default TodoLogic;