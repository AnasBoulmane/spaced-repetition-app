import React, { useState } from 'react';
import './App.css';
import useEffectAsync from './hooks/use-effect-async';
import SubjectList from './components/SubjectList';
import FlashCardList from './components/FlashCardList';
import { getSubjects } from 'db/subjects.locale';

function App() {
  const [subject, setSubject] = useState();
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleSubjectSelect = (id) => setSubject(subjects.find(({ _id }) => id === _id));
  const handleBack2Subjects = () => setSubject(null);

  useEffectAsync(async () => {
    const subjects = await getSubjects();
    setSubjects(subjects);
  }, []);

  useEffectAsync(async () => {
    const content = await (await fetch(process.env.REACT_APP_QUIZ_URL)).text();
    const [, ...rowQuestions] = content.split('#### ');
    const questions = rowQuestions.map((row) => {
      const [question, ...rest] = row.split(/- /);
      const last = rest.pop();
      const options = [...rest, ...last.split(/- |\[Reference|NOTE:|\*\*Explanation\*\*/)];
      return {
        question,
        refs: options.filter((opt) => !/\[( |x)\] /.test(opt)).map((ref) => `[Reference${ref}`),
        options: options.filter((opt) => /\[( |x)\] /.test(opt)),
      };
    });
    setQuestions(questions);
  }, []);

  return (
    <div className="todo-app">
      {!subject && <SubjectList subjects={subjects} onSubjectSelect={handleSubjectSelect} />}
      {subject && <FlashCardList subject={subject} questions={questions} onBack2Subjects={handleBack2Subjects} />}
    </div>
  );
}

export default App;
