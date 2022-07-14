import React from 'react';
import cn from 'classname';

import styles from './SubjectList.module.scss';

function SubjectList({ subjects, onSubjectSelect }) {
  const handleClick = (_id) => () => onSubjectSelect?.(_id);

  return (
    <div className={styles['subject-list']}>
      <h1>Subjects for Today</h1>

      {subjects.map(({ _id, name, isComplete }) => (
        <div key={_id} className={cn(styles['subject-item'], { complete: isComplete })} onClick={handleClick(_id)}>
          {name}
        </div>
      ))}
    </div>
  );
}

export default SubjectList;
