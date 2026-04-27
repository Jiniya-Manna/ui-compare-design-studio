import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Medical Inventory Management Software Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/medical-inventory-management-software",
    "medical-inventory-management-software"
  );
  
  expect(result.success).toBeTruthy();
});