import web3 from './web3';
const abi = require('./build/contracts/abi.json');

const  instance = new web3.eth.Contract(
    abi,
    '0x29b9f086f4428dc9efDcbDB3d373576a766f4501'
);
export default instance;