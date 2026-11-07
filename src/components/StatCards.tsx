import { AlertTriangle, Users, Wrench, type LucideIcon } from "lucide-react";
import type { Customer } from "@/data/customers";

interface StatCardsProps {
  customers: Customer[];
}

export default function StatCards({ customers }: StatCardsProps) {
  const countWithStatus = (status: Customer["status"]) =>
    customers.filter((c) => c.status === status).length;

  const cards: {
    title: string;
    value: number;
    accent: string;
    iconBg: string;
    iconColor: string;
    Icon: LucideIcon;
  }[] = [
    {
      title: "Aktive Kunden",
      value: countWithStatus("aktiv"),
      accent: "bg-green-500",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      Icon: Users,
    },
    {
      title: "In Wartung",
      value: countWithStatus("in Wartung"),
      accent: "bg-orange-500",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      Icon: Wrench,
    },
    {
      title: "Beschwerden",
      value: countWithStatus("Beschwerde"),
      accent: "bg-red-500",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      Icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map(({ title, value, accent, iconBg, iconColor, Icon }) => (
        <div
          key={title}
          className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 relative overflow-hidden"
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent}`} />
          <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0 ml-1`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 truncate">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
