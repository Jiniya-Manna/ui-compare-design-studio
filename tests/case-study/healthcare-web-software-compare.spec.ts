import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Healthcare Web Software Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/healthcare-web-software",
    "healthcare-web-software"
  );
  
  expect(result.success).toBeTruthy();
});