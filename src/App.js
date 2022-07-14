import React, { useState } from 'react';
import './App.css';
import useEffectAsync from './hooks/use-effect-async';
import SubjectList from './components/SubjectList';
import FlashCardList from './components/FlashCardList';

function App() {
  const [subject, setSubject] = useState();
  const [questions, setQuestions] = useState();
  const subjects = [
    { _id: 0, name: 'Javascript' },
    { _id: 1, name: 'React' },
  ];
  const handleSubjectSelect = (id) => setSubject(subjects.find(({ _id }) => id === _id));

  useEffectAsync(async () => {
    const content = await (await fetch(process.env.REACT_APP_QUIZ_URL)).text();
    const [_0, ...rowQuestions] = content.split('#### ');
    const questions = rowQuestions.map((row) => {
      const [question, ...options] = row.split(/- |\[Reference/);
      return {
        question,
        ref: options[4] && `[Reference${options.pop()}`,
        options,
      };
    });
    setQuestions(questions);
    console.log(questions[1]);
  }, []);

  return (
    <div className="todo-app">
      {!subject && <SubjectList subjects={subjects} onSubjectSelect={handleSubjectSelect} />}
      {subject && <FlashCardList subject={subject} questions={questions} />}
    </div>
  );
}

export default App;
