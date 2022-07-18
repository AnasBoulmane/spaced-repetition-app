import React from 'react';
import PropTypes from 'prop-types';
import { RiCloseCircleLine, RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import cn from 'classname';
import md from 'libs/markdown-it';
import Button from './Button';

import styles from './QuizCard.module.scss';

function QuizCard({ question, options, selected, correctOption, refs, isBackDisplay, onOptionSelect, onSubmit }) {
  const shouldDisplayRefs = isBackDisplay && refs?.length;
  const handleOptionSelect = (selected) => () => !isBackDisplay && onOptionSelect && onOptionSelect(selected);
  const isCorrectResponse = selected === correctOption;
  return (
    <>
      <div title={`the question`} dangerouslySetInnerHTML={{ __html: md.render(`#### ${question}`) }} />
      {options?.length && <span className="is-sr-only">list of {options.length} options</span>}
      {options?.map((option, index) => (
        <button
          key={index}
          onClick={handleOptionSelect(index)}
          role="checkbox"
          aria-checked={selected === index}
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
        </button>
      ))}

      {shouldDisplayRefs && <span className="is-sr-only">{refs.length} refs</span>}
      {shouldDisplayRefs &&
        refs.map((ref, index) => (
          <div key={index} className={styles['question-ref']} dangerouslySetInnerHTML={{ __html: md.render(ref) }} />
        ))}

      {isBackDisplay ? (
        isCorrectResponse ? (
          <div className={styles['btn-group']}>
            <Button
              className={styles.btn}
              onClick={() => onSubmit(3)}
              title="hard: correct response recalled with serious difficulty"
            >
              hard
            </Button>
            <Button
              className={styles.btn}
              onClick={() => onSubmit(4)}
              title="good: correct response after a hesitation"
            >
              good
            </Button>
            <Button className={styles.btn} onClick={() => onSubmit(5)} title="easy: perfect response.">
              easy
            </Button>
          </div>
        ) : (
          <div className={styles['btn-group']}>
            <Button className={styles.btn} onClick={() => onSubmit(0)} title="complete blackout">
              blackout
            </Button>
            <Button
              className={styles.btn}
              onClick={() => onSubmit(1)}
              title="incorrect response; the correct one remembered."
            >
              remembered
            </Button>
            <Button
              className={styles.btn}
              onClick={() => onSubmit(2)}
              title="incorrect response; where the correct one seemed easy to recall"
            >
              easy recall
            </Button>
          </div>
        )
      ) : (
        <Button onClick={onSubmit}>{isBackDisplay ? 'Next Question' : 'Submit'}</Button>
      )}
    </>
  );
}

QuizCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.number,
  correctOption: PropTypes.number.isRequired,
  refs: PropTypes.arrayOf(PropTypes.string),
  isBackDisplay: PropTypes.bool.isRequired,
  onOptionSelect: PropTypes.func,
  onSubmit: PropTypes.string,
};

export default QuizCard;
