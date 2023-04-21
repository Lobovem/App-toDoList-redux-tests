import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.scss';
import { add_todo, delete_all_complete_todo, input_change, userInputSelector } from '../store/reducer';

export function Form() {
  const dispatch = useDispatch();
  const userInput = useSelector(userInputSelector);

  return (
    <div>
      <form
        className={s.todo__formWrap}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(add_todo(userInput));
          dispatch(input_change(''));
        }}
      >
        <input
          className={s.todo__input}
          type="text"
          placeholder="Please enter new task..."
          name="input"
          value={userInput}
          onChange={(e) => dispatch(input_change(e.target.value))}
        />
        <button className={s.todo__add}>+</button>
      </form>

      <button className={s.todo__delAll} onClick={() => dispatch(delete_all_complete_todo())}>
        Remove checked
      </button>
    </div>
  );
}
