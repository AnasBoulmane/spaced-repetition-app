import PouchDb from 'pouchdb';
import { v4 as uuidv4 } from 'uuid';

const subjectDb = new PouchDb('subjects');
export default subjectDb;

export const getSubjects = (withQuestions = false) =>
  subjectDb.allDocs({ include_docs: true }).then((results) =>
    results.rows.map(({ doc: { questions, ...rest } }) => ({
      questions: withQuestions ? questions : undefined,
      ...rest,
    })),
  );

export const createSubject = ({ name }) => subjectDb.put({ _id: uuidv4(), name }).catch(console.warn);

(async () => {
  let results = await getSubjects();
  if (results.length) return;
  results = await subjectDb.bulkDocs([
    { _id: uuidv4(), name: 'Javascript' },
    { _id: uuidv4(), name: 'React' },
  ]);
  console.log({ results });
})();
