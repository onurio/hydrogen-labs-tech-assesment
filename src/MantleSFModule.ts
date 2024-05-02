
import { PublicClient, createPublicClient, formatUnits, getAddress, getContract, http, parseAbi, parseUnits } from "viem";
import { BaseSFModule } from "./BaseSFModule";
import { getTokenValueFromCoinGecko } from "./CoinGecko";
import contracts from "./contracts";
import { mantle } from "./chains";


export class MantleSFModule extends BaseSFModule {
    client: PublicClient;
    constructor() {
        super('MantleSFModule', 'IDPLACEHOLDER')
        const client = createPublicClient({ chain: mantle, transport: http(), });
        this.client = client;
    }


    async queryProfitFromCorruption(): Promise<number> {
        const balancePromises = contracts.map(async (c): Promise<number> => {
            const contract = getContract({
                address: getAddress(c.address),
                abi: c.abi,
                client: this.client,
            })

            const totalSupply = (await contract.read.totalSupply([])) as BigInt;
            const supply = formatUnits(totalSupply as bigint, 18);
            const totalSupplyAsNumber = Number(supply)
            const pendleToUsd = await getTokenValueFromCoinGecko('pendle');
            return totalSupplyAsNumber * pendleToUsd;
        });
        const balances = await Promise.all(balancePromises);
        const totalPfC = balances.reduce((acc: number, balance: number) => acc + balance, 0);
        return totalPfC;
    }

    async queryCostOfCorruption(): Promise<number> {

        return Promise.resolve(1000);
    }
}