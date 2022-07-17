import PouchDb from 'pouchdb';

const subjectDb = new PouchDb('subjects-shared');

export default subjectDb;
