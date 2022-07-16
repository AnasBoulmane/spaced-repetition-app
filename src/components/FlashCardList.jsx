import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import QuizCard from './QuizCard';

import styles from './FlashCardList.module.scss';
import './prisma.css';

function FlashCardList({ subject, questions, onBack2Subjects }) {
  const [selected, setSelected] = useState();
  const [currentQt, setCurrentQt] = useState(0);
  const [isBackDisplay, setIsBackDisplay] = useState(false);
  const { question, options, refs } = questions[currentQt] || {};
  const [score, setScore] = useState(0);
  const [isScoreDisplayed, setIsScoreDisplayed] = useState(false);

  const correctOption = options.findIndex((opt) => /\[(x)\] /.test(opt));

  const handleOptionSelect = setSelected;
  const handleBackClick = isScoreDisplayed ? null : () => (currentQt ? setIsScoreDisplayed(true) : onBack2Subjects());
  const handleSubmit = () => {
    if (isBackDisplay) {
      if (selected === correctOption) setScore(score + 1);
      setCurrentQt(currentQt + 1);
      setIsBackDisplay(false);
      setSelected(null);
    } else if (selected !== null) {
      setIsBackDisplay(true);
    } else {
      alert('please select an option');
    }
  };

  return (
    <div>
      <Header title={subject.name} onBackClick={handleBackClick} />

      {(isScoreDisplayed || !question) && (
        <>
          <div className={styles['quiz-score']}>
            <span className="is-sr-only">your score on {subject.name} is:</span>
            {Math.round((score / (currentQt || 1)) * 100)} <span>/100</span>
          </div>

          <button className={styles['question-submit']} onClick={onBack2Subjects}>
            back to subjects
          </button>
        </>
      )}

      {!isScoreDisplayed && question && (
        <QuizCard
          {...{ question, options, selected, correctOption, refs, isBackDisplay }}
          onOptionSelect={handleOptionSelect}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

FlashCardList.propTypes = {
  subject: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  onBack2Subjects: PropTypes.func.isRequired,
};

export default FlashCardList;
