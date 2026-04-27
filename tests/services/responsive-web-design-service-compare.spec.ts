import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Responsive Web Design Service Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/responsive-web-design-service",
    "responsive-web-design-service"
  );
  
  expect(result.success).toBeTruthy();
});