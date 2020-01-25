pragma solidity ^0.5.12;

contract Courses{
    
    //
    // enum
    //
    
    
    enum UserType{Hospital,Patient,Docter}
    enum HositalType{government,privatelyOwned}
    enum Gender{male,female,other}
    enum BloodType{Op,On,Ap,An,Bp,Bn,ABp,ABn}
    enum Severity{mild,minor,major}
    
    //
    // structs
    //
    
    struct User{
        string name;
        string phone;
        string email;
        UserType userType;
        uint id;
    }
    
    struct Hospital{
        string name;
        string location;
        string phones;
        string speciality;
        string img;
        string emails;
        string description;
        HositalType hositalType;
        
        mapping(uint => Docter) docters;
        uint[] docterArr;
        
        mapping(uint => Bill) bills;
        uint[] billArr;
        
        uint[] appointmentArr;
        uint[] testArr;
        bool[] testDone;
    }
    
    struct Docter{
        string img;
        string speciality;
        string qualification;
        Gender gender;
        
        uint[] appointmentArr;
        bool[] appointmentOpen;
    }
    
    struct Patient{
        BloodType bloodType;
        uint height;
        uint weight;
        string img;
        string dob;
        string medicalConditions;
        string allergies;
        string medications;
        string importantNotes;
        bool organDonar;
        
        uint[] appointmentArr;
    }
    
    
    struct Appointment{
        uint prevAppointmentId;
        bool prevAppointmentbool;
        uint hospitalId;
        uint patientId;
        
        string patientNote;
        string receptionNote;
        string finalNote;
        
        string createdAt;
        bool accepted;
        bool seen;
        bool completed;
        
        mapping(uint=>Bill) bills;
        uint[] billArr;
        
        mapping(uint=>Procedure) procedures;
        uint[] procedureArr;
        
        mapping(uint=>Diagnosis) diagnosises;
        uint[] diagnosisArr;
        
        mapping(uint=>Test) tests;
        uint[] testArr;
        
    }
    
    struct Test{
        uint docterId;
        uint patientId;
        string createdAt;
        string description;
        string results;
        string file;
        bool running;
        
    }
    
    struct Diagnosis{
        string description;
        bool basedOnTest;
        uint testId;
    }
    
    struct Procedure {
        uint docterId;
        string description;
        string createdAt;
        Severity severity;
        string file;
    }
    

    
    struct Bill{
        string createdAt;
        
        mapping(uint=>Item) items;
        uint[] itemArr;
    }
    
    
    struct Item{
        string name;
        string price;
        uint quantity;
    }
    
    
    // 
    // global stuff
    //

    mapping(uint=>User) users;
    uint[] userArr;
    mapping(uint=>Hospital) hospitals;
    uint[] hospitalArr;
    mapping(uint=>Patient) patients;
    mapping(uint=>Appointment)appointments;
    


    // 
    // helpers
    //
    
    
    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
    
    //              
    // list view functions  
    //                    
    
    function listHospitals() public view returns(uint[] memory){
        return(hospitalArr);
    }
    
    function listHospitalAppointments(uint hopitalId) public view returns(uint[] memory){
        return(hospitals[hopitalId].appointmentArr);
    }
    
    function listPatientAppointments(uint patientId) public view returns(uint[] memory){
        return(patients[patientId].appointmentArr);
    }
    
    function listDocters(uint hospitalId) public view returns(uint[] memory){
        return(hospitals[hospitalId].docterArr);
    }
    
    function listBills(uint appointmentId) public view returns(uint[] memory){
        return(appointments[appointmentId].billArr);
    }
    
    function listProcedures(uint appointmentId) public view returns(uint[] memory){
        return(appointments[appointmentId].procedureArr);
    }
    
    function listDiagnosis(uint appointmentId) public view returns(uint[] memory){
        return(appointments[appointmentId].diagnosisArr);
    }
    
    function listTests(uint appointmentId) public view returns(uint[] memory){
        return(appointments[appointmentId].testArr);
    }
    
    function listBillItems(uint appointmentId, uint billId) public view returns(uint[] memory){
        return(appointments[appointmentId].bills[billId].itemArr );
    }

    
    //
    // get view functions
    //
    
    function getUser(string memory email) public view returns(
        string memory, 
        string memory, 
        string memory,
        UserType,
        uint){
        for(uint i=0;i<userArr.length;i++){
            if(compareStrings(users[userArr[i]].email,email)){
                return(
                    users[userArr[i]].name,
                    users[userArr[i]].phone,
                    users[userArr[i]].email,
                    users[userArr[i]].userType,
                    users[userArr[i]].id);
            }
        }
        
        return (users[777].name,users[777].name,users[777].name,users[777].userType,users[777].id);
    }
    
    function getHospital(uint hopitalId) public view returns(
            string memory,string memory,
            string memory,string memory,
            string memory,string memory,
            HositalType
        ){
        return(
            hospitals[hopitalId].name,
            hospitals[hopitalId].location,
            hospitals[hopitalId].phones,
            hospitals[hopitalId].speciality,
            hospitals[hopitalId].emails,
            hospitals[hopitalId].description,
            hospitals[hopitalId].hositalType
        );
    }
    
    function getHospitalImg(uint hopitalId) public view returns(string memory){
        return(hospitals[hopitalId].img);
    }
    
    function getPatient(uint patientId) public view returns(
            string memory,string memory,
            bool, BloodType,uint ,uint
        ){
        return(
            patients[patientId].img,
            patients[patientId].dob,
            patients[patientId].organDonar,
            patients[patientId].bloodType,
            patients[patientId].height,
            patients[patientId].weight
        );
    }
    
    function getPatientExtra(uint patientId) public view returns(
        string memory,string memory,
        string memory,string memory
    ){
        return(
            patients[patientId].medicalConditions,
            patients[patientId].allergies,
            patients[patientId].medications,
            patients[patientId].importantNotes);          
    }
    
    function getDocter(uint hospitalId,uint docterId) public view returns(
        string memory,string memory,string memory,Gender){
        return(
            hospitals[hospitalId].docters[docterId].img,
            hospitals[docterId].speciality,
            hospitals[hospitalId].docters[docterId].qualification,
            hospitals[hospitalId].docters[docterId].gender
        );
    }

    function getAppointment(uint appointmentId) public view returns(
            uint, bool, string memory,
            bool,bool,bool
        ){
        return(
            appointments[appointmentId].prevAppointmentId,
            appointments[appointmentId].prevAppointmentbool,
            appointments[appointmentId].createdAt,
            appointments[appointmentId].accepted,
            appointments[appointmentId].seen,
            appointments[appointmentId].completed
        );
    }
    
    function getAppointmentNotes(uint appointmentId) public view returns(
        string memory,string memory,string memory, uint, uint){
        return(
            appointments[appointmentId].patientNote,
            appointments[appointmentId].receptionNote,
            appointments[appointmentId].finalNote,
            appointments[appointmentId].patientId,
            appointments[appointmentId].hospitalId);
    }

    function getTest(uint appointmentId,uint testId) public view returns(
        uint, string memory,
        string memory,string memory,
        string memory,bool){
        return(
            appointments[appointmentId].tests[testId].docterId,
            appointments[appointmentId].tests[testId].createdAt,
            appointments[appointmentId].tests[testId].description,
            appointments[appointmentId].tests[testId].results,
            appointments[appointmentId].tests[testId].file,
            appointments[appointmentId].tests[testId].running
        );
    }
    
    function getDiagnosis(uint appointmentId,uint diagnosisId) public view returns(
        string memory, bool, uint){
        return(
            appointments[appointmentId].diagnosises[diagnosisId].description,
            appointments[appointmentId].diagnosises[diagnosisId].basedOnTest,
            appointments[appointmentId].diagnosises[diagnosisId].testId
        );
    }
    
    function getProcedure(uint appointmentId,uint procedureId) public view returns(
        uint, string memory, string memory, Severity, string memory){
        return(
            appointments[appointmentId].procedures[procedureId].docterId,
            appointments[appointmentId].procedures[procedureId].description,
            appointments[appointmentId].procedures[procedureId].createdAt,
            appointments[appointmentId].procedures[procedureId].severity,
            appointments[appointmentId].procedures[procedureId].file
        );
    }
    
    function getBill(uint appointmentId,uint billId) public view returns(
        string memory){
        return(
            appointments[appointmentId].bills[billId].createdAt
        );
    }
    
    function getBillItem(uint appointmentId,uint billId, uint billItemId) public view returns(
        string memory, string memory, uint){
        return(
            appointments[appointmentId].bills[billId].items[billItemId].name,
            appointments[appointmentId].bills[billId].items[billItemId].price,
            appointments[appointmentId].bills[billId].items[billItemId].quantity
        );
    }
    
    //
    // set functions
    //
    
    function setUser(string memory name,
    string memory phone,
    string memory email,
    UserType userType,
    uint userId,
    uint userTypeId
    ) public returns(bool) {
        bool exists = compareStrings(users[userId].name,'');
        
        users[userId].name = name;
        users[userId].phone = phone;
        users[userId].email = email;
        users[userId].userType = userType;
        users[userId].id = userTypeId;
        
        if(exists==false){
            userArr.push(userId);
        }
        
        return(exists);
    }
    
    function addHospital(
        uint hospitalId,
        string memory name,
        string memory location,
        string memory phones,
        string memory speciality,
        string memory emails,
        string memory description,
        HositalType hositalType
        ) public returns(bool){
        bool exists = compareStrings(hospitals[hospitalId].name, '');
        
        hospitals[hospitalId].name = name;
        hospitals[hospitalId].location = location;
        hospitals[hospitalId].phones = phones;
        hospitals[hospitalId].speciality = speciality;
        hospitals[hospitalId].emails = emails;
        hospitals[hospitalId].description = description;
        hospitals[hospitalId].hositalType = hositalType;
        
        if(exists==false){
            hospitalArr.push(hospitalId);
        }
    }
    
    function addDocter(
        uint hospitalId,
        uint docterId,
        string memory speciality,
        string memory qualification,
        Gender gender) public returns(bool) {
        bool exists = compareStrings(hospitals[hospitalId].docters[docterId].speciality,'');
        
        hospitals[hospitalId].docters[docterId].speciality = speciality;
        hospitals[hospitalId].docters[docterId].qualification = qualification;
        hospitals[hospitalId].docters[docterId].gender =gender;
        
        if(exists == true){
            hospitals[hospitalId].docterArr.push(docterId);
        }
        
    }
    
    function addPatient(
        uint patientId,
        uint height, uint weight,
        string memory dob, BloodType bloodType) public {
        patients[patientId].height=height;
        patients[patientId].weight=weight;
        patients[patientId].dob=dob;
        patients[patientId].bloodType=bloodType;
    }
    
    function addPatientExtras(
        uint patientId,
        string memory medicalConditions,
        string memory allergies,
        string memory importantNotes,
        string memory medications,
        bool organDonar)
    public{
            patients[patientId].medicalConditions=medicalConditions;
            patients[patientId].allergies=allergies;
            patients[patientId].importantNotes=importantNotes;
            patients[patientId].medications=medications;
            patients[patientId].organDonar=organDonar;
    }
    
    function createAppointment(uint hospitalId, 
    uint patientId, uint appointmentId, string memory createdAt) public {
        
        appointments[appointmentId].createdAt = createdAt;
        appointments[appointmentId].hospitalId=hospitalId;
        appointments[appointmentId].patientId=patientId;
        
        patients[patientId].appointmentArr.push(appointmentId);
        hospitals[hospitalId].appointmentArr.push(appointmentId);
    }
    
    function setAppointmentExtras(uint appointmentId,
    string memory patientNote, 
    string memory receptionNote, 
    string memory finalNote) public {
        appointments[appointmentId].patientNote = patientNote;
        appointments[appointmentId].receptionNote = receptionNote;
        appointments[appointmentId].finalNote = finalNote;
        
    }
    
    function respondAppointment(uint appointmentId,
    bool accepted,bool seen) public {
        appointments[appointmentId].accepted = accepted;
        appointments[appointmentId].seen = seen;
    }
    
    function completeAppointment(uint appointmentId) public {
        appointments[appointmentId].completed = true;
    }
    
    function addTest(uint appointmentId, uint docterId,
    uint patientId,uint testId, uint hospitalId, string memory createdAt, string memory description)
    public{
        appointments[appointmentId].tests[testId].docterId=docterId;
        appointments[appointmentId].tests[testId].patientId=patientId;
        appointments[appointmentId].tests[testId].createdAt=createdAt;
        appointments[appointmentId].tests[testId].description=description;
        
        appointments[appointmentId].testArr.push(testId);
        hospitals[hospitalId].testArr.push(testId);
        hospitals[hospitalId].testDone.push(false);
    }
    
    function testReport(uint appointmentId, uint hospitalId, uint testId, string memory results)public{
        appointments[appointmentId].tests[testId].results=results;
        appointments[appointmentId].tests[testId].running=true;
        
        for(uint i=0;i<hospitals[hospitalId].testArr.length;i++){
            if(hospitals[hospitalId].testArr[i]==testId){
                hospitals[hospitalId].testDone[i]=true;
            }
        }
    }
    
    function addDiagnosis(uint appointmentId, uint diagnosisId, string memory description)
    public{
        appointments[appointmentId].diagnosises[diagnosisId].description=description;
    
        appointments[appointmentId].diagnosisArr.push(diagnosisId);
    }
    
    function addProcedure(uint appointmentId, uint procedureId, 
    string memory description, string memory createdAt, Severity severity) public{
        appointments[appointmentId].procedures[procedureId].createdAt= createdAt;
        appointments[appointmentId].procedures[procedureId].severity=severity;
        appointments[appointmentId].procedures[procedureId].description=description;
        
        appointments[appointmentId].procedureArr.push(procedureId);
    }
    
    function addBill(uint appointmentId, uint billId, string memory createdAt)
    public {
        appointments[appointmentId].bills[billId].createdAt=createdAt;
        appointments[appointmentId].billArr.push(billId);
    }
    
    function addBillItem(uint appointmentId, uint billId,uint billItemId, 
    string memory name, string memory price, uint quantity)public{
        appointments[appointmentId].bills[billId].items[billItemId].name =name;
        appointments[appointmentId].bills[billId].items[billItemId].price=price;
        appointments[appointmentId].bills[billId].items[billItemId].quantity=quantity;
        
        appointments[appointmentId].bills[billId].itemArr.push(billItemId);
    }
}