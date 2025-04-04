// src/lib/plaid.ts
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

export const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments.sandbox, // Change to 'development' or 'production'
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
        "PLAID-SECRET": process.env.PLAID_SECRET!,
      },
    },
  })
);
