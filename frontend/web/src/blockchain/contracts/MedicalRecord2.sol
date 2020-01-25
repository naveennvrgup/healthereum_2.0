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
        string quantity;
    }
    
    
    // 
    // global stuff
    //

    mapping(uint=>User) users;
    uint[] userArr;
    
    mapping(uint=>Hospital) hospitals;
    mapping(uint=>Patient) patients;
    mapping(uint=>Appointment)appointments;
    uint[] hospitalArr;


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

    function getTest(uint testId) public view returns(
        uint, uint, string memory,
        string memory,string memory,
        string memory,bool){
        return(
            tests[testId].docterId,
            tests[testId].patientId,
            tests[testId].createdAt,
            tests[testId].description,
            tests[testId].results,
            tests[testId].file,
            tests[testId].running
        );
    }
    
    function getDiagnosis(uint diagnosisId) public view returns(
        string memory, bool, uint){
        return(
            diagnosises[diagnosisId].description,
            diagnosises[diagnosisId].basedOnTest,
            diagnosises[diagnosisId].testId
        );
    }
    
    function getProcedure(uint procedureId) public view returns(
        uint, string memory, string memory, Severity, string memory){
        return(
            procedures[procedureId].docterId,
            procedures[procedureId].description,
            procedures[procedureId].createdAt,
            procedures[procedureId].severity,
            procedures[procedureId].file
        );
    }
    
    function getBill(uint billId) public view returns(
        string memory){
        return(
            bills[billId].createdAt
        );
    }
    
    function getBillItem(uint billId, uint billItemId) public view returns(
        string memory, string memory, string memory){
        return(
            bills[billId].items[billItemId].name,
            bills[billId].items[billItemId].price,
            bills[billId].items[billItemId].quantity
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
    
    // function addDocter(
    //     string memory speciality,
    //     string memory qualification,
    //     Gender gender) public returns(bool) {
    //     doc
    // }
    
    // function addPatient() public {
        
    // }
}