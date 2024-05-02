import {
  SFModule,
  SFModuleConfig,
  SFModuleNodeConfig,
  SFModuleResponse,
  defaultSFModuleConfig,
} from "./types";

export abstract class BaseSFModule implements SFModule {
  public name: string;
  public id: string;
  public nodeConfig: SFModuleNodeConfig = defaultSFModuleConfig;
  public config: SFModuleConfig | null = null;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;

    this.querySafetyFactorConfig().then((config) => {
      this.config = config;
    });
  }

  private querySafetyFactorConfig(): Promise<SFModuleConfig> {
    // return mock data
    // Todo: replace with actual query
    return Promise.resolve({
      sfLowerBound: 0.2,
      sfUpperBound: 0.3,
    });
  }

  abstract queryProfitFromCorruption(): Promise<number>;
  abstract queryCostOfCorruption(): Promise<number>;

  private async safeyQueryProfitFromCorruption(): Promise<number | null> {
    try {
      return await this.queryProfitFromCorruption();
    } catch (error) {
      console.error(`Failed to query profit from corruption: ${error}`);
      return null;
    }
  }

  private async safeQueryCostOfCorruption(): Promise<number | null> {
    try {
      return await this.queryCostOfCorruption();
    } catch (error) {
      console.error(`Failed to query cost of corruption: ${error}`);
      return null;
    }
  }

  public async safeQuerySafetyFactorInfo(): Promise<SFModuleResponse> {
    try {
      let [PfC, CoC] = await Promise.all([
        this.safeyQueryProfitFromCorruption(),
        this.safeQueryCostOfCorruption(),
      ]);

      // Check if any of them is null or undefined, if they can be
      if (PfC == null || CoC == null) {
        return {
          SF: null,
          PfC,
          CoC,
          timestamp: Date.now(),
          error: "PfC or CoC is null or undefined",
        };
      }

      // Check for division by zero
      if (CoC === 0) {
        return {
          SF: null,
          PfC,
          CoC,
          timestamp: Date.now(),
          error: "CoC is zero, cannot divide",
        };
      }

      return {
        SF: (CoC - PfC) / CoC,
        PfC,
        CoC,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error(`Failed to query safety factor info: ${error}`);
      return {
        SF: null,
        PfC: null,
        CoC: null,
        timestamp: Date.now(),
        error: (error as any).message || "An unknown error occurred",
      };
    }
  }
}
