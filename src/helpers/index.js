import dbValidators from './db-validators';
import jwtGenerator from './jwt-generator';
import googleVerify from './google-verify';
import loadFile from './load-file';

export default {
   ...dbValidators,
   ...jwtGenerator,
   ...googleVerify,
   ...loadFile
}