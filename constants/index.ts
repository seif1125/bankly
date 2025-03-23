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
export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),

    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),

    country: z
      .string()
      .min(1, { message: "Country is required" }),

    mobile: z
      .string()
      .regex(/^\+\d{1,4}\d{6,14}$/, {
        message: "Enter a valid mobile number with country code (e.g., +97112345678)",
      }),

    email: z
      .string()
      .email({ message: "Enter a valid email" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),

    confirmPassword: z.string(),

    dateOfBirth: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Enter a valid date",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  export const countries = [
    {
      "label": "Aruba",
      "value": "aw",
      "icon": "\ud83c\udde6\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Afghanistan",
      "value": "af",
      "icon": "\ud83c\udde6\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Angola",
      "value": "ao",
      "icon": "\ud83c\udde6\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Anguilla",
      "value": "ai",
      "icon": "\ud83c\udde6\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "\u00c5land Islands",
      "value": "ax",
      "icon": "\ud83c\udde6\ud83c\uddfd",
      "dialCode": ""
    },
    {
      "label": "Albania",
      "value": "al",
      "icon": "\ud83c\udde6\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Andorra",
      "value": "ad",
      "icon": "\ud83c\udde6\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "United Arab Emirates",
      "value": "ae",
      "icon": "\ud83c\udde6\ud83c\uddea",
      "dialCode": "+971"
    },
    {
      "label": "Argentina",
      "value": "ar",
      "icon": "\ud83c\udde6\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Armenia",
      "value": "am",
      "icon": "\ud83c\udde6\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "American Samoa",
      "value": "as",
      "icon": "\ud83c\udde6\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Antarctica",
      "value": "aq",
      "icon": "\ud83c\udde6\ud83c\uddf6",
      "dialCode": ""
    },
    {
      "label": "French Southern Territories",
      "value": "tf",
      "icon": "\ud83c\uddf9\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Antigua and Barbuda",
      "value": "ag",
      "icon": "\ud83c\udde6\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Australia",
      "value": "au",
      "icon": "\ud83c\udde6\ud83c\uddfa",
      "dialCode": "+61"
    },
    {
      "label": "Austria",
      "value": "at",
      "icon": "\ud83c\udde6\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Azerbaijan",
      "value": "az",
      "icon": "\ud83c\udde6\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Burundi",
      "value": "bi",
      "icon": "\ud83c\udde7\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Belgium",
      "value": "be",
      "icon": "\ud83c\udde7\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Benin",
      "value": "bj",
      "icon": "\ud83c\udde7\ud83c\uddef",
      "dialCode": ""
    },
    {
      "label": "Bonaire, Sint Eustatius and Saba",
      "value": "bq",
      "icon": "\ud83c\udde7\ud83c\uddf6",
      "dialCode": ""
    },
    {
      "label": "Burkina Faso",
      "value": "bf",
      "icon": "\ud83c\udde7\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Bangladesh",
      "value": "bd",
      "icon": "\ud83c\udde7\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Bulgaria",
      "value": "bg",
      "icon": "\ud83c\udde7\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Bahrain",
      "value": "bh",
      "icon": "\ud83c\udde7\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Bahamas",
      "value": "bs",
      "icon": "\ud83c\udde7\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Bosnia and Herzegovina",
      "value": "ba",
      "icon": "\ud83c\udde7\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "Saint Barth\u00e9lemy",
      "value": "bl",
      "icon": "\ud83c\udde7\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Belarus",
      "value": "by",
      "icon": "\ud83c\udde7\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Belize",
      "value": "bz",
      "icon": "\ud83c\udde7\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Bermuda",
      "value": "bm",
      "icon": "\ud83c\udde7\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Bolivia, Plurinational State of",
      "value": "bo",
      "icon": "\ud83c\udde7\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Brazil",
      "value": "br",
      "icon": "\ud83c\udde7\ud83c\uddf7",
      "dialCode": "+55"
    },
    {
      "label": "Barbados",
      "value": "bb",
      "icon": "\ud83c\udde7\ud83c\udde7",
      "dialCode": ""
    },
    {
      "label": "Brunei Darussalam",
      "value": "bn",
      "icon": "\ud83c\udde7\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Bhutan",
      "value": "bt",
      "icon": "\ud83c\udde7\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Bouvet Island",
      "value": "bv",
      "icon": "\ud83c\udde7\ud83c\uddfb",
      "dialCode": ""
    },
    {
      "label": "Botswana",
      "value": "bw",
      "icon": "\ud83c\udde7\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Central African Republic",
      "value": "cf",
      "icon": "\ud83c\udde8\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Canada",
      "value": "ca",
      "icon": "\ud83c\udde8\ud83c\udde6",
      "dialCode": "+1"
    },
    {
      "label": "Cocos (Keeling) Islands",
      "value": "cc",
      "icon": "\ud83c\udde8\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Switzerland",
      "value": "ch",
      "icon": "\ud83c\udde8\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Chile",
      "value": "cl",
      "icon": "\ud83c\udde8\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "China",
      "value": "cn",
      "icon": "\ud83c\udde8\ud83c\uddf3",
      "dialCode": "+86"
    },
    {
      "label": "C\u00f4te d'Ivoire",
      "value": "ci",
      "icon": "\ud83c\udde8\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Cameroon",
      "value": "cm",
      "icon": "\ud83c\udde8\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Congo, The Democratic Republic of the",
      "value": "cd",
      "icon": "\ud83c\udde8\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Congo",
      "value": "cg",
      "icon": "\ud83c\udde8\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Cook Islands",
      "value": "ck",
      "icon": "\ud83c\udde8\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Colombia",
      "value": "co",
      "icon": "\ud83c\udde8\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Comoros",
      "value": "km",
      "icon": "\ud83c\uddf0\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Cabo Verde",
      "value": "cv",
      "icon": "\ud83c\udde8\ud83c\uddfb",
      "dialCode": ""
    },
    {
      "label": "Costa Rica",
      "value": "cr",
      "icon": "\ud83c\udde8\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Cuba",
      "value": "cu",
      "icon": "\ud83c\udde8\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Cura\u00e7ao",
      "value": "cw",
      "icon": "\ud83c\udde8\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Christmas Island",
      "value": "cx",
      "icon": "\ud83c\udde8\ud83c\uddfd",
      "dialCode": ""
    },
    {
      "label": "Cayman Islands",
      "value": "ky",
      "icon": "\ud83c\uddf0\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Cyprus",
      "value": "cy",
      "icon": "\ud83c\udde8\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Czechia",
      "value": "cz",
      "icon": "\ud83c\udde8\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Germany",
      "value": "de",
      "icon": "\ud83c\udde9\ud83c\uddea",
      "dialCode": "+49"
    },
    {
      "label": "Djibouti",
      "value": "dj",
      "icon": "\ud83c\udde9\ud83c\uddef",
      "dialCode": ""
    },
    {
      "label": "Dominica",
      "value": "dm",
      "icon": "\ud83c\udde9\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Denmark",
      "value": "dk",
      "icon": "\ud83c\udde9\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Dominican Republic",
      "value": "do",
      "icon": "\ud83c\udde9\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Algeria",
      "value": "dz",
      "icon": "\ud83c\udde9\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Ecuador",
      "value": "ec",
      "icon": "\ud83c\uddea\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Egypt",
      "value": "eg",
      "icon": "\ud83c\uddea\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Eritrea",
      "value": "er",
      "icon": "\ud83c\uddea\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Western Sahara",
      "value": "eh",
      "icon": "\ud83c\uddea\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Spain",
      "value": "es",
      "icon": "\ud83c\uddea\ud83c\uddf8",
      "dialCode": "+34"
    },
    {
      "label": "Estonia",
      "value": "ee",
      "icon": "\ud83c\uddea\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Ethiopia",
      "value": "et",
      "icon": "\ud83c\uddea\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Finland",
      "value": "fi",
      "icon": "\ud83c\uddeb\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Fiji",
      "value": "fj",
      "icon": "\ud83c\uddeb\ud83c\uddef",
      "dialCode": ""
    },
    {
      "label": "Falkland Islands (Malvinas)",
      "value": "fk",
      "icon": "\ud83c\uddeb\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "France",
      "value": "fr",
      "icon": "\ud83c\uddeb\ud83c\uddf7",
      "dialCode": "+33"
    },
    {
      "label": "Faroe Islands",
      "value": "fo",
      "icon": "\ud83c\uddeb\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Micronesia, Federated States of",
      "value": "fm",
      "icon": "\ud83c\uddeb\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Gabon",
      "value": "ga",
      "icon": "\ud83c\uddec\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "United Kingdom",
      "value": "gb",
      "icon": "\ud83c\uddec\ud83c\udde7",
      "dialCode": "+44"
    },
    {
      "label": "Georgia",
      "value": "ge",
      "icon": "\ud83c\uddec\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Guernsey",
      "value": "gg",
      "icon": "\ud83c\uddec\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Ghana",
      "value": "gh",
      "icon": "\ud83c\uddec\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Gibraltar",
      "value": "gi",
      "icon": "\ud83c\uddec\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Guinea",
      "value": "gn",
      "icon": "\ud83c\uddec\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Guadeloupe",
      "value": "gp",
      "icon": "\ud83c\uddec\ud83c\uddf5",
      "dialCode": ""
    },
    {
      "label": "Gambia",
      "value": "gm",
      "icon": "\ud83c\uddec\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Guinea-Bissau",
      "value": "gw",
      "icon": "\ud83c\uddec\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Equatorial Guinea",
      "value": "gq",
      "icon": "\ud83c\uddec\ud83c\uddf6",
      "dialCode": ""
    },
    {
      "label": "Greece",
      "value": "gr",
      "icon": "\ud83c\uddec\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Grenada",
      "value": "gd",
      "icon": "\ud83c\uddec\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Greenland",
      "value": "gl",
      "icon": "\ud83c\uddec\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Guatemala",
      "value": "gt",
      "icon": "\ud83c\uddec\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "French Guiana",
      "value": "gf",
      "icon": "\ud83c\uddec\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Guam",
      "value": "gu",
      "icon": "\ud83c\uddec\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Guyana",
      "value": "gy",
      "icon": "\ud83c\uddec\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Hong Kong",
      "value": "hk",
      "icon": "\ud83c\udded\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Heard Island and McDonald Islands",
      "value": "hm",
      "icon": "\ud83c\udded\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Honduras",
      "value": "hn",
      "icon": "\ud83c\udded\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Croatia",
      "value": "hr",
      "icon": "\ud83c\udded\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Haiti",
      "value": "ht",
      "icon": "\ud83c\udded\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Hungary",
      "value": "hu",
      "icon": "\ud83c\udded\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Indonesia",
      "value": "id",
      "icon": "\ud83c\uddee\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Isle of Man",
      "value": "im",
      "icon": "\ud83c\uddee\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "India",
      "value": "in",
      "icon": "\ud83c\uddee\ud83c\uddf3",
      "dialCode": "+91"
    },
    {
      "label": "British Indian Ocean Territory",
      "value": "io",
      "icon": "\ud83c\uddee\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Ireland",
      "value": "ie",
      "icon": "\ud83c\uddee\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Iran, Islamic Republic of",
      "value": "ir",
      "icon": "\ud83c\uddee\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Iraq",
      "value": "iq",
      "icon": "\ud83c\uddee\ud83c\uddf6",
      "dialCode": ""
    },
    {
      "label": "Iceland",
      "value": "is",
      "icon": "\ud83c\uddee\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Israel",
      "value": "il",
      "icon": "\ud83c\uddee\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Italy",
      "value": "it",
      "icon": "\ud83c\uddee\ud83c\uddf9",
      "dialCode": "+39"
    },
    {
      "label": "Jamaica",
      "value": "jm",
      "icon": "\ud83c\uddef\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Jersey",
      "value": "je",
      "icon": "\ud83c\uddef\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Jordan",
      "value": "jo",
      "icon": "\ud83c\uddef\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Japan",
      "value": "jp",
      "icon": "\ud83c\uddef\ud83c\uddf5",
      "dialCode": "+81"
    },
    {
      "label": "Kazakhstan",
      "value": "kz",
      "icon": "\ud83c\uddf0\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Kenya",
      "value": "ke",
      "icon": "\ud83c\uddf0\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Kyrgyzstan",
      "value": "kg",
      "icon": "\ud83c\uddf0\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Cambodia",
      "value": "kh",
      "icon": "\ud83c\uddf0\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Kiribati",
      "value": "ki",
      "icon": "\ud83c\uddf0\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Saint Kitts and Nevis",
      "value": "kn",
      "icon": "\ud83c\uddf0\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Korea, Republic of",
      "value": "kr",
      "icon": "\ud83c\uddf0\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Kuwait",
      "value": "kw",
      "icon": "\ud83c\uddf0\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Lao People's Democratic Republic",
      "value": "la",
      "icon": "\ud83c\uddf1\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "Lebanon",
      "value": "lb",
      "icon": "\ud83c\uddf1\ud83c\udde7",
      "dialCode": ""
    },
    {
      "label": "Liberia",
      "value": "lr",
      "icon": "\ud83c\uddf1\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Libya",
      "value": "ly",
      "icon": "\ud83c\uddf1\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Saint Lucia",
      "value": "lc",
      "icon": "\ud83c\uddf1\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Liechtenstein",
      "value": "li",
      "icon": "\ud83c\uddf1\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Sri Lanka",
      "value": "lk",
      "icon": "\ud83c\uddf1\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Lesotho",
      "value": "ls",
      "icon": "\ud83c\uddf1\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Lithuania",
      "value": "lt",
      "icon": "\ud83c\uddf1\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Luxembourg",
      "value": "lu",
      "icon": "\ud83c\uddf1\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Latvia",
      "value": "lv",
      "icon": "\ud83c\uddf1\ud83c\uddfb",
      "dialCode": ""
    },
    {
      "label": "Macao",
      "value": "mo",
      "icon": "\ud83c\uddf2\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Saint Martin (French part)",
      "value": "mf",
      "icon": "\ud83c\uddf2\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Morocco",
      "value": "ma",
      "icon": "\ud83c\uddf2\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "Monaco",
      "value": "mc",
      "icon": "\ud83c\uddf2\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Moldova, Republic of",
      "value": "md",
      "icon": "\ud83c\uddf2\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Madagascar",
      "value": "mg",
      "icon": "\ud83c\uddf2\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Maldives",
      "value": "mv",
      "icon": "\ud83c\uddf2\ud83c\uddfb",
      "dialCode": ""
    },
    {
      "label": "Mexico",
      "value": "mx",
      "icon": "\ud83c\uddf2\ud83c\uddfd",
      "dialCode": ""
    },
    {
      "label": "Marshall Islands",
      "value": "mh",
      "icon": "\ud83c\uddf2\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "North Macedonia",
      "value": "mk",
      "icon": "\ud83c\uddf2\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Mali",
      "value": "ml",
      "icon": "\ud83c\uddf2\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Malta",
      "value": "mt",
      "icon": "\ud83c\uddf2\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Myanmar",
      "value": "mm",
      "icon": "\ud83c\uddf2\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Montenegro",
      "value": "me",
      "icon": "\ud83c\uddf2\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Mongolia",
      "value": "mn",
      "icon": "\ud83c\uddf2\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Northern Mariana Islands",
      "value": "mp",
      "icon": "\ud83c\uddf2\ud83c\uddf5",
      "dialCode": ""
    },
    {
      "label": "Mozambique",
      "value": "mz",
      "icon": "\ud83c\uddf2\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Mauritania",
      "value": "mr",
      "icon": "\ud83c\uddf2\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Montserrat",
      "value": "ms",
      "icon": "\ud83c\uddf2\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Martinique",
      "value": "mq",
      "icon": "\ud83c\uddf2\ud83c\uddf6",
      "dialCode": ""
    },
    {
      "label": "Mauritius",
      "value": "mu",
      "icon": "\ud83c\uddf2\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Malawi",
      "value": "mw",
      "icon": "\ud83c\uddf2\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Malaysia",
      "value": "my",
      "icon": "\ud83c\uddf2\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Mayotte",
      "value": "yt",
      "icon": "\ud83c\uddfe\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Namibia",
      "value": "na",
      "icon": "\ud83c\uddf3\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "New Caledonia",
      "value": "nc",
      "icon": "\ud83c\uddf3\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Niger",
      "value": "ne",
      "icon": "\ud83c\uddf3\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Norfolk Island",
      "value": "nf",
      "icon": "\ud83c\uddf3\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Nigeria",
      "value": "ng",
      "icon": "\ud83c\uddf3\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Nicaragua",
      "value": "ni",
      "icon": "\ud83c\uddf3\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Niue",
      "value": "nu",
      "icon": "\ud83c\uddf3\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Netherlands",
      "value": "nl",
      "icon": "\ud83c\uddf3\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Norway",
      "value": "no",
      "icon": "\ud83c\uddf3\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Nepal",
      "value": "np",
      "icon": "\ud83c\uddf3\ud83c\uddf5",
      "dialCode": ""
    },
    {
      "label": "Nauru",
      "value": "nr",
      "icon": "\ud83c\uddf3\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "New Zealand",
      "value": "nz",
      "icon": "\ud83c\uddf3\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Oman",
      "value": "om",
      "icon": "\ud83c\uddf4\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Pakistan",
      "value": "pk",
      "icon": "\ud83c\uddf5\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Panama",
      "value": "pa",
      "icon": "\ud83c\uddf5\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "Pitcairn",
      "value": "pn",
      "icon": "\ud83c\uddf5\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Peru",
      "value": "pe",
      "icon": "\ud83c\uddf5\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Philippines",
      "value": "ph",
      "icon": "\ud83c\uddf5\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Palau",
      "value": "pw",
      "icon": "\ud83c\uddf5\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Papua New Guinea",
      "value": "pg",
      "icon": "\ud83c\uddf5\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Poland",
      "value": "pl",
      "icon": "\ud83c\uddf5\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Puerto Rico",
      "value": "pr",
      "icon": "\ud83c\uddf5\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Korea, Democratic People's Republic of",
      "value": "kp",
      "icon": "\ud83c\uddf0\ud83c\uddf5",
      "dialCode": ""
    },
    {
      "label": "Portugal",
      "value": "pt",
      "icon": "\ud83c\uddf5\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Paraguay",
      "value": "py",
      "icon": "\ud83c\uddf5\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Palestine, State of",
      "value": "ps",
      "icon": "\ud83c\uddf5\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "French Polynesia",
      "value": "pf",
      "icon": "\ud83c\uddf5\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Qatar",
      "value": "qa",
      "icon": "\ud83c\uddf6\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "R\u00e9union",
      "value": "re",
      "icon": "\ud83c\uddf7\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Romania",
      "value": "ro",
      "icon": "\ud83c\uddf7\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Russian Federation",
      "value": "ru",
      "icon": "\ud83c\uddf7\ud83c\uddfa",
      "dialCode": "+7"
    },
    {
      "label": "Rwanda",
      "value": "rw",
      "icon": "\ud83c\uddf7\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Saudi Arabia",
      "value": "sa",
      "icon": "\ud83c\uddf8\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "Sudan",
      "value": "sd",
      "icon": "\ud83c\uddf8\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Senegal",
      "value": "sn",
      "icon": "\ud83c\uddf8\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Singapore",
      "value": "sg",
      "icon": "\ud83c\uddf8\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "South Georgia and the South Sandwich Islands",
      "value": "gs",
      "icon": "\ud83c\uddec\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Saint Helena, Ascension and Tristan da Cunha",
      "value": "sh",
      "icon": "\ud83c\uddf8\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Svalbard and Jan Mayen",
      "value": "sj",
      "icon": "\ud83c\uddf8\ud83c\uddef",
      "dialCode": ""
    },
    {
      "label": "Solomon Islands",
      "value": "sb",
      "icon": "\ud83c\uddf8\ud83c\udde7",
      "dialCode": ""
    },
    {
      "label": "Sierra Leone",
      "value": "sl",
      "icon": "\ud83c\uddf8\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "El Salvador",
      "value": "sv",
      "icon": "\ud83c\uddf8\ud83c\uddfb",
      "dialCode": ""
    },
    {
      "label": "San Marino",
      "value": "sm",
      "icon": "\ud83c\uddf8\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Somalia",
      "value": "so",
      "icon": "\ud83c\uddf8\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Saint Pierre and Miquelon",
      "value": "pm",
      "icon": "\ud83c\uddf5\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Serbia",
      "value": "rs",
      "icon": "\ud83c\uddf7\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "South Sudan",
      "value": "ss",
      "icon": "\ud83c\uddf8\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Sao Tome and Principe",
      "value": "st",
      "icon": "\ud83c\uddf8\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Suriname",
      "value": "sr",
      "icon": "\ud83c\uddf8\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Slovakia",
      "value": "sk",
      "icon": "\ud83c\uddf8\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Slovenia",
      "value": "si",
      "icon": "\ud83c\uddf8\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Sweden",
      "value": "se",
      "icon": "\ud83c\uddf8\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Eswatini",
      "value": "sz",
      "icon": "\ud83c\uddf8\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Sint Maarten (Dutch part)",
      "value": "sx",
      "icon": "\ud83c\uddf8\ud83c\uddfd",
      "dialCode": ""
    },
    {
      "label": "Seychelles",
      "value": "sc",
      "icon": "\ud83c\uddf8\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Syrian Arab Republic",
      "value": "sy",
      "icon": "\ud83c\uddf8\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "Turks and Caicos Islands",
      "value": "tc",
      "icon": "\ud83c\uddf9\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Chad",
      "value": "td",
      "icon": "\ud83c\uddf9\ud83c\udde9",
      "dialCode": ""
    },
    {
      "label": "Togo",
      "value": "tg",
      "icon": "\ud83c\uddf9\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Thailand",
      "value": "th",
      "icon": "\ud83c\uddf9\ud83c\udded",
      "dialCode": ""
    },
    {
      "label": "Tajikistan",
      "value": "tj",
      "icon": "\ud83c\uddf9\ud83c\uddef",
      "dialCode": ""
    },
    {
      "label": "Tokelau",
      "value": "tk",
      "icon": "\ud83c\uddf9\ud83c\uddf0",
      "dialCode": ""
    },
    {
      "label": "Turkmenistan",
      "value": "tm",
      "icon": "\ud83c\uddf9\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Timor-Leste",
      "value": "tl",
      "icon": "\ud83c\uddf9\ud83c\uddf1",
      "dialCode": ""
    },
    {
      "label": "Tonga",
      "value": "to",
      "icon": "\ud83c\uddf9\ud83c\uddf4",
      "dialCode": ""
    },
    {
      "label": "Trinidad and Tobago",
      "value": "tt",
      "icon": "\ud83c\uddf9\ud83c\uddf9",
      "dialCode": ""
    },
    {
      "label": "Tunisia",
      "value": "tn",
      "icon": "\ud83c\uddf9\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Turkey",
      "value": "tr",
      "icon": "\ud83c\uddf9\ud83c\uddf7",
      "dialCode": ""
    },
    {
      "label": "Tuvalu",
      "value": "tv",
      "icon": "\ud83c\uddf9\ud83c\uddfb",
      "dialCode": ""
    },
    {
      "label": "Taiwan, Province of China",
      "value": "tw",
      "icon": "\ud83c\uddf9\ud83c\uddfc",
      "dialCode": ""
    },
    {
      "label": "Tanzania, United Republic of",
      "value": "tz",
      "icon": "\ud83c\uddf9\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Uganda",
      "value": "ug",
      "icon": "\ud83c\uddfa\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Ukraine",
      "value": "ua",
      "icon": "\ud83c\uddfa\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "United States Minor Outlying Islands",
      "value": "um",
      "icon": "\ud83c\uddfa\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Uruguay",
      "value": "uy",
      "icon": "\ud83c\uddfa\ud83c\uddfe",
      "dialCode": ""
    },
    {
      "label": "United States",
      "value": "us",
      "icon": "\ud83c\uddfa\ud83c\uddf8",
      "dialCode": "+1"
    },
    {
      "label": "Uzbekistan",
      "value": "uz",
      "icon": "\ud83c\uddfa\ud83c\uddff",
      "dialCode": ""
    },
    {
      "label": "Holy See (Vatican City State)",
      "value": "va",
      "icon": "\ud83c\uddfb\ud83c\udde6",
      "dialCode": ""
    },
    {
      "label": "Saint Vincent and the Grenadines",
      "value": "vc",
      "icon": "\ud83c\uddfb\ud83c\udde8",
      "dialCode": ""
    },
    {
      "label": "Venezuela, Bolivarian Republic of",
      "value": "ve",
      "icon": "\ud83c\uddfb\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "Virgin Islands, British",
      "value": "vg",
      "icon": "\ud83c\uddfb\ud83c\uddec",
      "dialCode": ""
    },
    {
      "label": "Virgin Islands, U.S.",
      "value": "vi",
      "icon": "\ud83c\uddfb\ud83c\uddee",
      "dialCode": ""
    },
    {
      "label": "Viet Nam",
      "value": "vn",
      "icon": "\ud83c\uddfb\ud83c\uddf3",
      "dialCode": ""
    },
    {
      "label": "Vanuatu",
      "value": "vu",
      "icon": "\ud83c\uddfb\ud83c\uddfa",
      "dialCode": ""
    },
    {
      "label": "Wallis and Futuna",
      "value": "wf",
      "icon": "\ud83c\uddfc\ud83c\uddeb",
      "dialCode": ""
    },
    {
      "label": "Samoa",
      "value": "ws",
      "icon": "\ud83c\uddfc\ud83c\uddf8",
      "dialCode": ""
    },
    {
      "label": "Yemen",
      "value": "ye",
      "icon": "\ud83c\uddfe\ud83c\uddea",
      "dialCode": ""
    },
    {
      "label": "South Africa",
      "value": "za",
      "icon": "\ud83c\uddff\ud83c\udde6",
      "dialCode": "+27"
    },
    {
      "label": "Zambia",
      "value": "zm",
      "icon": "\ud83c\uddff\ud83c\uddf2",
      "dialCode": ""
    },
    {
      "label": "Zimbabwe",
      "value": "zw",
      "icon": "\ud83c\uddff\ud83c\uddfc",
      "dialCode": ""
    }
  ];
  