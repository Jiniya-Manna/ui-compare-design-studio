import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA Los Angeles Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa/los-angeles",
    "usa-los-angeles"
  );
  
  expect(result.success).toBeTruthy();
});