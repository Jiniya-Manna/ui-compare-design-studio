import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("NFT Marketplace UI Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/nft-marketplace-ui-design",
    "nft-marketplace-ui-design"
  );
  
  expect(result.success).toBeTruthy();
});