import * as React from "react";
import * as styles from "./jumbotron.module.css";
const Jumbotron: React.FC = ()=>{
    return (
        <div className={`${styles.jumbotron} jumbotron`}>
            <h1 className="display-4">My Todo App!</h1>
            <p className="lead">This is a simple todo app in which you can add todos, mark them done or delete them.</p>
        </div>
    );
}

export default Jumbotron;