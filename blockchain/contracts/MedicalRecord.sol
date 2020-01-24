pragma solidity >=0.4.22 <0.6.0;

contract MedicalRecord{
    enum Gender{Male,Female,Other}
    enum BloodGroup{Op,On,Ap,An,Bp,Bn,ABp,ABn}
    enum HospitalType{government, privateorg}
    
    struct Record{
        uint id;
        string pdf;
        string dateTime;
        string docName;
    }
    
    struct User{
        mapping(uint => Record) records;
        
        uint[] appointments;
        uint[] hospitalOfAppointment;
        uint[] recordArr;
        string phone;
        string name;
        string email;
        Gender gender;
        BloodGroup bg;
        string dob;
        bool exist;
        bool died;
    }
    struct Docter{
        string name;
        string qualification;
        string specialisation;
        Gender gender;
        uint experience;
    }
    struct Appointment{
        string scheduledAt;
        bool accepted;
        bool seen;
        bool completed;
        string createdAt;
        uint docter;
        address patient;
        uint fees;
    }
    struct Hospital {
        address user;
        string name;
        string location;
        HospitalType hospitalType;
        
        mapping(uint=> Appointment) appointments;
        uint[] appointmentsArr;
        
        mapping(uint=>Docter) docters;
        uint[] doctersArr;
    }
    
    mapping(address => User) users;
    address[] userArr;
    
    mapping(uint => Hospital)hospitals;
    uint[] hospitalArr;
    
    event AcceptedAppointment(uint, string, string, uint);
    
    
    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
    
    modifier Authorized(){
        require(users[msg.sender].exist, "User does not exist");
        _;
    }
    
    constructor() public {}
    
    function getDocters(uint hospital_id) public view Authorized returns(uint[] memory){
        return(hospitals[hospital_id].doctersArr);
    }
    
    function getDocter(uint hospital_id, uint docter_id) public view Authorized returns(
        string memory, string memory, string memory,Gender,uint){
            return ( 
                hospitals[hospital_id].docters[docter_id].name,
                hospitals[hospital_id].docters[docter_id].qualification,
                hospitals[hospital_id].docters[docter_id].specialisation,
                hospitals[hospital_id].docters[docter_id].gender,
                hospitals[hospital_id].docters[docter_id].experience
            );
        }
    
    function addDocter(
        uint hospital_id,
        uint docters_id,
        string memory name, 
        string memory qualification, 
        string memory specialisation,
        Gender gender,
        uint experience
    ) public Authorized{
        hospitals[hospital_id].docters[docters_id].name=name;
        hospitals[hospital_id].docters[docters_id].qualification=qualification;
        hospitals[hospital_id].docters[docters_id].specialisation=specialisation;
        hospitals[hospital_id].docters[docters_id].gender=gender;
        hospitals[hospital_id].docters[docters_id].experience=experience;
    
        hospitals[hospital_id].doctersArr.push(docters_id);
    }
    
    
    function addHospital(uint id, string memory name, string memory location, HospitalType hospitalType) public Authorized {
        hospitals[id].name=name;
        hospitals[id].user=msg.sender;
        hospitals[id].location=location;
        hospitals[id].hospitalType = hospitalType;
        hospitalArr.push(id);
    }
    
    function getHospital() public view Authorized returns(uint, string memory){
        for(uint i=0;i<hospitalArr.length;i++){
            if(hospitals[hospitalArr[i]].user==msg.sender){
                return(hospitalArr[i],hospitals[hospitalArr[i]].name);
            }
        }
        return(0,'notfound');
    }
    function getHospitals() public view Authorized returns(uint[] memory){
        return(hospitalArr);
    }
    function getHospitalById(uint hospital_id) public view 
    returns(string memory, string memory, HospitalType){
        return(
            hospitals[hospital_id].name,
            hospitals[hospital_id].location,
            hospitals[hospital_id].hospitalType
        );
    }
    
    
    function getAppointments(uint hospital_id) public view Authorized returns(uint[] memory){
        return(hospitals[hospital_id].appointmentsArr);
    }  
    
    function getAppointment(uint hospital_id, uint appointment_id) 
    public view Authorized returns(bool, string memory, uint, address, uint) {
        return(
            hospitals[hospital_id].appointments[appointment_id].completed,
            hospitals[hospital_id].appointments[appointment_id].createdAt,
            hospitals[hospital_id].appointments[appointment_id].docter,
            hospitals[hospital_id].appointments[appointment_id].patient,
            hospitals[hospital_id].appointments[appointment_id].fees
        );
    }

    function setAppointmentFees(uint hospital_id, uint appointment_id, uint fees) public Authorized {
        hospitals[hospital_id].appointments[appointment_id].fees = fees;
    } 
    function addAppointment(uint hospital_id, uint docter_id, uint appointment_id, address patient, string memory createdAt) public Authorized {
        hospitals[hospital_id].appointments[appointment_id].createdAt = createdAt;
        hospitals[hospital_id].appointments[appointment_id].docter = docter_id;
        hospitals[hospital_id].appointments[appointment_id].patient = patient;
        
        hospitals[hospital_id].appointmentsArr.push(appointment_id);
        users[patient].appointments.push(appointment_id);
        users[patient].hospitalOfAppointment.push(hospital_id);
    } 
    
    function acceptAppointment(uint hospital_id, uint appointment_id, bool accepted, string memory scheduledAt) public {
        hospitals[hospital_id].appointments[appointment_id].seen=true;
        hospitals[hospital_id].appointments[appointment_id].accepted=accepted;
        hospitals[hospital_id].appointments[appointment_id].scheduledAt=scheduledAt;
        
        emit AcceptedAppointment(
            hospital_id,
            hospitals[hospital_id].name,
            scheduledAt,
            appointment_id
        );
    }
    
    function getUserAppointments() public view returns(uint[] memory, uint[] memory){
        return(
            users[msg.sender].appointments,
            users[msg.sender].hospitalOfAppointment
        );
    }
    
    function getUser()public view Authorized returns(string memory, string memory, string memory, Gender, BloodGroup, string memory){
        return(
            users[msg.sender].phone,
            users[msg.sender].name,
            users[msg.sender].email,
            users[msg.sender].gender,
            users[msg.sender].bg,
            users[msg.sender].dob
            );
    }
    
    function getUserId(string memory phone) public view returns(address, bool){
        for(uint i=0;i<userArr.length;i++){
            if(compareStrings(users[userArr[i]].phone,phone)){
                return(userArr[i], true);
            }
        }
        return(msg.sender,false);
    }
    function addUser(string memory phone, string memory name, string memory email, Gender gender, BloodGroup bloodGroup, string memory dob) public{
        users[msg.sender].phone = phone;
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].gender = gender;
        users[msg.sender].bg = bloodGroup;
        users[msg.sender].dob = dob;
        users[msg.sender].exist = true;
        userArr.push(msg.sender);
    }
    function addRecord(address a,uint id,string memory pdf, string memory dateTime,string memory docName) public{
        users[a].records[id].pdf = pdf; 
        users[a].records[id].dateTime = dateTime; 
        users[a].records[id].docName = docName;
        users[a].records[id].id = id;
        users[a].recordArr.push(id);
    }
    function getAllRecords(address a) public Authorized view returns(uint[] memory){
        return(users[a].recordArr);
    }
    function getRecord(address a,uint id) public Authorized view Authorized returns(uint,string memory, string memory, string memory){
        return(users[a].records[id].id,
            users[a].records[id].pdf,
            users[a].records[id].dateTime,
            users[a].records[id].docName);
    }
    
}