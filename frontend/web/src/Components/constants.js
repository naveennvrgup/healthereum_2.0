export const UserType = {
    Hospital:0,
    Patient:1,
    Docter:2
}
export const HositalType = {
    government:0,
    privatelyOwned:1
}
export const Gender = {
    male:0,
    female:1,
    other:2
}
export const BloodType = {
    Op:0,
    On:1,
    Ap:2,
    An:3,
    Bp:4,
    Bn:5,
    ABp:6,
    ABn:7
}
export const Severity = {
    mild:0,
    minor:1,
    major:2
}

export const randomnumber = () => {
    return Math.round(Math.random()* Math.pow(10,15),0)
}

export const setaccount = (account) => {
    sessionStorage.setItem('account',JSON.stringify(account))
}

export const getaccount = () => {
    let user = sessionStorage.getItem('account')
    if(user == undefined){
        return {}
    }
    return JSON.parse(user)
}

export const removeAccount = () => {
    sessionStorage.removeItem('account')
}
