import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa",
    "usa"
  );
  
  expect(result.success).toBeTruthy();
});