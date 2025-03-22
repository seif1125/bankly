export const sidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/icons/dollar-circle.svg",
      route: "/my-banks",
      label: "My Banks",
    },
    {
      imgURL: "/icons/transaction.svg",
      route: "/transactions-history",
      label: "Transaction History",
    },
    {
      imgURL: "/icons/money-send.svg",
      route: "/payment-transfer",
      label: "Transfer Funds",
    },]

    import { z } from 'zod'

    export const loginSchema = z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    })
    