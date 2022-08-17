import dayjs from 'dayjs';
import { supermemo } from 'supermemo';

/**
 * @typedef {{
 *  isGraduated: boolean;
 *  interval: number;
 *  repetition: number;
 *  efactor: number;
 *  dueDate: string;
 *  front: string | undefined; // can be a Flashcard
 *  back: string | undefined;
 *  question: string | undefined; // or can be a QuizCard
 *  options: string[] | undefined;
 *  refs: string[] | undefined;
 * }} Flashcard
 */

/**
 *
 * @param {Flashcard} flashcard
 * @param {SuperMemoGrade} grade
 * @returns {Flashcard}
 */
export default function practice(flashcard, grade) {
  let { interval, repetition, efactor } = supermemo(flashcard, grade);
  let { isGraduated } = flashcard;

  if (isGraduated && grade <= 2) isGraduated = false;
  if (!isGraduated && grade === 5) {
    isGraduated = true;
    interval = 3;
  }
  if (!isGraduated && grade === 4 && repetition > 4) {
    isGraduated = true;
    interval = 2;
  }

  const dueDate = isGraduated
    ? dayjs(Date.now()).add(interval, 'day').toISOString()
    : dayjs(Date.now()).add(getStepFromGrade(grade), 'minute').toISOString();

  return { ...flashcard, isGraduated, interval, repetition, efactor, dueDate };
}

const getStepFromGrade = (grade) => {
  switch (grade) {
    case 0:
      return 1;
    case 1:
      return 3;
    case 2:
      return 5;
    case 3:
      return 10;
    case 4:
      return 30;
    default:
      return 5;
  }
};
