import dayjs from 'dayjs';
import practice from './super-memo';

jest.useFakeTimers().setSystemTime(new Date());

describe('when not graduated', () => {
  let flashcard;

  beforeEach(() => {
    flashcard = {
      front: 'programer',
      back: 'an organism that turns caffeine in software',
      interval: 0,
      repetition: 0,
      efactor: 2.5,
      dueDate: dayjs(Date.now()).toISOString(),
      isGraduated: false,
    };
  });

  it('given grade 3 then reappears after 10 min', () => {
    flashcard = practice(flashcard, 3);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(10);
    flashcard = practice(flashcard, 3);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(10);
  });

  it('given grade 4 then reappears after 30 min', () => {
    flashcard = practice(flashcard, 4);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(30);
    flashcard = practice(flashcard, 4);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(30);
  });

  it('given grade 4 after 4 correct reps then graduate the flashcard', () => {
    flashcard = practice(flashcard, 3);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(10);
    flashcard = practice(flashcard, 4);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(30);
    flashcard = practice(flashcard, 4);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(30);
    flashcard = practice(flashcard, 3);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(10);
    flashcard = practice(flashcard, 4);
    expect(flashcard.isGraduated).toBe(true);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'day')).toBe(2);
  });

  it('given grade 5 then graduate & reappears after 3 Days', () => {
    flashcard = practice(flashcard, 5);
    expect(flashcard.isGraduated).toBe(true);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'day')).toBe(3);
  });
});

describe('when graduated', () => {
  let flashcard;

  beforeEach(() => {
    flashcard = {
      front: 'programer',
      back: 'an organism that turns caffeine in software',
      interval: 0,
      repetition: 0,
      efactor: 2.5,
      dueDate: dayjs(Date.now()).toISOString(),
      isGraduated: true,
    };
  });

  it('given grade <2 in this case 0 then relearn the flashcard', () => {
    flashcard = practice(flashcard, 0);
    expect(flashcard.isGraduated).toBe(false);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(1);
  });

  it('given grade <2 in this case 1 then relearn the flashcard', () => {
    flashcard = practice(flashcard, 1);
    expect(flashcard.isGraduated).toBe(false);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(3);
  });

  it('given grade <2 in this case 2 then relearn the flashcard', () => {
    flashcard = practice(flashcard, 2);
    expect(flashcard.isGraduated).toBe(false);
    expect(dayjs(flashcard.dueDate).diff(dayjs(), 'minute')).toBe(5);
  });
});
