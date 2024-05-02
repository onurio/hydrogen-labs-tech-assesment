
import { Address, Chain, PublicClient, createPublicClient, getAddress, getContract, http } from "viem";
import { BaseSFModule } from "./BaseSFModule";
import viem from "viem";

const mantleTestnet: Chain = {
    id: 5001, name: "Mantle Testnet", nativeCurrency: { decimals: 18, name: "Mantle", symbol: "MNT", },
    rpcUrls: {
        public: { http: ["https://rpc.testnet.mantle.xyz"] },
        default: { http: ["https://rpc.testnet.mantle.xyz"] },
    },
    blockExplorers: {
        default: {
            name: "Mantle Explorer",
            url: "https://explorer.testnet.mantle.xyz/",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 56133,
        },
    },
};

const contracts = [
    {
        name: 'Pendle',
        address: '0x808507121b80c02388fad14726482e061b8da827',
        abi: []
    }
]

export class MantleSFModule extends BaseSFModule {
    client: PublicClient;
    constructor() {
        super('MantleSFModule', 'IDPLACEHOLDER')
        const client = createPublicClient({ chain: mantleTestnet, transport: http(), });
        this.client = client;
    }


    async queryProfitFromCorruption(): Promise<number> {
        const balance = await this.client.getBalance({ address: getAddress('0x808507121b80c02388fad14726482e061b8da827') });
        return Promise.resolve(0);
    }

    async queryCostOfCorruption(): Promise<number> {
        // return mock data
        return Promise.resolve(1000);
    }
}