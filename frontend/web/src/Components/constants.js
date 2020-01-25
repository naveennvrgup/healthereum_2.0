export const UserType = {
    Hospital:1,
    Patient:2,
    Docter:3
}
export const HositalType = {
    government:1,
    privatelyOwned:2
}
export const Gender = {
    male:1,
    female:2,
    other:3
}
export const BloodType = {
    Op:1,
    On:2,
    Ap:3,
    An:4,
    Bp:5,
    Bn:6,
    ABp:7,
    ABn:8
}
export const Severity = {
    mild:1,
    minor:2,
    major:3
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