# Saldo

A personal finance dashboard built with React, JavaScript and CSS.

I chose personal finance as the focus of this portfolio project because it brings together data, everyday decisions and interface design. The dashboard presents income, expenses and monthly balance in one place, with filters for exploring individual transactions.

**[Live demo](https://saldo-sand.vercel.app)** · **[Source code](https://github.com/anabrito23/Saldo)**

## Features

- Monthly overview of income, expenses, balance and savings rate.
- Six-month chart comparing income and expenses.
- Spending breakdown by category.
- Form for adding transactions and an option to delete them.
- Transaction search and category filters.
- CSV export of the filtered transactions.
- Browser-local persistence with localStorage.
- Currency converter using the Frankfurter API, with loading, error and retry states.
- Responsive layouts, labelled form controls and visible keyboard focus.

## Technologies

- React for the interface and state management.
- JavaScript for calculations, filtering and application behaviour.
- HTML and JSX for the page structure.
- CSS for styling and responsive layouts.
- Vite for local development and production builds.
- Git and GitHub for version control.
- Vercel for hosting.

## Run locally

Use Node.js 24 and npm.

```sh
git clone https://github.com/anabrito23/Saldo.git
cd Saldo
npm ci
npm run dev
```

Open the local address shown in the terminal.

To run the domain tests:

```sh
npm test
```

To build and preview the production version:

```sh
npm run build
npm run preview
```

## UX/UI decisions

The overview puts the main financial figures first, followed by charts and individual transactions. A muted green palette and clear spacing help keep the interface calm and readable.

The month selector controls the dashboard summary. Search and category filters affect the transaction list and CSV export, so users can explore specific records while retaining the wider monthly context.

Amounts use Portuguese formatting and euros. The savings rate is calculated as `(income − expenses) / income`; months without income display 0%.

Forms use visible labels and native validation. Dialogs support Escape and return focus to their opening control. The charts include a textual description for assistive technology. These choices support accessibility, but the project has not undergone a full accessibility audit.

## Project structure

```text
src/
├── App.jsx           # Dashboard, forms and filters
├── Exchange.jsx      # Currency converter and API requests
├── model.js          # Demo data, validation and calculations
├── model.test.js     # Domain tests
├── useStorage.js     # localStorage persistence
├── icons.jsx         # Local SVG icons
├── main.jsx          # React entry point
└── style.css         # Styles and responsive layouts
```

## Data and API

The dashboard starts with fictional transactions for demonstration. Transactions remain in the current browser and are not sent to a server. There is no bank connection, login or cross-device synchronisation.

The currency converter uses the [Frankfurter API](https://frankfurter.dev/). It shows the reference rate date, requires an internet connection and does not include bank fees. Conversions do not change the dashboard's euro transactions.

To reset the demo, remove the `saldo-v1` key from localStorage in the browser's developer tools and reload the page.

## Deployment

Import the repository into Vercel with these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | Repository root |
| Build command | `npm run build` |
| Output directory | `dist` |

No environment variables are required.

## Next steps

- Add transaction editing.
- Introduce monthly category budgets.
- Add CSV import with validation.
- Expand interaction tests and test the interface with users.

## Author

**Ana Brito** — Lisbon, Portugal

[GitHub](https://github.com/anabrito23)

## License

MIT. See [LICENSE](LICENSE).
