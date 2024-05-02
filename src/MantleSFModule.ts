
import { Chain, PublicClient, createPublicClient, getAddress, http, parseAbi } from "viem";
import { BaseSFModule } from "./BaseSFModule";
import { getTokenValueFromCoinGecko } from "./CoinGecko";
import pendleABI from "./contracts/pendle/abi.json";

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
        coingeckoId: 'pendle',
        address: '0x808507121b80c02388fad14726482e061b8da827',
        abi: pendleABI,
        tokens: [
            {
                name: 'TRU',
                address: '0xf65B5C5104c4faFD4b709d9D60a185eAE063276c'
            }
        ]
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

        // Getting the balance won't work, since most TVL is not in ETH.g

        /*
        we should be getting:
         Value of native assets
         Value of the largest third party assets
         Value of the largest bridged assets
        */
        const balancePromises = contracts.map(async (contract): Promise<BigInt> => {
            return await this.client.getBalance({ address: getAddress(contract.address) });
        });


        const calls = await this.client.multicall({
            contracts: [
                {
                    functionName: 'totalSupply',
                    address: getAddress(contracts[0].address),
                    abi: contracts[0].abi,
                }
            ]
        });

        console.log(calls);


        const balances = await Promise.all(balancePromises);
        // ts was complaining that I can't add BigInts. I'm not sure if this is the best way to do it
        const totalPfC = balances.reduce((acc, balance) => acc + Number(balance), 0);
        return Promise.resolve(totalPfC);
    }

    async queryCostOfCorruption(): Promise<number> {

        return Promise.resolve(1000);
    }



}