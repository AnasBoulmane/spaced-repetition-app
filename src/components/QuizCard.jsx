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

      <Button onClick={onSubmit}>{isBackDisplay ? 'Next Question' : 'Submit'}</Button>
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
