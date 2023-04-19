import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.scss';

export function Form() {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.todoListReduser.inputState);

  return (
    <div>
      <form
        className={s.todo__formWrap}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'ADD_TODO', payload: userInput });
          dispatch({ type: 'INPUT_CHANGE', payload: '' });
        }}
      >
        <input
          className={s.todo__input}
          type="text"
          placeholder="Please enter new task..."
          name="input"
          value={userInput}
          onChange={(e) => dispatch({ type: 'INPUT_CHANGE', payload: e.target.value })}
        />
        <button className={s.todo__add}>+</button>
      </form>

      <button className={s.todo__delAll} onClick={() => dispatch({ type: 'DELETE_ALL_COMPLETE_TODO' })}>
        Remove checked
      </button>
    </div>
  );
}
