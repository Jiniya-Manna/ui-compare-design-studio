import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Kolkata Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/kolkata",
    "kolkata"
  );
  
  expect(result.success).toBeTruthy();
});