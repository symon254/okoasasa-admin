import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define color palettes
const colorPalettes = {
  gray: "bg-gray-100 text-gray-800 dark:bg-transparent dark:text-gray-400 border border-gray-400",
  green:
    "bg-green-100 text-green-800 dark:bg-transparent dark:text-green-400 border border-green-400",
  red: "bg-red-100 text-red-800 dark:bg-transparent dark:text-red-400 border border-red-400",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-transparent dark:text-yellow-400 border border-yellow-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-transparent dark:text-blue-400 border border-blue-400",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-transparent dark:text-purple-400 border border-purple-400",
  orange:
    "bg-orange-100 text-orange-800 dark:bg-transparent dark:text-orange-400 border border-orange-400",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-transparent dark:text-amber-400 border border-amber-400",
  rose: "bg-rose-100 text-rose-800 dark:bg-transparent dark:text-rose-400 border border-rose-400",
  fuchsia:
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-transparent dark:text-fuchsia-400 border border-fuchsia-400",
  lime: "bg-lime-100 text-lime-800 dark:bg-transparent dark:text-lime-400 border border-lime-400",
  cyan: "bg-cyan-100 text-cyan-800 dark:bg-transparent dark:text-cyan-400 border border-cyan-400",
  emerald:
    "bg-emerald-100 text-emerald-800 dark:bg-transparent dark:text-emerald-400 border border-emerald-400",
  teal: "bg-teal-100 text-teal-800 dark:bg-transparent dark:text-teal-400 border border-teal-400",
};

// Categorize variants by their color palette
const variantColorMappings = {
  green: [
    "success",
    "true",
    "yes",
    "accepted",
    "persms",
    "clerk",
    "complete",
    "verified",
    "new",
    "Paid",
    "transactionprocessed",
    "Full Paid",
    "processedsuccessfully",
  ],
  red: [
    "error",
    "false",
    "no",
    "damaged",
    "incomplete",
    "unverified",
    "hot",
    "lost",
    "notpaid",
    "Not Paid",
  ],
  yellow: ["warning", "lost", "perweek", "owner", "fuel", "credit", "warm"],
  blue: [
    "info",
    "personalized",
    "cash",
    "dispatched",
    "perday",
    "driver",
    "agent",
    "sms",
    "sacco",
    "ticketing",
    "cold",
    "assigned",
  ],
  purple: [
    "basic",
    "invoice",
    "delivered",
    "pertrip",
    "conductor",
    "official",
    "email",
    "station",
    "loading",
    "contacted",
    "licenseissued",
    "Single",
    "single",
  ],
  orange: [
    "cashless",
    "returned",
    "oneoff",
    "bank",
    "manifest",
    "qualified",
    "manual",
  ],
  amber: ["pending", "airtelmoney", "perticket", "bulksms", "Partial Payment"],
  rose: ["perannum", "parcelagent", "insurance", "chequebounced"],
  fuchsia: ["disposed", "permonth", "paybillintegration", "digitalpayment"],
  lime: [
    "mpesa",
    "collected",
    "perparcel",
    "stationmanager",
    "smsandemail",
    "vehicle",
    "ipn",
    "partialinvoicepayment",
    "Consolidated",
    "consolidated",
  ],
  cyan: [
    "received",
    "senderidapplication",
    "chequepayment",
    "processingtransaction",
  ],
  emerald: ["pernotification", "senderidmaintenance", "converted"],
  teal: ["perpassenger", "parcel", "mpesa-paybill", "chequecleared"],
  gray: ["default", "none"],
};

// Generate variant object
const generateVariants = () => {
  const variants = {};

  // Loop through each color group
  Object.entries(variantColorMappings).forEach(([color, variantList]) => {
    // For each variant, assign the color palette
    variantList.forEach((variant) => {
      variants[variant] = colorPalettes[color];
    });
  });

  return variants;
};

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: generateVariants(),
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Badge = ({ children, variant, className, ...props }) => {
  // Auto-detect variant if not provided
  const autoVariant =
    typeof children === "string"
      ? children.toLowerCase().replace(/\s+/g, "")
      : variant;

  return (
    <div
      className={cn(
        badgeVariants({
          variant: variant || autoVariant,
          className,
        }),
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
