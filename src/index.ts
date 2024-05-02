import { MantleSFModule } from "./MantleSFModule";


const mantleSFModule = new MantleSFModule();

mantleSFModule.safeQuerySafetyFactorInfo().then((response) => {
    console.log(response);
});