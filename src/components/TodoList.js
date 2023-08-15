import trash from './assets/trash.svg'
import edit from './assets/edit.svg'
import plus from './assets/plus.png'
import { useState } from 'react';



function TodoList({ todoArray, dispatch }) {



    const [editTask, setEditTask] = useState('');
    const [editId, setEditId] = useState(null);

    function deleteData(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function editData(id) {
        setEditId(id);
        const taskToEdit = todoArray.find((item) => item.id === id);
        setEditTask(taskToEdit.todoTask);
    }

    function editSubmit(id) {
        if (editTask) {
            dispatch({ type: 'UPDATE', payload: { editTask, id } })
        }
        setEditTask('');
        setEditId(null);
    }

    function handleVerify(id) {
        dispatch({ type: 'VERIFY', payload: {id} });
    }

    function handleClick(e, id) {
        if (e.key === 'Enter') {
            editSubmit(id)
        }
    }


    return (
        <ul className="todoList">

            {todoArray.map((item) => (
                <li className={` ${editId === item.id ? 'editClick' : ''}`} key={item.id}>
                    <input className='inputCheck'
                        type="checkbox"
                        checked={item.verified}
                        onChange={()=>{ handleVerify(item.id)}}
                    />
                    <input
                        className={`${editId === item.id ? 'editClick' : ''} ${item.verified && 'crossedText'} `}
                        type="text"
                        value={editId === item.id ? editTask : item.todoTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        onKeyDown={(e) => { handleClick(e, item.id) }}
                        readOnly={!editId || editId !== item.id}
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
