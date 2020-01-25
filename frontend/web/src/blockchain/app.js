import web3 from './web3';
const abi = require('./build/contracts/abi.json');

const  instance = new web3.eth.Contract(
    abi,
    '0x4920911c64B817f2EB54ac194079cdBdf14ad67c'
);
export default instance;