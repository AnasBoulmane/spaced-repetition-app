import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Header from 'components/Header';
import QuizCard from 'components/QuizCard';
import shuffleArray from 'libs/array-shuffle';

import styles from './FlashCardList.module.scss';
import './prisma.css';

function FlashCardList({ subject, questions, onBack2Subjects }) {
  const [selected, setSelected] = useState(null);
  const [currentQt, setCurrentQt] = useState(0);
  const [isBackDisplay, setIsBackDisplay] = useState(false);
  const { question, options: originalOptions, refs } = questions[currentQt] || {};
  const [score, setScore] = useState(0);
  const [isScoreDisplayed, setIsScoreDisplayed] = useState(false);

  const options = useMemo(() => shuffleArray(originalOptions), [currentQt]);
  const correctOption = options.findIndex((opt) => /\[(x)\] /.test(opt));

  const handleOptionSelect = setSelected;
  const handleBackClick = isScoreDisplayed ? null : () => (currentQt ? setIsScoreDisplayed(true) : onBack2Subjects());
  const handleSubmit = (superMemoGrade) => {
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
          <div className={styles.score}>
            <span className="is-sr-only">your score on {subject.name} is:</span>
            {Math.round((score / (currentQt || 1)) * 100)} <span>/100</span>
          </div>

          <Button onClick={onBack2Subjects}>back to subjects</Button>
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
