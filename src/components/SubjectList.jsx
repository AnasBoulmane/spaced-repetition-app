import React from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import Header from './Header';

import styles from './SubjectList.module.scss';

function SubjectList({ subjects, onSubjectSelect }) {
  const handleClick = (_id) => () => onSubjectSelect?.(_id);

  return (
    <div className={styles['subject-list']}>
      <Header title="Subjects for Today" />

      {subjects.map(({ _id, name, isComplete }) => (
        <button key={_id} className={cn(styles['subject-item'], { complete: isComplete })} onClick={handleClick(_id)}>
          {name}
        </button>
      ))}
    </div>
  );
}

SubjectList.propTypes = {
  subjects: PropTypes.array.isRequired,
  onSubjectSelect: PropTypes.func,
};

export default SubjectList;
