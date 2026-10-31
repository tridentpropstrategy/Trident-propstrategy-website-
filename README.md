# Trident Prop Strategy — Marketing & Mandate Platform

Production-ready, single-page marketing website for **Trident Prop Strategy**, a B2B real estate sales advisory firm partnering with small developers and mandate owners in Kalyan, Dombivli, and nearby KDMC areas (Maharashtra, India).

## Tech Stack
- **Next.js 16** (App Router, Turbopack, TypeScript, Strict Mode)
- **Tailwind CSS v4** (CSS-first config with `@theme` design tokens)
- **Motion (`motion/react`)** for smooth, accessible micro-interactions
- **Lucide React** for clean vector icons
- **Google Fonts via `next/font`**: Playfair Display & Plus Jakarta Sans

---

## Google Sheet setup

Follow these steps to connect the audit request form to a private Google Sheet for instant lead tracking:

### 1. Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. In the first tab (e.g. named `Leads`), create these column headers in row 1:
   - `Timestamp`
   - `Source`
   - `Name`
   - `Phone`
   - `Project`
   - `Micro-Market`
   - `Unsold Units`
   - `Scope`
   - `Overview`
   - `IP Address`

### 2. Add the Google Apps Script
1. In your sheet, navigate to **Extensions** > **Apps Script**.
2. Delete any existing template code and paste the following snippet:

```javascript
const SCRIPT_SECRET = "your_long_random_secure_token_here"; // Match with GOOGLE_SCRIPT_SECRET in env

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Validate secret token
    if (data.secret !== SCRIPT_SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Unauthorized" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.source || "",
      data.name || "",
      data.phone || "",
      data.project || "",
      data.microMarket || "",
      data.unsoldUnits || "",
      data.scope || "",
      data.overview || "",
      data.ip || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. Deploy as a Web App
1. Click **Deploy** > **New deployment**.
2. Select type: **Web app**.
3. Configure settings:
   - **Description**: `Trident Lead Webhook`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone` *(Crucial: allows Next.js server route to POST to it)*
4. Click **Deploy** and grant permissions if prompted.
5. Copy the **Web App URL** (format: `https://script.google.com/macros/s/.../exec`).

### 4. Configure Environment Variables
In your local `.env.local` and in Vercel Project Settings (**Settings > Environment Variables**):
```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SCRIPT_SECRET=your_long_random_secure_token_here
```

---

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run production build
npm run build
```
