import Dwolla from 'dwolla-v2';

const DWOLLA_KEY = process.env.DWOLLA_KEY!;
const DWOLLA_SECRET = process.env.DWOLLA_SECRET!;
export const dwollaClient = new Dwolla.Client({
  key: DWOLLA_KEY,
  secret: DWOLLA_SECRET,
  environment: 'sandbox',
});
