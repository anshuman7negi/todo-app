import { useReducer } from "react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

function TodoLogic() {

    function arrayReducer(todoArray, action) {
        switch (action.type) {
            case 'ADD':
                return [
                    ...todoArray, {
                        ...action.payload,
                        id: todoArray.length + 1
                    }]
            case 'UPDATE':
                return todoArray.map((item) =>
                    item.id === action.payload.id ? { ...item, todoTask: action.payload.editTask } : item
                )

            case 'DELETE':
                return todoArray.filter((element) => element.id !== action.payload);
            default:
                return todoArray;
        }
    }

    const [todoArray, dispatch] = useReducer(arrayReducer, [])


    return (
        <div className="todoContaniner">
            <InputTodo dispatch={dispatch} />
            <TodoList todoArray={todoArray} dispatch={dispatch} />
        </div>
    )
}

export default TodoLogic;