- fix date width on mobile
- fix menu height on mobile
- fix invoice width and line item table on mobile
- fix react screen zooming in on mobile when clicking on input field
- set font pairing with “Gibson”(?)
- convert to React Native

✅ ## Expenses:

- Amount can be negative. For example, I have a return of a product with another receipt that I need to track.
- When viewing the created expense, the image doesn't render correctly.
- The "category" should show the start-case label: so "equipment" would be "Equipment"
- When selecting the "Date" on edit/create, when displaying from the list on /expenses, or on an individual expense path, the date displays as the day before. So 11/06/2025 becomes 11/05/2025.
- If an item is a return, maybe we can specify that when creating/editing the expense? And if it's a return, maybe we connect the expenses somehow? For example: I bought a new MacBook Pro with my old MacBook Air as a trade-in. So I have the purchase receipt of $2,541.91, but the trade-in just occured almost 2 weeks later with a receipt of -$724.94. So the total spent would be $1,816.97. This should be reflected on the Expenses tab, and any reporting metrics (Reports & Tax Reports).

✅ ## Invoices:

- On an invoice, if there are any declared Clients, we should allow for a selection of the Client to auto-populate the invoice.

✅ ## Reporting:

- Are "Reports" and "Tax Reports" the same thing...? Well, I guess they're not. Would it be better to combine them, or keep them separate?

✅ ## Dashboard:

- The "Recent Invoices" and "Recent Expenses" allows for a line item to extend past the viewport. I think it's the name that doesn't truncate or wrap causing the overflow issue.

✅ ## Clients:

- I notice that the Clients have a "status" badge. How is that calculated and is it possible to make that editable?
- When clicking on the "View Invoices" it doesn't filter the results on the Invoices page.

## Global

- I think every spot where we have a table (Invoices, Expenses, Mileage, Clients, Line Item Templates, etc) we need to add filters, sorting, searching, and possibly even views.
- I would like to add a save/discard bar at the top every where we have a form, kind of like how Shopify does it for their dashboard. So if any changes have been made to a new or existing item, it would trigger to show this toast or banner, and you can't do anything (back out, navigate away, etc) until you either discard your changes or save them.
- I would like to add modals on actions (Sending email, every delete action, etc) so actions don't get accidentally triggered if clicking on the action.
