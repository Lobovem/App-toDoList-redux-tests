import { useDispatch } from 'react-redux';
import s from './style.module.scss';

export function Todo({ myTask }) {
  const dispatch = useDispatch();

  return (
    <div className={s.todo__wrap}>
      <div
        role="button"
        className={s.todo__btnEdit}
        onClick={() => {
          dispatch({ type: 'SET_CHANGE_EDIT_MODE', payload: myTask });
        }}
      >
        Edit
      </div>

      {myTask.isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'SET_CHANGE_EDIT_MODE', payload: myTask });
          }}
        >
          <button className={s.todo__btnApply}>Apply</button>

          <input
            className={s.todo__taskEdit}
            type="text"
            value={myTask.task}
            onChange={(e) => dispatch({ type: 'EDIT_TODO', payload: { myTask, todoTitle: e.target.value } })}
          />
        </form>
      )}

      {!myTask.isEditing && (
        <div className={myTask.complete ? `${s.todo__task} ${s.todo__task_complete}` : s.todo__task}>
          <input
            className={s.todo__checkbox}
            type="checkbox"
            name=""
            id=""
            defaultChecked={myTask.complete}
            onClick={() => dispatch({ type: 'HANDLE_CHECK', payload: myTask })}
          />
          {myTask.task}
        </div>
      )}

      <div role="button" className={s.todo__del} onClick={() => dispatch({ type: 'DELETE_TODO', payload: myTask })}>
        X
      </div>
    </div>
  );
}
