# Bloglist Playwright Tests

Run the backend in test mode and the frontend in two separate terminals before executing Playwright.

```powershell
# Terminal 1: part4/bloglist
$env:NODE_ENV="test"
npm run dev

# Terminal 2: part5/bloglist-frontend
npm run dev

# Terminal 3: part5/bloglist-e2e
npm install
npx playwright install chromium
npm test
```
