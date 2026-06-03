Tackling a full-stack financial marketplace in two weeks is an intense sprint, but it's entirely doable with strict scoping. This is exactly how you build production-grade engineering skills and shift into a junior developer mindset: by focusing on architecture, clean data validation, and delivering a functional MVP without over-engineering.  
Here is your deep-dive, step-by-step technical breakdown to get this built in 14 days.

### **Week 1: Core Foundations & The Marketplace**

The goal of this week is to get the database running, users authenticated, and the core marketplace feed (listings) working end-to-end.

#### **Days 1–2: Architecture & Wiring**

**Backend (Dev 1):**

* **Init Project:** Scaffold the Express app. Set up the exact folder structure (routes, controllers, services, middlewares, schemas).  
* **Prisma Setup:** Run npx prisma init. Connect it to your local PostgreSQL instance via .env.  
* **Standardize Responses:** Build a central error-handling middleware and a utility function to ensure *every* response strictly follows the { success, data, message } or { success, error, message } JSON format.  
* **Zod Config:** Set up your validation middleware so it catches bad request bodies before they ever reach your controllers.

**Frontend (Dev 2):**

* **Mini-App Init:** Scaffold the frontend using the required Ethio Telecom stack.  
* **Routing Foundation:** Set up your router with placeholders for Auth, Home, Profile, and Listing details.  
* **API Client:** Create an Axios or Fetch instance with the base URL (/api/v1/). Set up an interceptor to automatically attach Authorization: Bearer \<token\> to all requests.  
* **Design System:** Define your CSS variables/Tailwind config for colors, typography, and buttons so you don't waste time tweaking UI later.

#### **Days 3–4: Identity & Auth**

**Backend (Dev 1):**

* **Data Modeling:** Write the full schema.prisma file containing User, Listing, Transaction, and Review models. Run npx prisma migrate dev \--name init.  
* **Auth API:** Build POST /auth/register (hashing passwords if applicable, though you may rely on Telebirr identity) and POST /auth/login.  
* **JWT Middleware:** Create the authenticate middleware that verifies the token and attaches the user payload (req.user) to protected routes.

**Frontend (Dev 2):**

* **Auth UI:** Build the Login and Register screens. Crucially, include the role picker (Sharer, Taker, or Both).  
* **Token Management:** Handle the login response by storing the JWT securely (check Telebirr SDK docs for secure local storage).  
* **Auth Guards:** Write frontend logic that redirects unauthenticated users back to the login screen if they try to access protected views.

#### **Day 5: The Discovery Engine (Listings)**

**Backend (Dev 1):**

* **Listings CRUD:** Build the endpoints.  
  * POST /listings (requires Sharer role).  
  * GET /listings (implement Prisma queries to filter by subject, exam\_type, and status \= active).  
  * GET /listings/:id  
* **Validation:** Write tight Zod schemas ensuring prices are positive numbers and statuses only accept allowed enums.

**Frontend (Dev 2):**

* **Discovery UI:** Build the main feed where Takers browse listings.  
* **Components:** Build a clean, reusable ListingCard component showing subject, price, and the Sharer's rating.  
* **Integration:** Hook up the GET /listings API. Add a search bar and basic filter dropdowns for exam types.

### **Week 2: The Money & The Polish**

The goal of this week is the financial transaction flow. Since you are dealing with real money, state management and database transactions here must be bulletproof.

#### **Days 6–7: Transactions & Details**

**Backend (Dev 1):**

* **Transaction Math:** Build POST /transactions/initiate. When a Taker clicks buy, grab the listing price. Pull PLATFORM\_CUT\_PERCENT from .env. Calculate the platform\_cut and net\_to\_sharer.  
* **DB State:** Save the transaction in PostgreSQL with status: pending. Return the transaction\_id to the frontend.

**Frontend (Dev 2):**

* **Listing Detail:** Build the expanded view of a listing, showing the full description and a prominent "Book / Buy" CTA.  
* **Creation UI:** Build the "Create Listing" form for Sharers, ensuring frontend validation matches the backend's Zod requirements before submission.

#### **Days 8–9: Telebirr Payment Flow**

**Backend (Dev 1):**

* **Telebirr Outbound:** Write the service that formats the payload and calls the Telebirr payment initiation API using your TELEBIRR\_APP\_ID and keys.  
* **The Webhook (Critical):** Build the POST /payments/callback endpoint. This is where Telebirr tells you a payment succeeded.  
  * Verify the webhook signature (do not trust unverified pings).  
  * Use Prisma transactions (prisma.$transaction) to safely update the transaction to completed and update the Sharer's balance/status.

**Frontend (Dev 2):**

* **Native Trigger:** Wire the "Book" button to invoke the Telebirr SDK's native payment modal.  
* **State UI:** Build the "Payment Pending", "Success", and "Failed" screens. Ensure the app polls or waits for the webhook confirmation to show the user their receipt.

#### **Day 10: Reviews & Wrap-up**

**Backend (Dev 1):**

* **Reviews API:** Build POST /reviews. Ensure a user can only review a transaction that is marked completed and belongs to them.  
* **Auto-Calculation:** When a review is saved, write a Prisma aggregation query to recalculate the Sharer's rating\_avg and update their User record.

**Frontend (Dev 2):**

* **Profile Dashboards:** Build the Taker's "My Orders" screen and the Sharer's "Earnings/Active Listings" screen.  
* **Review Flow:** Add the UI for a Taker to leave 1-5 stars and a comment after a session is done.

To keep this moving quickly, you need to parallelize the work. While Dev 1 is wrestling with database migrations, Dev 2 should be building the UI components with mock JSON data.  
Which part of the tech stack feels like the biggest technical hurdle right now—the Telebirr webhook integration or the Prisma database modeling?