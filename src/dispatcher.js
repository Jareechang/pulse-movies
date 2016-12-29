import { Dispatcher } from 'flux';

import connectToLogger from './utils/logger';

const dispatcher = new Dispatcher;

/* connect dispatcher to logger */
connectToLogger(dispatcher);

export default dispatcher;
