import web3 from './web3';
const abi = require('./build/contracts/abi.json');

const  instance = new web3.eth.Contract(
    abi,
    '0x3667DE6579932Eb197427c222488244664e2Bb8B'
);
export default instance;