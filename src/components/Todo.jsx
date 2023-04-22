import { useDispatch } from 'react-redux';
import s from './style.module.scss';
import { delete_todo, edit_todo, handle_check, set_change_edit_mode } from '../store/reducer';

export function Todo({ myTask }) {
  const dispatch = useDispatch();

  return (
    <div className={s.todo__wrap}>
      <div
        role="button"
        className={s.todo__btnEdit}
        onClick={() => {
          dispatch(set_change_edit_mode(myTask));
        }}
      >
        Edit
      </div>

      {myTask.isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(set_change_edit_mode(myTask));
          }}
        >
          <button className={s.todo__btnApply}>Apply</button>

          <input
            className={s.todo__taskEdit}
            aria-label="Editing"
            type="text"
            value={myTask.task}
            onChange={(e) => dispatch(edit_todo({ myTask, todoTitle: e.target.value }))}
          />
        </form>
      )}

      {!myTask.isEditing && (
        <div className={myTask.complete ? `${s.todo__task} ${s.todo__task_complete}` : s.todo__task}>
          <input className={s.todo__checkbox} type="checkbox" name="" id="" defaultChecked={myTask.complete} onClick={() => dispatch(handle_check(myTask))} />
          {myTask.task}
        </div>
      )}

      <div role="button" className={s.todo__del} onClick={() => dispatch(delete_todo(myTask))}>
        X
      </div>
    </div>
  );
}
