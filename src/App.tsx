import React from 'react';
import styles from "./App.module.css";
import Jumbotron from "./components/Jumbotron/jumbotron.component";
import Todos from "./components/Todos/todos.component"

const App: React.FC = () => {
  console.log(typeof styles)
  return (
      <div className={`${styles.App} container`}>
          <Jumbotron/>
          <Todos/>
      </div>
  );
}

export default App;
