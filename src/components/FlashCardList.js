import React, { useState } from 'react';
import { RiCloseCircleLine, RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import cn from 'classname';
import md from '../libs/markdown-it';

import styles from './FlashCardList.module.scss';
import './prisma.css';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function FlashCardList({ subject, questions }) {
  const [selected, setSelected] = useState();
  const [currentQt, setCurrentQt] = useState(0);
  const [isBackDisplay, setIsBackDisplay] = useState(false);
  const { question, options, ref } = questions[currentQt] || {};
  const [score, setScore] = useState(0);

  const correctOption = options.findIndex((opt) => /\[(x)\] /.test(opt));

  console.log({ question, options, ref });

  const handleOptionSelect = (selected) => () => {
    if (!isBackDisplay) setSelected(selected);
  };
  const handleSubmit = () => {
    if (isBackDisplay) {
      if (selected === correctOption) setScore(score + 1);
      setCurrentQt((currentQt + 1) % questions.length);
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
      <h1>{subject.name}</h1>

      {!question && questions.length && (
        <div className={styles['quiz-score']}>{Math.round((score / questions.length) * 100)}/100</div>
      )}

      {question && (
        <>
          <div dangerouslySetInnerHTML={{ __html: md.render(`#### ${question}`) }} />

          {options?.map((option, index) => (
            <div
              key={index}
              onClick={handleOptionSelect(index)}
              className={cn(styles['question-option'], {
                [styles['success']]: isBackDisplay && selected === index && correctOption === index,
                [styles['error']]:
                  (isBackDisplay && selected !== index && correctOption === index) ||
                  (isBackDisplay && selected === index && correctOption !== index),
              })}
            >
              <div className={styles['icons']}>
                {!isBackDisplay && selected !== index && <RiCheckboxBlankCircleLine className={styles['icon']} />}
                {!isBackDisplay && selected === index && <RiCheckboxCircleLine className={styles['icon']} />}
                {isBackDisplay && selected !== index && correctOption === index && (
                  <RiCheckboxCircleLine className={cn(styles['icon'], styles['icon-error'])} />
                )}
                {isBackDisplay && selected === index && correctOption === index && (
                  <RiCheckboxCircleLine className={cn(styles['icon'], styles['icon-success'])} />
                )}
                {isBackDisplay && selected === index && correctOption !== index && (
                  <RiCloseCircleLine className={cn(styles['icon'], styles['icon-error'])} />
                )}
                {isBackDisplay && selected !== index && correctOption !== index && (
                  <RiCheckboxBlankCircleLine className={styles['icon']} />
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: md.render(option.replace(/\[( |x)\] /, '')) }} />
            </div>
          ))}

          {isBackDisplay && ref && (
            <div className={styles['question-ref']} dangerouslySetInnerHTML={{ __html: md.render(ref) }} />
          )}

          <button className={styles['question-submit']} onClick={handleSubmit}>
            {isBackDisplay ? 'Next Question' : 'Submit'}
          </button>
        </>
      )}
    </div>
  );
}

export default FlashCardList;
