import { Chain } from "viem";

const mantle: Chain = {
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


export { mantle };