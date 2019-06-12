import * as React from "react";
import Header from "../Header/header.component";
import Todo from "../Todo/todo.component";
import styles from "./todos.module.css";
interface ITodoInterface {
  heading: string;
  body: string;
  id: string;
}

interface ITodoState {
  todos: ITodoInterface[];
}

class Todos extends React.Component<{},ITodoState> {
  
  state: ITodoState = {
    todos: []
  }

  latestId : number= 0;

  addTodo: (heading: string, body: string) => void = (heading, body) => {
    this.setState((state: ITodoState) => {
      let id: number = ++this.latestId;
      let newTodo: ITodoInterface = {
        heading,
        body,
        id: id.toString()
      };
      let newTodos: ITodoInterface[] = [newTodo, ...state.todos];
      return {
        todos: newTodos
      };
    });
  };

  deleteTodo = (id: string): void => {
    const newPosts: ITodoInterface[] = this.state.todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({
      todos: newPosts
    });
  };

  editTodo = (heading: string,body: string, id: string ) : void => {
    let newTodos:ITodoInterface[] = this.state.todos.map((todo) => {
      if(todo.id !== id)
        return todo;
      else{
        let newTodo = {
          id: id,
          heading: heading,
          body: body
        }
        return newTodo;
      }
    });
    this.setState((state) => {
      return {
        todos: newTodos
      };
    });
  }

  getTodos = () => {
    console.log(this.state.todos.length);
    return this.state.todos.map((todo: ITodoInterface) => {
      return (
        <div className={styles.todo} key={todo.id}>
          <Todo  todo={todo} deleteTodo={this.deleteTodo} editTodo={this.editTodo}/>
        </div>
      );
    });
  };

  public render() {
    return (
      <div className={styles.container}>
        <Header addTodo={this.addTodo} />
        {this.getTodos()}
      </div>
    );
  }
}

export default Todos;
