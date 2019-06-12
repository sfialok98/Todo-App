import React from "react";
import styles from "./todo.module.css";
import TodoInput from "../TodoInput/todoinput.component";
interface ITodoInterface{
    heading: string;
    body: string;
    id: string;
}

interface IProps {
    todo: ITodoInterface;
    deleteTodo: (id: string) => void;
    editTodo: (heading:string, body: string,id: string) => void;
}

interface IState {
    desc: boolean;
    done: boolean;
    edit: boolean;
    deleted: boolean;
}
class Todo extends React.Component<IProps, IState> {

    state: IState = {
        desc: false,
        done: false,
        edit: false,
        deleted: false
    }
    timer: number= 0;
    showDesc = (e: React.SyntheticEvent): void => {
        e.stopPropagation();
        this.setState((state)=>{
            return {
                desc: !state.desc
            };
        });
    }

    deleteTodo = (e: React.SyntheticEvent): void => {
        e.stopPropagation();
        this.setState({
            deleted: true
        });
        this.timer = window.setTimeout(() => {
            this.props.deleteTodo(this.props.todo.id);
        }, 1500);
    }

    markAsDone = (e: React.SyntheticEvent): void => {
        e.stopPropagation();
        this.setState((state) => {
            return {
                done: !state.done
            };
        });
    }

    editTodoClicked = (e: React.SyntheticEvent): void => {
        e.stopPropagation();
        this.setState((state) => {
            return {
                edit: !state.edit
            };
        });
    }

    editTodo = (heading: string, body: string): void=> {
        this.props.editTodo(heading, body, this.props.todo.id);
        this.setState({
            edit: false
        });
    }

    stopDelete = (): void => {
        clearTimeout(this.timer);
        this.setState({
            deleted: false
        });
    }

    render() {
        var className: string=styles.container;
        var classNameBody: string = styles.body;
        var classNameHeading: string = styles.heading;
        var classNameDescBtn:string = "fas fa";
        if(this.state.desc){
            classNameBody += " " + styles.bodyOn;
            classNameDescBtn += "-minus-circle";
        }
        else
            classNameDescBtn += "-plus-circle";
        if(this.state.done)
            classNameHeading += " " + styles.done;
        var dropDownClass: string = styles.dropDown;
        if (this.state.edit)
             dropDownClass += " " + styles.dropDownOpen;
        return ( 
            (this.state.deleted)?(
                <div onClick={this.stopDelete} className={styles.undo}>Undo</div>
            ):
            (<>
                <div className={className}>
                    <div className = {classNameHeading} onClick={this.markAsDone}>
                            <h2 id = {styles.todoHeading} style = {{display: "inline"}} ><span onClick={this.deleteTodo}><i className="fas fa-trash-alt"></i></span>{this.props.todo.heading}</h2>
                            <i className={styles.edit+" fas fa-pencil-alt"} onClick={this.editTodoClicked}></i>
                            <i className={classNameDescBtn} onClick={this.showDesc}></i>
                    </div>
                    <h2 id = {styles.todoBody} className = {classNameBody}>{this.props.todo.body}</h2>
                </div>
                <div className = {dropDownClass}>
                    <TodoInput btnName = {"Edit Todo!"}heading={this.props.todo.heading} body={this.props.todo.body} addTodo={this.editTodo}/>
                </div>
            </>)
        );

    }
}

export default Todo;