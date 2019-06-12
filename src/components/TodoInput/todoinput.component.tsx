import React, {Component} from "react";
import styles from "./todoinput.module.css";
interface stateInterface {
    heading: string;
    body: string;
}
interface propInterface {
    addTodo: (heading: string,body: string) => void;
    heading: string;
    body: string;
    btnName: string;
}
class TodoInput extends Component< propInterface, stateInterface> {

    state: stateInterface = {
        heading: this.props.heading,
        body: this.props.body,
    }
    

    handleHeadingChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        let value: string = target.value;
        this.setState({
            heading: value
        });
    }

    handleBodyChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        let value: string = target.value;
        this.setState({
            body: value
        });
    }

    handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        this.props.addTodo(this.state.heading, this.state.body);
        this.setState({
            heading: "", 
            body: ""
        });
    }

    componentDidUpdate(prevProps : propInterface, prevState: stateInterface): void{
        if(this.props !== prevProps){
            this.setState({
                heading: this.props.heading,
                body: this.props.body
            })
        }
    }
    render(): React.ReactNode{
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="InputHeading">Heading</label>
                    <input required type="text" value={this.state.heading} onChange={this.handleHeadingChange} className="form-control" id={styles.InputHeading}   placeholder="Enter Todo Heading"/>
                </div>
                <div className="form-group">
                    <label htmlFor="InputDescription">Description</label>
                    <input required type="text" value={this.state.body} onChange={this.handleBodyChange} className="form-control" id="InputDescription" placeholder="Enter Todo description"/>
                </div>
                <button type="submit" className="btn btn-success">{this.props.btnName}</button>
            </form>
        )
    }
}

export default TodoInput;