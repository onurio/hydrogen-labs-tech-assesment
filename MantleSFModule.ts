import { BaseSFModule } from "./BaseSFModule";
import { createPublicClient, http } from "viem";

const mantleTestnet = {
    id: 5001, name: "Mantle Testnet", network: "Mantle Testnet", nativeCurrency: { decimals: 18, name: "Mantle", symbol: "MNT", },
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

export class MantleSFModule extends BaseSFModule {
    client: any;
    constructor() {
        super('MantleSFModule', 'IDPLACEHOLDER')
        const client = createPublicClient({ chain: mantleTestnet, transport: http(), });

    }


    async queryProfitFromCorruption(): Promise<number> {

        // this.client.getBalance('0x808507121b80c02388fad14726482e061b8da827')
        return Promise.resolve(1000);
    }

    async queryCostOfCorruption(): Promise<number> {
        // return mock data
        return Promise.resolve(1000);
    }
}