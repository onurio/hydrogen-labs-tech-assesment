export type SFModuleResponse = {
  SF: number | null; // Assuming SF can be null if we can't calculate it
  PfC: number | null; // Replace with actual type
  CoC: number | null; // Replace with actual type
  timestamp: number;
  error?: string; // Optional error message
};

export interface SanitizedSFModuleResponse {
  SF: number;
  PfC: number;
  CoC: number;
  timestamp: number;
}

export interface SFDataBeforeAggregation extends SanitizedSFModuleResponse {
  protocol: string;
  id: string;
}

export interface SFModuleConfig {
  sfLowerBound: number;
  sfUpperBound: number;
}

export interface SFModuleNodeConfig {
  name: string;
  id: string;
  timeout: number;
  frequency: number;
}

export const defaultSFModuleConfig: SFModuleNodeConfig = {
  name: "example",
  id: "0",
  timeout: 1000,
  frequency: 300 * 1000,

  // query every 5 minutes
};

export interface SFModule {
  safeQuerySafetyFactorInfo: () => Promise<SFModuleResponse>;
}
