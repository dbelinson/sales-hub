import { useNavigate, Link } from "react-router-dom";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { MouseEvent } from "react";
import type { Customer } from "@/data/customers";
import StatusBadge from "@/components/StatusBadge";
import { formatDate, formatKwp } from "@/utils/format";

export type SortKey = "name" | "letzterKontakt";
export type SortDir = "asc" | "desc";

interface CustomerTableProps {
  customers: Customer[];
  sortKey: SortKey | null;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const headerCell = "px-5 py-3 text-left font-medium text-gray-700 whitespace-nowrap";
const bodyCell = "px-5 py-3 whitespace-nowrap";
const contactLinkClass = "text-blue-600 hover:text-blue-800 hover:underline";
const emptyValue = <span className="text-gray-400">–</span>;

const stopRowClick = (event: MouseEvent) => event.stopPropagation();

interface SortHeaderProps {
  label: string;
  column: SortKey;
  activeKey: SortKey | null;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

function SortHeader({ label, column, activeKey, sortDir, onSort }: SortHeaderProps) {
  const isActive = activeKey === column;
  const Icon = isActive ? (sortDir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <th className={headerCell}>
      <button
        type="button"
        onClick={() => onSort(column)}
        className={`inline-flex items-center gap-1 min-h-[40px] hover:text-blue-600 transition-colors ${
          isActive ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {label}
        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
      </button>
    </th>
  );
}

export default function CustomerTable({ customers, sortKey, sortDir, onSort }: CustomerTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <SortHeader label="Name" column="name" activeKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <th className={headerCell}>Firma</th>
            <th className={headerCell}>Branche</th>
            <th className={headerCell}>Anlagengröße kWp</th>
            <th className={headerCell}>Status</th>
            <SortHeader
              label="Letzter Kontakt"
              column="letzterKontakt"
              activeKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <th className={headerCell}>Telefon</th>
            <th className={headerCell}>E-Mail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-5 py-10 text-center text-gray-500">
                Keine Kunden gefunden.
              </td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate(`/kunden/${c.id}`)}
                className="cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <td className={`${bodyCell} font-medium`}>
                  <Link
                    to={`/kunden/${c.id}`}
                    onClick={stopRowClick}
                    className="text-gray-900 hover:text-blue-600 hover:underline"
                  >
                    {c.name}
                  </Link>
                </td>
                <td className={`${bodyCell} text-gray-700`}>{c.firma}</td>
                <td className={`${bodyCell} text-gray-700`}>{c.branche}</td>
                <td className={`${bodyCell} text-gray-700 tabular-nums`}>
                  {formatKwp(c.anlagengroesseKwp)}
                </td>
                <td className={bodyCell}>
                  <StatusBadge status={c.status} />
                </td>
                <td className={`${bodyCell} text-gray-700 tabular-nums`}>
                  {formatDate(c.letzterKontakt)}
                </td>
                <td className={bodyCell}>
                  {c.telefon ? (
                    <a
                      href={`tel:${c.telefon.replace(/\s/g, "")}`}
                      onClick={stopRowClick}
                      className={contactLinkClass}
                    >
                      {c.telefon}
                    </a>
                  ) : (
                    emptyValue
                  )}
                </td>
                <td className={bodyCell}>
                  {c.email ? (
                    <a href={`mailto:${c.email}`} onClick={stopRowClick} className={contactLinkClass}>
                      {c.email}
                    </a>
                  ) : (
                    emptyValue
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
