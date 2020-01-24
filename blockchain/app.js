import web3 from './web3';
const MedicalRecord = require('./build/contracts/MedicalRecord.json');
const  instance = new web3.eth.Contract(
    JSON.parse(MedicalRecord.abi),
    '0x6d85A15EDd39D45d6769d199135D1346A8249B05'
);
export default instance;