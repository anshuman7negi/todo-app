import plus from './assets/plus.png'
import React, {  useRef} from 'react';

function InputTodo({dispatch}) {

    const inputRef = useRef(null);

    function addData() {
        if (inputRef.current.value) {
            let data = {
                todoTask: inputRef.current.value,
                verified: false
            };
            dispatch({ type: 'ADD', payload: data });
            inputRef.current.value = ''; 
        }
    }


    return(
        <div className="inputContainer">
            <input type="text" ref={inputRef} placeholder="Add todo..." />
            <img src={plus} alt=""  onClick={addData} />
        </div>
    )
}

export default InputTodo;