import dotenv from "dotenv";
const fetch = require('node-fetch');

const config = dotenv.config() as any;


export async function getTokenValueFromCoinGecko(token: string): Promise<number> {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': config.parsed.COINGECKO_API_KEY }
        };

        const resp = await fetch(url, options);
        const json = await resp.json();
        return json[token].usd;

    } catch (error) {
        throw new Error(`Failed to get token value from CoinGecko: ${error}`);
    }
}