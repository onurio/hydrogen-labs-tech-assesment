import { MantleSFModule } from "./MantleSFModule";


const mantleSFModule = new MantleSFModule();

mantleSFModule.queryProfitFromCorruption().then((profit: number) => {
    console.log(`Profit from corruption is ${profit} USD`);
});

mantleSFModule.queryCostOfCorruption().then((cost: number) => {
    console.log(`Cost of corruption is ${cost} USD`);
});