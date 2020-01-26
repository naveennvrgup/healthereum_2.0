import web3 from './web3';
const abi = require('./build/contracts/abi.json');

const  instance = new web3.eth.Contract(
    abi,
    '0xF6583b1D4fD78f70fe473e55CbA52D1df1020ca0'
);
export default instance;