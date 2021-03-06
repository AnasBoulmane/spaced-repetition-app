import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import Header from 'components/Header';

import styles from './SubjectList.module.scss';

function SubjectList({ subjects, onSubjectSelect }) {
  const handleClick = (_id) => () => onSubjectSelect?.(_id);

  return (
    <div className={styles['subject-list']}>
      <Header title="Subjects list" />

      {subjects?.length && <span className="is-sr-only">list of {subjects.length} subjects</span>}
      <div className={styles['subject-item-container']}>
        {subjects.map(({ _id, name, isComplete }) => (
          <button key={_id} className={cn(styles['subject-item'], { complete: isComplete })} onClick={handleClick(_id)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

SubjectList.propTypes = {
  subjects: PropTypes.array.isRequired,
  onSubjectSelect: PropTypes.func,
};

export default SubjectList;
