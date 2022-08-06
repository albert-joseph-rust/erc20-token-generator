import config from '../config';
import utils from './utils';

import BasicERC20 from '../abi/token/BasicERC20.json';
import EasyERC20 from '../abi/token/EasyERC20.json';
import CustomERC20 from '../abi/token/CustomERC20.json';
import BurnERC20 from '../abi/token/BurnERC20.json';
import MintERC20 from '../abi/token/MintERC20.json';
import PopularERC20 from '../abi/token/PopularERC20.json';
import UltraERC20 from '../abi/token/UltraERC20.json';
import AwesomeERC20 from '../abi/token/AwesomeERC20.json';
import PauseERC20 from '../abi/token/PauseERC20.json';
import SuperERC20 from '../abi/token/SuperERC20.json';

import ServiceReceiverArtifact from '../abi/service/ServiceReceiver.json';

export default {
  mixins: [
    utils,
  ],
  data () {
    return {
      web3: null,
      web3Provider: null,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        default: config.defaultNetwork,
        current: null,
        map: {
          56: 'mainnet',
          97: 'testnet',
        },
        list: {
          mainnet: {
            web3Provider: 'https://mainnet.infura.io/v3/',
            explorerLink: 'https://etherscan.io',
            id: 1,
            name: 'Ethereum Mainnet',
          },
          testnet: {
            web3Provider: 'https://rinkeby.infura.io/v3/',
            explorerLink: 'https://rinkeby.etherscan.io',
            id: 4,
            name: 'Ethereum Rinkeby - Testnet',
          },
        },
      },
      serviceReceiver: config.serviceReceiver,
      tokenList: {
        BasicERC20,
        EasyERC20,
        CustomERC20,
        BurnERC20,
        MintERC20,
        PauseERC20,
        PopularERC20,
        UltraERC20,
        AwesomeERC20,
        SuperERC20,
      },
      contracts: {
        token: null,
        service: null,
      },
    };
  },
  methods: {
    async initWeb3 (network, checkWeb3) {
      if (!Object.prototype.hasOwnProperty.call(this.network.list, network)) {
        throw new Error(
          `Failed initializing network ${network}. Allowed values are ${Object.keys(this.network.list)}.`,
        );
      }

      if (checkWeb3 && (typeof window.ethereum !== 'undefined')) {
        console.log('injected ethereum'); // eslint-disable-line no-console
        this.web3Provider = window.ethereum;

        this.web3 = new Web3(this.web3Provider);
        this.metamask.installed = this.web3Provider.isMetaMask;

        const netId = await this.promisify(this.web3.eth.getChainId);
        this.metamask.netId = netId;

        if (netId !== this.network.list[network].id) {
          this.network.current = this.network.list[this.network.map[netId]];
          await this.initWeb3(network, false);
        }
      } else {
        console.log('provided ethereum'); // eslint-disable-line no-console
        this.network.current = this.network.list[network];
        this.web3Provider = new Web3.providers.HttpProvider(this.network.list[network].web3Provider);
        this.web3 = new Web3(this.web3Provider);
      }
    },
    initService (network) {
      this.contracts.service = new this.web3.eth.Contract(
        ServiceReceiverArtifact.abi,
        this.serviceReceiver[network],
      );
    },
    initToken (tokenType) {
      this.contracts.token = this.tokenList[tokenType];
      this.contracts.token.stringifiedAbi = JSON.stringify(this.contracts.token.abi);
    },
  },
};
