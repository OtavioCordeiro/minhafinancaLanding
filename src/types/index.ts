export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  monthlyPrice: number;
  billingInterval: string;
  type: string;
  isActive: boolean;
  trialDays: number;
  limits: {
    maxExpenses: number;
    maxIncomes: number;
    maxUsersPerFamily: number;
    maxCategories: number;
    maxInvestments: number;
    maxPockets: number;
    maxFamilies: number;
    maxExport: number;
    maxImport: number;
  };
  features: {
    hasInvestments: boolean;
    hasAdvancedReports: boolean;
    hasExportData: boolean;
    hasImportData: boolean;
    hasPrioritySupport: boolean;
  };
}
