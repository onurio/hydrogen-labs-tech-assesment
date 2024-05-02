import { MantleSFModule } from "./MantleSFModule";


const mantleSFModule = new MantleSFModule();

mantleSFModule.queryProfitFromCorruption().then((profit: number) => {
    console.log(`Profit from corruption is ${profit}`);
});