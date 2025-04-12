require("dotenv").config();
const dwolla = require("dwolla-v2");

console.log("KEY:", process.env.DWOLLA_KEY);
console.log("SECRET:", process.env.DWOLLA_SECRET);

const dwollaClient = new dwolla.Client({
    key: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET,
    environment: "sandbox", // or "production"
});

(async () => {
    try {
        const requestBody = {
            firstName: "Jane",
            lastName: "Doe",
            email: `jane.doe.${Date.now()}@example.com`, // make email unique
            type: "personal",
            address1: "99-99 33rd St",
            city: "Some City",
            state: "NY",
            postalCode: "11111",
            dateOfBirth: "1980-01-01",
            ssn: "1234"
        };

        // ✅ Fix: Add `/` at the start of endpoint
        const res = await dwollaClient.post("/customers", requestBody);
        const customerUrl = res.headers.get("location");

        console.log("✅ Customer created at:", customerUrl);
    } catch (error) {
        console.error("❌ DWOLLA ERROR:", error.body || error);
    }
})();
