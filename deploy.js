
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const mne = process.env.mnemonic
const provider = new HDWalletProvider(
    mne,
    'https://rinkeby.infura.io/v3/31c4f30a37264a008e5a9d21dd781c7a'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Deploying from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] })

    console.log('Contract deployed to', result.options.address)
}
deploy()