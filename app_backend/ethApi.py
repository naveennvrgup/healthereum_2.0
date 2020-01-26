from flask_restful import reqparse, abort, Api, Resource
from web3 import Web3
from contract import abi, bytecode
import json, glob, random, datetime
from flask import request
from web3.middleware import geth_poa_middleware


class Patient(Resource):
    matic_url = 'https://alpha.ethereum.matic.network/'
    account = '0xA1D84e1923cAb73685416eCf5A1a5881D462aCED'
    privateKey = '9AE388160E6823F99BF671CD19034475B2412296E7363DDE5957184C27CA4EAF'
    instance = None
    web3 = None

    def init(self):
        #Already connected to the blockchain
        if self.instance != None and self.web3 != None:
            return True

        #Try Connection again 
        web3 = Web3(Web3.HTTPProvider(self.matic_url))
        web3.eth.defaultAccount = self.account
        web3.middleware_onion.inject(geth_poa_middleware, layer=0)
        if web3.isConnected():
            with open("data.json", 'r') as f:
                datastore = json.load(f)
                abi = datastore["abi"]
                contract_address = datastore["contract_address"]

            contractInstance = web3.eth.contract(address=contract_address, abi=abi)
            self.instance = contractInstance
            self.web3 = web3
            return True
        else:
            return False
    
    def get(self):
        """
        Method to get all the Patient's profile
        """
        if(self.init()):
            request.data = json.loads(request.data) 
            if 'email' in request.data: 
                email = request.data['email']
                user = self.instance.functions.getUser(email).call()
                
                return ({'user':user})
            else:
                return "Please enter your email"
        else:
            return "Error connecting to blockchain!"


    def post(self):
        """
        Method to make appointment
        """
        request.data = json.loads(request.data) 
        error = []
        
        if 'hid' in request.data:
            hospital_id = int(request.data['hid'])
        else:
            error.append('Hospital Id required')
        if 'pid' in request.data:
            patient_id = int(request.data['pid'])
        else:
            error.append('Patient Id required')
        if 'note' in request.data:
            note = str(request.data['note'])
        if len(error):
            return ({'errors':error})
        else:
            appointmentId = 100000000000000 + random.randint(0,99999999999999)
            createdAt = str(datetime.datetime.now().date()) 
        print(hospital_id, patient_id, note, appointmentId, createdAt)

        if self.init():
            transaction = self.instance.functions.createAppointment(hospital_id, patient_id, appointmentId, createdAt).buildTransaction()
            transaction.update({'gas':30000})
            transaction.update({'nonce':self.web3.eth.getTransactionCount(self.account)})
            signed_tx = self.web3.eth.account.signTransaction(transaction,self.privateKey)
            txn_hash = self.web3.eth.sendRawTransaction(signed_tx.rawTransaction)
            txn_receipt = self.web3.eth.waitForTransactionReceipt(txn_hash)
            print(txn_receipt)
            return "Appointment created successfully"
        else:
            return "Error connecting to blockchain"


class Hospital(Resource):
    matic_url = 'https://alpha.ethereum.matic.network/'
    account = '0xA1D84e1923cAb73685416eCf5A1a5881D462aCED'
    instance = None
    web3 = None

    def init(self):
        #Already connected to the blockchain
        if self.instance != None and self.web3 != None:
            return True

        #Try Connection again 
        web3 = Web3(Web3.HTTPProvider(self.matic_url))
        if web3.isConnected():
            with open("data.json", 'r') as f:
                datastore = json.load(f)
                abi = datastore["abi"]
                contract_address = datastore["contract_address"]

            web3.eth.defaultAccount = self.account
            contractInstance = web3.eth.contract(address=contract_address, abi=abi)
            self.instance = contractInstance
            self.web3 = web3
            return True
        else:
            return False

    def get(self):
        if self.init():
            result = self.instance.functions.listHospitals().call()
            print(result)
            return result
        else:
            return "Error connecting to blockchain"
