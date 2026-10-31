/**
 * ============================================================================
 * TRIDENT PROP STRATEGY - GOOGLE SHEETS LEAD CAPTURE SCRIPT
 * ============================================================================
 * 
 * This Google Apps Script receives lead submissions from the website forms
 * (Hero form, Contact form, Channel Partner registration) and records them
 * into a single Google Sheet tab.
 * 
 * COLUMNS MANAGED (in exact order):
 * A: Date (dd-MMM-yyyy, e.g. 31-Oct-2026, IST)
 * B: Time (hh:mm:ss a, e.g. 03:42:10 PM, IST)
 * C: Source (hero / contact / channel-partner)
 * D: Name
 * E: Phone (Plain text format to preserve +91 and 0 prefixes)
 * F: Project / Firm
 * G: Micro-market
 * H: Unsold Units
 * I: Work Scope
 * J: Overview
 * K: Status ("New" by default)
 */

// ============================================================================
// 1. SETTINGS YOU CAN EDIT
// ============================================================================

/**
 * SECRET:
 * A private password shared between your Next.js website and this script.
 * Only requests that provide this exact secret will be saved.
 * Tip: Use a long random string of letters and numbers (at least 24 characters).
 */
var SECRET = "TRIDENT_LEAD_SECRET_KEY_2026";

/**
 * SHEET_NAME:
 * The name of the tab in your Google Sheet where leads should be stored.
 * If this tab doesn't exist, the script will write to the active tab.
 */
var SHEET_NAME = "Leads";

/**
 * NOTIFY_EMAIL:
 * Optional: Enter your email address to receive an instant alert for every new lead.
 * Leave as "" (empty quotes) if you do NOT want email alerts.
 * Example: "tridentpropstrategy@gmail.com"
 */
var NOTIFY_EMAIL = "";

// ============================================================================
// 2. HEALTH CHECK (GET REQUEST)
// ============================================================================

/**
 * doGet() runs when you visit the published web app URL directly in a browser.
 * Use this to verify that your script deployment is live and responding.
 */
function doGet(e) {
  var response = {
    ok: true,
    message: "Trident lead endpoint is running"
  };
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// 3. LEAD CAPTURE (POST REQUEST)
// ============================================================================

/**
 * doPost(e) runs when the website sends form data to this script via HTTP POST.
 */
function doPost(e) {
  // Use LockService to ensure that multiple submissions arriving at the exact
  // same second do not conflict or overwrite each other.
  var lock = LockService.getScriptLock();

  try {
    // Wait up to 10 seconds for concurrent writes to finish
    lock.waitLock(10000);

    // 1. Verify that data was received
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        ok: false,
        error: "Missing request body"
      });
    }

    // 2. Parse incoming JSON
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonResponse({
        ok: false,
        error: "Invalid JSON format: " + parseErr.message
      });
    }

    // 3. Check the shared secret password
    if (!data.secret || data.secret !== SECRET) {
      return jsonResponse({
        ok: false,
        error: "Unauthorized: Secret key does not match"
      });
    }

    // 4. Access the active spreadsheet and set time zone to Indian Standard Time (Asia/Kolkata)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.setSpreadsheetTimeZone("Asia/Kolkata");

    // Get the target tab by name, or fall back to the first sheet
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getActiveSheet();
    }

    // 5. If the sheet is completely empty, create the header row automatically
    var headers = [
      "Date",
      "Time",
      "Source",
      "Name",
      "Phone",
      "Project / Firm",
      "Micro-market",
      "Unsold Units",
      "Work Scope",
      "Overview",
      "Status"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      // Make header row bold
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      // Freeze the first row so it stays visible while scrolling
      sheet.setFrozenRows(1);
      // Format entire column E (Phone) as plain text so +91 or leading 0 are preserved
      sheet.getRange("E:E").setNumberFormat("@");
    }

    // 6. Generate Indian Standard Time (Asia/Kolkata) Date & Time
    var now = new Date();
    var dateStr = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy");
    var timeStr = Utilities.formatDate(now, "Asia/Kolkata", "hh:mm:ss a");

    // 7. Prepare the values for the new row in exact column order (A to K)
    // Any field missing from a form (e.g. Hero form has no microMarket) will be empty string ""
    var rowValues = [
      dateStr,                         // A: Date (e.g. 31-Oct-2026)
      timeStr,                         // B: Time (e.g. 03:42:10 PM)
      data.source || "contact",        // C: Source (hero / contact / channel-partner)
      data.name || "",                 // D: Name
      data.phone ? String(data.phone) : "", // E: Phone
      data.project || "",              // F: Project / Firm
      data.microMarket || "",          // G: Micro-market
      data.unsoldUnits || "",          // H: Unsold Units
      data.scope || "",                // I: Work Scope
      data.overview || "",             // J: Overview
      "New"                            // K: Status (ready for manual tracking)
    ];

    // 8. Append the new lead row to the sheet
    sheet.appendRow(rowValues);

    // Explicitly format the Phone cell in the newly appended row as plain text
    var newRowIndex = sheet.getLastRow();
    sheet.getRange(newRowIndex, 5).setNumberFormat("@");

    // 9. Send an email notification if NOTIFY_EMAIL is configured
    if (NOTIFY_EMAIL && NOTIFY_EMAIL.trim() !== "") {
      try {
        var emailSubject = "New Lead: " + (data.name || "Unknown") + " (" + (data.source || "Website") + ")";
        var emailBody = "You received a new lead from the Trident Prop Strategy website:\n\n" +
          "• Date & Time: " + dateStr + " at " + timeStr + " (IST)\n" +
          "• Form Source: " + (data.source || "contact") + "\n" +
          "• Contact Name: " + (data.name || "-") + "\n" +
          "• Phone / WhatsApp: " + (data.phone || "-") + "\n" +
          "• Project / Firm: " + (data.project || "-") + "\n" +
          "• Micro-Market: " + (data.microMarket || "-") + "\n" +
          "• Unsold Units: " + (data.unsoldUnits || "-") + "\n" +
          "• Work Scope: " + (data.scope || "-") + "\n" +
          "• Overview / Notes: " + (data.overview || "-") + "\n\n" +
          "Open Sheet: " + ss.getUrl();

        MailApp.sendEmail(NOTIFY_EMAIL.trim(), emailSubject, emailBody);
      } catch (mailError) {
        // Log mail error but do not fail the lead recording
        Logger.log("Email notification error: " + mailError.toString());
      }
    }

    // 10. Return success response
    return jsonResponse({
      ok: true,
      message: "Lead recorded successfully"
    });

  } catch (err) {
    // Return error response
    return jsonResponse({
      ok: false,
      error: "Error processing lead: " + err.toString()
    });

  } finally {
    // Always release the concurrency lock
    lock.releaseLock();
  }
}

// ============================================================================
// 4. HELPER FUNCTION TO RETURN JSON
// ============================================================================

/**
 * Creates an HTTP JSON response with proper MIME type.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
