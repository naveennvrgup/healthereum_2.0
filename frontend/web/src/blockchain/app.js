import web3 from './web3';
const abi = require('./build/contracts/abi.json');

const  instance = new web3.eth.Contract(
    abi,
    '0x6B8BaFbFC7c8989C9bd380b19070aa1c13a2D25E'
);
export default instance;