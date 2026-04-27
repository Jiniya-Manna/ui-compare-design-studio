import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA San Diego Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa/san-diego",
    "usa-san-diego"
  );
  
  expect(result.success).toBeTruthy();
});