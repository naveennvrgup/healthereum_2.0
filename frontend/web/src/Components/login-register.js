import React, { Component } from 'react';
import web3 from '../blockchain/web3'
import blockchain from '../blockchain/app'
import * as constants from './constants'

class LoginRegister extends Component {
    state = {}

    componentDidMount() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const containerrr = document.getElementById('containerrr');

        signUpButton.addEventListener('click', () => {
            containerrr.classList.add("right-panel-active");
        })

        signInButton.addEventListener('click', () => {
            containerrr.classList.remove("right-panel-active");
        });
    }

    signupHandler = async (e) => {
        e.preventDefault()

        const accounts = await web3.eth.getAccounts();

        const userId = constants.randomnumber();
        const userTypeId = constants.randomnumber();

        blockchain.methods.setUser(
            this.sname.value,
            this.sphone.value,
            this.semail.value,
            parseInt(this.susertype.value),
            userId,
            userTypeId
        ).send({ from: accounts[0] }).then(d => {
            alert('please proceed to login')

        })

    }

    routeIt = () => {
        const user = constants.getaccount();
        console.log(this.props)
        // if(constants.UserType == constants.UserType.Hospital){
        //     this.props.location.push
        // }
    }

    loginHandler = (e) => {
        e.preventDefault()

        this.routeIt()
        console.log(this.luseremail.value)
        blockchain.methods
            .getUser(this.luseremail.value).call().then(d => {
                console.log(d)
            })
    }

    render() {
        return (


            <div className="containerrr" id="containerrr">
                <div className="form-containerrr sign-up-containerrr">
                    <form className="form">
                        <h1 className="h1">Create Account</h1>

                        <span className="span">Use your email for registration</span>
                        <input ref={e => this.sname = e} className="input" type="text" placeholder="Name" />
                        <input ref={e => this.semail = e} className="input" type="email" placeholder="Email" />
                        <input ref={e => this.sphone = e} className="input" type='text' placeholder="Phone" />
                        <select ref={e => this.susertype = e} className='input'>
                            <option value="1">Hospital</option>
                            <option value="2">Patient</option>
                            <option value="3">Docter</option>
                        </select>
                        <button onClick={this.signupHandler} className="button">Sign Up</button>
                    </form>
                </div>
                <div className="form-containerrr sign-in-containerrr">
                    <form className="form">
                        <h1 className="h1">Sign in</h1>

                        <span className="span">with your account</span>
                        <input className="input" ref={e => this.luseremail = e} type="email" placeholder="Email" />
                        <input className="input" ref={e => this.luserpassword = e} type="password" placeholder="Password" />

                        <button onClick={this.loginHandler} className="button">Sign In</button>
                    </form>
                </div>
                <div className="overlay-containerrr">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="h1">Welcome Back!</h1>
                            <p className="p">To keep connected with us please login with your personal info</p>
                            <button className="ghost button" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="h1">Hello, Friend!</h1>
                            <p className="p">Enter your personal details and start journey with us</p>
                            <button className="ghost button" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default LoginRegister;