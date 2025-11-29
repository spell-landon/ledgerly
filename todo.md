- fix date width on mobile
- fix menu height on mobile
- fix invoice width and line item table on mobile
- fix react screen zooming in on mobile when clicking on input field
- set font pairing with “Gibson”(?)
- convert to React Native

## Expenses:

- ✅ Amount can be negative. For example, I have a return of a product with another receipt that I need to track.
- ✅ When viewing the created expense, the image doesn't render correctly.
- ✅ The "category" should show the start-case label: so "equipment" would be "Equipment"
- ✅ When selecting the "Date" on edit/create, when displaying from the list on /expenses, or on an individual expense path, the date displays as the day before. So 11/06/2025 becomes 11/05/2025.
- ✅ If an item is a return, maybe we can specify that when creating/editing the expense? And if it's a return, maybe we connect the expenses somehow? For example: I bought a new MacBook Pro with my old MacBook Air as a trade-in. So I have the purchase receipt of $2,541.91, but the trade-in just occured almost 2 weeks later with a receipt of -$724.94. So the total spent would be $1,816.97. This should be reflected on the Expenses tab, and any reporting metrics (Reports & Tax Reports).
- ⚠️ Let's make the Expeses/:id page be the same Shopify-page layout. One idea could be to have the page always editable, so there's no dedicated view, it's just the page with fields, rendering any receipts applied (multiple receipts should be allowed to be added, edited, deleted, etc), and related expenses. The right column could be the title, date, category, etc., more global fields for the expense. Then the main section could render the amount, notes, receipts, related expenses, etc. and anything else that might be needed relating to an expense.

## Invoices:

- ✅ On an invoice, if there are any declared Clients, we should allow for a selection of the Client to auto-populate the invoice.
- ✅ The date on the invoice doesn't render correctly. It looks like it's the same issue as before: I set the date on the invoice, and then on the render it shows as the day before (example: 11/5 turns into 11/4).
- ✅ I would like to add a "Back" button to the "New" Invoice creation page.
- ✅ For the line items on the Invoice, I would like to display the name and description of the "Line Item Template". Also, have a section when adding items from scratch for a name and description. Description is optional. Name should be larger and bolder, the description should be smaller and grayer underneath the title. Space everything appropriately.
- ✅ When viewing an Invoice, can we move the "Payment Information" to the right column, like the "New" invoice Shopify column method? Also, can we move the actions (edit, email pdf, ...) to be in the upper right of the page? Almost like page actions? If we need to put them in a menu that will work for mobile. I think the "Status" could actually be its own card in the right column, above "Payment Information".
- ✅ Update the design of the invoice cards on mobile to be:
  [Year ............ "Invoice Total"] (Group header)

---

|Client .......................... Amount|
|Invoice # .............. "Status" "Date"|

---

## Reporting:

- ✅ Are "Reports" and "Tax Reports" the same thing...? Well, I guess they're not. Would it be better to combine them, or keep them separate?

## Dashboard:

- ✅ The "Recent Invoices" and "Recent Expenses" allows for a line item to extend past the viewport. I think it's the name that doesn't truncate or wrap causing the overflow issue.
- ⚠️ The "Recent Expenses" is having the same date issue where the entry has a date, but the displayed date is the day before. Example: The first entry has a date set to 11/26/2025, but on the card that is displayed here it shows 11/25/2025.

## Clients:

- ✅ I notice that the Clients have a "status" badge. How is that calculated and is it possible to make that editable?
- ✅ When clicking on the "View Invoices" it doesn't filter the results on the Invoices page.

## Global

- ✅ I think every spot where we have a table (Invoices, Expenses, Mileage, Clients, Line Item Templates, etc) we need to add filters, sorting, searching, and possibly even views.
- ✅ I would like to add a save/discard bar at the top every where we have a form, kind of like how Shopify does it for their dashboard. So if any changes have been made to a new or existing item, it would trigger to show this toast or banner, and you can't do anything (back out, navigate away, etc) until you either discard your changes or save them.
- ✅ I would like to add modals on actions (Sending email, every delete action, etc) so actions don't get accidentally triggered if the user accidentally clicks on the action.
- ⚠️ Update all input fields to use HeadlessUI components.
- ✅ MVP Launch readiness implemented (security fixes, pricing update, password reset, phone auth groundwork, error handling)

## Line Item Templates

- ✅ Line Item Templates: Can we make this more like Clients, Invoices, Expenses - where instead of a form that appears on the DOM to add, or a modal when you're editing, the template would live on a dedicated route?

---

# Future Improvements

## Legal Pages (Required before public marketing)
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie Policy page (if using analytics)

## Authentication Enhancements

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to APIs & Services > Credentials
4. Create OAuth 2.0 Client ID (Web application)
5. Add authorized redirect URI: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret
7. In Supabase Dashboard > Authentication > Providers > Google:
   - Enable Google provider
   - Paste Client ID and Client Secret
8. Update login page to add Google sign-in button

### Apple Sign-In Setup
1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Create an App ID with Sign in with Apple enabled
3. Create a Services ID for web authentication
4. Create a private key for Sign in with Apple
5. In Supabase Dashboard > Authentication > Providers > Apple:
   - Enable Apple provider
   - Add Service ID, Team ID, Key ID, and Private Key
   - Set authorized domains
6. Update login page to add Apple sign-in button

### SMS/Phone Authentication
- Phone auth routes already created (`login-phone.tsx`)
- In Supabase Dashboard > Authentication > Providers > Phone:
  - Enable Phone provider
  - Configure SMS provider (Twilio recommended)
  - Add Twilio Account SID, Auth Token, and Phone Number
- Test with real phone numbers

## Dashboard Features
- [ ] Logo upload in business settings
- [ ] Mileage rate configuration (currently hardcoded $0.67)
- [ ] Email template customization in settings
- [ ] Chart visualizations in reports (line charts, pie charts)
- [ ] Year-over-year comparisons in reports
- [ ] Household settings: flexible monthly items list with auto-suggest on expenses

## Infrastructure
- [ ] Rate limiting on auth endpoints
- [ ] Security headers (CSP, HSTS)
- [ ] Error monitoring (Sentry)
- [ ] Structured logging
- [ ] Status page for uptime claims
- [ ] Database backups and monitoring

## Marketing & Landing Page
- [ ] Real testimonials/case studies
- [ ] Blog/resources section for SEO
- [ ] Detailed feature pages
- [ ] FAQ page
- [ ] Contact form
- [ ] Social media profiles and links
- [ ] Email newsletter signup
