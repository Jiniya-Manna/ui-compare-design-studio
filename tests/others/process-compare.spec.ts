import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Process Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/process",
    "process"
  );
  
  expect(result.success).toBeTruthy();
});