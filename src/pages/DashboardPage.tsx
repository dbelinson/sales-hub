import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useCustomers } from "@/context/CustomersContext";
import StatCards from "@/components/StatCards";
import CustomerFilters, { type StatusFilter } from "@/components/CustomerFilters";
import CustomerTable, { type SortDir, type SortKey } from "@/components/CustomerTable";
import NewCustomerModal from "@/components/NewCustomerModal";

export default function DashboardPage() {
  const { customers } = useCustomers();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Alle");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleCustomers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("de");
    const filtered = customers.filter(
      (c) =>
        (statusFilter === "Alle" || c.status === statusFilter) &&
        (term === "" ||
          c.name.toLocaleLowerCase("de").includes(term) ||
          c.firma.toLocaleLowerCase("de").includes(term))
    );
    if (!sortKey) return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) =>
      sortKey === "name"
        ? a.name.localeCompare(b.name, "de") * dir
        : a.letzterKontakt.localeCompare(b.letzterKontakt) * dir
    );
  }, [customers, search, statusFilter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir("asc");
    }
  };

  return (
    <div>
      <StatCards customers={customers} />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Kunden</h1>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Neuer Kunde
          </button>
        </div>

        <CustomerFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <CustomerTable
          customers={visibleCustomers}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>

      {isModalOpen && <NewCustomerModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
