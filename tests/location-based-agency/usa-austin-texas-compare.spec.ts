import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA Austin Texas Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa/austin-texas",
    "usa-austin-texas"
  );
  
  expect(result.success).toBeTruthy();
});