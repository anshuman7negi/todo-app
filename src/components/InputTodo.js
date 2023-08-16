import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import plus from './assets/plus.png';

function InputTodo({ dispatch }) {
  const inputRef = useRef(null);

  function addData() {
    if (inputRef.current.value) {
      const data = {
        todoTask: inputRef.current.value,
        verified: false,
      };
      dispatch({ type: 'ADD', payload: data });
      inputRef.current.value = '';
    }
  }

  function handleImgKeyPress(event) {
    if (event.key === 'Enter') {
      addData();
    }
  }

  return (
    <div className="inputContainer">
      <input type="text" ref={inputRef} placeholder="Add todo..." />
      <button
        className="imgButton"
        onClick={addData}
        onKeyDown={handleImgKeyPress}
        type="button"
      >
        <img src={plus} alt="" />
      </button>
    </div>
  );
}

InputTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default InputTodo;
