import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA San Francisco Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa/san-francisco",
    "usa-san-francisco"
  );
  
  expect(result.success).toBeTruthy();
});