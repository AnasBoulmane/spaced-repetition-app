import Markdown from 'markdown-it';
import prism from 'markdown-it-prism';

const md = new Markdown().use(prism);

export default md;
