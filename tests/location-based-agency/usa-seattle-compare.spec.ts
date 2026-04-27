import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("USA Seattle Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/usa/seattle",
    "usa-seattle"
  );
  
  expect(result.success).toBeTruthy();
});