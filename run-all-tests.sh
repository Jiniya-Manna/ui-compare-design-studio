#!/bin/bash

echo "🚀 Running all UI comparison tests..."

# Clean up previous results
rm -rf test-results

# Create results directory
mkdir -p test-results

# Run individual tests
echo "📄 Testing Landing Page..."
npm run test:landingpage

echo "📄 Testing UX Research Services..."
npm run test:ux-research

echo "📄 Testing Mobile App UI Design..."
npm run test:mobile-app-ui-design

echo "📄 Testing Custom Website Design..."
npm run test:custom-website-design

echo "📄 Testing Brand Identity Design..."
npm run test:brand-identity-design

echo "📄 Testing Web App Design..."
npm run test:web-app-design

echo "📄 Testing SaaS Website Design..."
npm run test:saas-website-design

echo "📄 Testing Website Redesign..."
npm run test:website-redesign

echo "✅ All tests completed!"

# Generate summary
echo ""
echo "📊 Summary of Results:"
echo "======================"

ls -la test-results/*.png 2>/dev/null | while read line; do
  filename=$(echo $line | awk '{print $9}')
  size=$(echo $line | awk '{print $5}')
  echo "✅ $filename ($size bytes)"
done

echo ""
echo "📁 All screenshots saved in: test-results/"
echo "🌐 Open individual reports:"
echo "   - Landing Page: npm run open-landingpage"
echo "   - UX Research: npm run open-ux-research"
echo "   - Mobile App UI Design: npm run open-mobile-app-ui-design"
echo "   - Custom Website Design: npm run open-custom-website-design"
echo "   - Brand Identity Design: npm run open-brand-identity-design"
echo "   - Web App Design: npm run open-web-app-design"
echo "   - SaaS Website Design: npm run open-saas-website-design"
echo "   - Website Redesign: npm run open-website-redesign"
