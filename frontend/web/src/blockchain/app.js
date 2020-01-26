import web3 from './web3';
import MedicalRecord from './build/contracts/MedicalRecord.json';

const  instance = new web3.eth.Contract(
    MedicalRecord.abi,
    '0x6d85A15EDd39D45d6769d199135D1346A8249B05'
);
export default instance;