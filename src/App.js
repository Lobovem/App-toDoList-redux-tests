import { useEffect } from 'react';
import { Form } from './components/Form';
import { Todo } from './components/Todo';
import { useSelector } from 'react-redux';
import s from './components/style.module.scss';

function App() {
  const todoList = useSelector((state) => state.todoListReduser.todoListState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className={s.todo}>
      <h1 className={s.todo__title}>{`Count all tasks - ${todoList.length}`}</h1>

      <Form />
      {todoList.map((myTask) => {
        return <Todo key={myTask.id} myTask={myTask} />;
      })}
    </div>
  );
}

export default App;
