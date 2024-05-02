
import { PublicClient, createPublicClient, erc20Abi, formatUnits, getAddress, getContract, http, parseAbi, parseUnits } from "viem";
import { BaseSFModule } from "./BaseSFModule";
import { getTokenValueFromCoinGecko } from "./CoinGecko";
import contracts from "./contracts";
import { mantle } from "./chains";

export const nativeToken = {
    name: 'Mantle',
    coingeckoID: 'mantle',
    decimals: 18,
    address: '0x3c3a81e81dc49A522A592e7622A7E711c06bf354',
    abi: erc20Abi
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
        const totalSupply = (await contract.read.totalSupply()) as BigInt;
        const supply = formatUnits(totalSupply as bigint, nativeToken.decimals);
        const totalSupplyAsNumber = 1000;
        const mntToUsd = await getTokenValueFromCoinGecko(nativeToken.coingeckoID);
        return totalSupplyAsNumber * mntToUsd * 0.51;
    }
}