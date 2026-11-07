import { Search } from "lucide-react";
import { customerStatuses, type CustomerStatus } from "@/data/customers";

export type StatusFilter = "Alle" | CustomerStatus;

const filterOptions: StatusFilter[] = ["Alle", ...customerStatuses];

interface CustomerFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
}

export default function CustomerFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: CustomerFiltersProps) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
      <div className="relative md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Suche nach Name oder Firma …"
          aria-label="Suche nach Name oder Firma"
          className="w-full pl-9 pr-3 py-2 min-h-[40px] text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div role="group" aria-label="Status filtern" className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const active = option === statusFilter;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onStatusFilterChange(option)}
              className={`px-3 py-2 min-h-[40px] rounded-full text-sm font-medium border transition-colors ${
                active
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
