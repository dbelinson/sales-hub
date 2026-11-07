import type { CustomerStatus } from "@/data/customers";

const badgeClasses: Record<CustomerStatus, string> = {
  aktiv: "bg-green-100 text-green-800",
  "in Wartung": "bg-orange-100 text-orange-800",
  Beschwerde: "bg-red-100 text-red-800",
};

interface StatusBadgeProps {
  status: CustomerStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${badgeClasses[status]}`}
    >
      {status}
    </span>
  );
}
