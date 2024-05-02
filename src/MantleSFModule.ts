
import { PublicClient, createPublicClient, erc20Abi, formatUnits, getAddress, getContract, http, } from "viem";
import { BaseSFModule } from "./BaseSFModule";
import { getTokenValueFromCoinGecko } from "./CoinGecko";
import contracts from "./contracts";
import { mantle } from "./chains";
import mantleABI from "./contracts/mantle/abi.json";

export const nativeToken = {
    name: 'Mantle',
    coingeckoID: 'mantle',
    decimals: 18,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    abi: mantleABI
}

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
            const supply = formatUnits(totalSupply as bigint, c.decimals);
            const totalSupplyAsNumber = Number(supply)
            const pendleToUsd = await getTokenValueFromCoinGecko('pendle');
            return totalSupplyAsNumber * pendleToUsd;
        });
        const balances = await Promise.all(balancePromises);
        const totalPfC = balances.reduce((acc: number, balance: number) => acc + balance, 0);
        return totalPfC;
    }

    async queryCostOfCorruption(): Promise<number> {
        const contract = getContract({
            address: getAddress(nativeToken.address),
            abi: nativeToken.abi,
            client: this.client,
        });
        // I'm not sure why the total supply is 0.
        const totalSupply = (await contract.read.totalSupply()) as BigInt;
        const supply = formatUnits(totalSupply as bigint, nativeToken.decimals);
        const totalSupplyAsNumber = Number(supply);
        const mntToUsd = await getTokenValueFromCoinGecko(nativeToken.coingeckoID);
        return totalSupplyAsNumber * mntToUsd * 0.51;
    }
}