import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCustomers } from "@/context/CustomersContext";
import StatusBadge from "@/components/StatusBadge";
import { formatDate, formatKwp } from "@/utils/format";

const contactLinkClass = "text-blue-600 hover:text-blue-800 hover:underline break-all";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="mt-1 text-base text-gray-900">{children}</dd>
    </div>
  );
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { customers, notes, setNote } = useCustomers();
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Kunde nicht gefunden</h1>
        <p className="mt-2 text-sm text-gray-500">
          Dieser Kunde existiert nicht oder die Adresse ist fehlerhaft.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Liste
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zur Liste
      </Link>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 break-words">{customer.name}</h1>
            <p className="mt-1 text-gray-600">{customer.firma}</p>
          </div>
          <StatusBadge status={customer.status} />
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <Field label="Name">{customer.name}</Field>
          <Field label="Firma">{customer.firma}</Field>
          <Field label="Branche">{customer.branche}</Field>
          <Field label="Anlagengröße kWp">{formatKwp(customer.anlagengroesseKwp)}</Field>
          <Field label="Status">
            <StatusBadge status={customer.status} />
          </Field>
          <Field label="Letzter Kontakt">{formatDate(customer.letzterKontakt)}</Field>
          <Field label="Telefon">
            {customer.telefon ? (
              <a href={`tel:${customer.telefon.replace(/\s/g, "")}`} className={contactLinkClass}>
                {customer.telefon}
              </a>
            ) : (
              "–"
            )}
          </Field>
          <Field label="E-Mail">
            {customer.email ? (
              <a href={`mailto:${customer.email}`} className={contactLinkClass}>
                {customer.email}
              </a>
            ) : (
              "–"
            )}
          </Field>
        </dl>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notizen</h2>
        <textarea
          rows={8}
          value={notes[customer.id] ?? ""}
          onChange={(e) => setNote(customer.id, e.target.value)}
          placeholder="Notizen zu diesem Kunden …"
          className="w-full min-h-[200px] px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </section>
    </div>
  );
}
