import trash from './assets/trash.svg'
import edit from './assets/edit.svg'
import plus from './assets/plus.png'
import { useState } from 'react';



function TodoList({ todoArray, dispatch}) {



    const [editTask, setEditTask] = useState(null);
    const [editId, setEditId] = useState(null);

    function deleteData(id) {
        dispatch({type:'DELETE', payload:id})
    }

    function editData(id) {
        setEditId(id);
        const taskToEdit = todoArray.find((item) => item.id === id);
        setEditTask(taskToEdit.todoTask);
    }

    function editSubmit(id) {
        if (editTask) {
            dispatch({type:'UPDATE',payload:{editTask,id}})
        }
        setEditTask(null);
        setEditId(null);
    }


    return (
        <ul className="todoList">

            {todoArray.map((item) => (
                <li className={` ${editId === item.id ? 'editClick' : ''}`} key={item.id}>
                    <input
                        className={`${editId === item.id ? 'editClick' : ''}`}
                        type="text"
                        value={editId === item.id ? editTask : item.todoTask}
                        onChange={(e) => setEditTask(e.target.value)}
                    />
                    <img
                        className={`edit ${editId === item.id ? 'hidden' : ''}`}
                        src={edit} alt="Edit Icon"
                        onClick={() => { editData(item.id) }}
                    />
                    <img
                        className={`editSubmit ${editId === item.id ? '' : 'hidden'}`}
                        src={plus} alt="trash icon"
                        onClick={() => { editSubmit(item.id) }}
                    />
                    <img
                        className='trash'
                        src={trash} alt="trash icon"
                        onClick={() => { deleteData(item.id) }}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TodoList;
