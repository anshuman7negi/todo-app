import './todo.css'
import Header from "./Header";
import TodoLogic from './TodoLogic';

function TodoApp() {

    return(
        <div className="topContainer">
            <Header/>
            <TodoLogic/>
        </div>
    )
}

export default TodoApp;