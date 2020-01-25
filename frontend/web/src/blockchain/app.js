import web3 from './web3';
const abi = require('./build/contracts/abi.json');

const  instance = new web3.eth.Contract(
    abi,
    '0x9717d35F855c958Baff2eEffE05DAe3Ec83B6C45'
);
export default instance;