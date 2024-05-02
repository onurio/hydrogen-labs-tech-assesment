import pendleABI from "./pendle/abi.json";
import merchantMoeABI from "./merchantMoe/abi.json";
import { erc20Abi } from "viem";

const contracts = [
    {
        name: 'Pendle',
        coingeckoId: 'pendle',
        address: '0xd27B18915e7acc8FD6Ac75DB6766a80f8D2f5729',
        abi: pendleABI,
        decimals: 18,
    },
    {
        name: 'Merchant Moe',
        coingeckoId: 'moe',
        address: '0x4515A45337F461A11Ff0FE8aBF3c606AE5dC00c9',
        abi: merchantMoeABI,
        decimals: 18,
    }
]




export default contracts;