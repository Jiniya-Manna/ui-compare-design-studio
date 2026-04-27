import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA New York Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa/new-york",
    "usa-new-york"
  );
  
  expect(result.success).toBeTruthy();
});