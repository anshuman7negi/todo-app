import { useState } from 'react';
import PropTypes from 'prop-types';
import trash from './assets/trash.svg';
import edit from './assets/edit.svg';
import plus from './assets/plus.png';

function TodoList({ todoArray, dispatch }) {
  const [editTask, setEditTask] = useState('');
  const [editId, setEditId] = useState(null);

  function deleteData(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function editData(id) {
    setEditId(id);
    const taskToEdit = todoArray.find((item) => item.id === id);
    setEditTask(taskToEdit.todoTask);
  }

  function editSubmit(id) {
    if (editTask) {
      dispatch({ type: 'UPDATE', payload: { editTask, id } });
    }
    setEditTask('');
    setEditId(null);
  }

  function handleVerify(id) {
    dispatch({ type: 'VERIFY', payload: { id } });
  }

  function handleClick(e, id) {
    if (e.key === 'Enter') {
      editSubmit(id);
    }
  }

  return (
    <ul className="todoList">

      {todoArray.map((item) => (
        <li className={` ${editId === item.id ? 'editClick' : ''}`} key={item.id}>
          <input
            className="inputCheck"
            type="checkbox"
            checked={item.verified}
            onChange={() => { handleVerify(item.id); }}
          />
          <input
            className={`${editId === item.id ? 'editClick' : ''} ${item.verified && 'crossedText'} `}
            type="text"
            value={editId === item.id ? editTask : item.todoTask}
            onChange={(e) => setEditTask(e.target.value)}
            onKeyDown={(e) => { handleClick(e, item.id); }}
            readOnly={!editId || editId !== item.id}
          />
          <button type="button" className="listButton" onClick={() => { editData(item.id); }}>
            <img src={edit} alt="Edit Icon" style={{ width: '24px', height: '24px' }} />
          </button>

          <button type="button" className={`editSubmit ${editId === item.id ? 'listButton' : 'hidden'}`} onClick={() => { editSubmit(item.id); }}>
            <img src={plus} alt="Edit Icon" style={{ width: '24px', height: '24px' }} />
          </button>

          <button type="button" className="listButton" onClick={() => { deleteData(item.id); }}>
            <img src={trash} alt="Trash Icon" style={{ width: '24px', height: '24px' }} />
          </button>

        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      todoTask: PropTypes.string.isRequired,
      verified: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TodoList;
