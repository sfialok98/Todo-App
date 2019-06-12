import React from 'react'
import styles from "./header.module.css";
import TodoInput from '../TodoInput/todoinput.component';

interface stateInterface {
    dropDownOpen: boolean;
}
interface propInterface {
    addTodo: (heading: string,body: string) => void;
}

class Header extends React.Component<propInterface,stateInterface>{
    state: stateInterface = {
        dropDownOpen: false,
    }

    addTodoClicked: () => void = () => {
        this.setState(function(state: stateInterface){
            return {
                dropDownOpen: !state.dropDownOpen
            };
        });
    }

    addTodo = (heading: string, body: string): void => {
        this.addTodoClicked();
        this.props.addTodo(heading, body);
    }


    render() {
        var dropDownClass: string = styles.dropDown;
        if (this.state.dropDownOpen)
            dropDownClass += " " + styles.dropDownOpen;
        return (
            <div className={styles.headerContainer}>
                <div className = {styles.container}>
                    <div>List of todos...</div>
                    <button className = "btn btn-success" onClick={this.addTodoClicked}>{this.state.dropDownOpen?"Close":"Add Todo"}</button>
                </div>
                <div className = {dropDownClass}>
                    <TodoInput btnName = {"Add Todo!"}heading="" body="" addTodo={this.addTodo}/>
                </div>
            </div>
        );

    }
}

export default Header;