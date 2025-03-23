// This file provides a wrapper around the `jsonwebtoken` library, 
// converting its callback-based methods (`sign`, `verify`, `decode`) 
// into promise-based methods using `util.promisify`. 
// It exports an object with `sign`, `verify`, and `decode` methods 
// that can be used with async/await for easier handling of JWT operations.

import utils from 'util';
import jwtOriginal from 'jsonwebtoken';

const verify = utils.promisify(jwtOriginal.verify);
const sign = utils.promisify(jwtOriginal.sign);
const decode = utils.promisify(jwtOriginal.decode);

const jsonwebtoken = {
    sign,
    verify,
    decode
};
export default jsonwebtoken;


