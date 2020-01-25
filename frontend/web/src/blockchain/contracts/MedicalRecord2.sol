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
        
        mapping(uint => Appointment) appointments;
        uint[] appointmentArr;
    }
    
    struct Docter{
        string img;
        string speciality;
        string qualification;
        Gender gender;
        
        mapping(uint=>Appointment) appointments;
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
        
        mapping(uint=>Appointment) appointments;
        uint[] appointmentArr;

    }
    
    
    struct Appointment{
        uint prevAppointmentId;
        bool prevAppointmentbool;
        
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
        
        mapping(uint=>Diagnosis) Diagnosises;
        uint[] diagnosisArr;
        
        mapping(uint=>Test) tests;
        uint[] testArr;
        
    }
    
    struct Test{
        uint docterId;
        uint Patient;
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
        uint docter;
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
    uint[] hospitalArr;
    
    mapping(uint=>Patient) patients;
    uint[] patientArr;
    
    mapping(uint=>Appointment) appointments;
    mapping(uint=>Bill) bills;

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
    
    function listBillItems(uint billId) public view returns(uint[] memory){
        return(bills[billId].itemArr );
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
        for(int i=0;i<userArr.length;i++){
            if(compareStrings(users[userArr[i]].email,email)){
                return(
                    users[userArr[i]].name,
                    users[userArr[i]].phone,
                    users[userArr[i]].email,
                    users[userArr[i]].UserType,
                    users[userArr[i]].id);
            }
        }
    }
    
    function getHospital(uint hopitalId) public view returns(
            string memory,string memory,
            string memory,string memory,
            string memory,string memory,
            string memory,HositalType
        ){
        return(
            hospitals[hopitalId].name,
            hospitals[hopitalId].location,
            hospitals[hopitalId].phones,
            hospitals[hopitalId].speciality,
            hospitals[hopitalId].img,
            hospitals[hopitalId].emails,
            hospitals[hopitalId].description,
            hospitals[hopitalId].hositalType
        );
    }
    
    function getPatient(uint patientId) public view returns(
            string memory,string memory,
            string memory,string memory,
            string memory,string memory,
            bool, BloodType,uint ,uint
        ){
        return(
            patients[patientId].img,
            patients[patientId].dob,
            patients[patientId].medicalConditions,
            patients[patientId].allergies,
            patients[patientId].medications,
            patients[patientId].importantNotes,
            patients[patientId].organDonar,
            patients[patientId].bloodType,
            patients[patientId].height,
            patients[patientId].weight
        );
    }
    
    function get(uint ,) public view returns(){
        return(
            
        );
    }

    function get(uint ,) public view returns(){
        return(
            
        );
    }

    function get(uint ,) public view returns(){
        return(
            
        );
    }
    
    function get(uint ,) public view returns(){
        return(
            
        );
    }
    
    //
    // set functions
    //
    
}