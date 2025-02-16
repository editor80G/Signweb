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


