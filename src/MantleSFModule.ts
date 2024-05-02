
import { Address, Chain, PublicClient, createPublicClient, formatUnits, getAddress, getContract, http } from "viem";
import { BaseSFModule } from "./BaseSFModule";

const mantleTestnet: Chain = {
    id: 5001, name: "Mantle Testnet", nativeCurrency: { decimals: 18, name: "Mantle", symbol: "MNT", },
    rpcUrls: {
        public: { http: ["https://rpc.mantle.xyz"] },
        default: { http: ["https://rpc.mantle.xyz"] },
    },
    blockExplorers: {
        default: {
            name: "Mantle Explorer",
            url: "https://explorer.mantle.xyz/",
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
        const balancePromises = contracts.map(async (contract): Promise<BigInt> => {
            return await this.client.getBalance({ address: getAddress(contract.address) });
        });
        const balances = await Promise.all(balancePromises);
        // ts was complaining that I can't add BigInts. I'm not sure if this is the best way to do it
        const totalPfC = balances.reduce((acc, balance) => acc + Number(balance), 0);
        return Promise.resolve(totalPfC);
    }

    async queryCostOfCorruption(): Promise<number> {
        // get the Mantle staking value from the contract
        return Promise.resolve(1000);
    }
}