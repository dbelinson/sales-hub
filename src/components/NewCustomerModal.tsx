import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { branchen, customerStatuses, type CustomerStatus } from "@/data/customers";
import { useCustomers } from "@/context/CustomersContext";
import { todayIso } from "@/utils/format";

interface NewCustomerModalProps {
  onClose: () => void;
}

interface FormValues {
  name: string;
  firma: string;
  branche: string;
  anlagengroesseKwp: string;
  status: CustomerStatus;
  letzterKontakt: string;
  telefon: string;
  email: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 min-h-[40px] text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

const parseKwp = (raw: string): number | null => {
  const normalized = raw.trim().replace(",", ".");
  if (normalized === "") return 0;
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  return Number(normalized);
};

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Bitte Name eingeben.";
  if (!values.firma.trim()) errors.firma = "Bitte Firma eingeben.";
  if (parseKwp(values.anlagengroesseKwp) === null) {
    errors.anlagengroesseKwp = "Bitte eine gültige Anlagengröße eingeben (nicht negativ).";
  }
  if (!values.letzterKontakt) errors.letzterKontakt = "Bitte Datum eingeben.";
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
  }
  return errors;
};

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, required, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function NewCustomerModal({ onClose }: NewCustomerModalProps) {
  const { addCustomer } = useCustomers();
  const [values, setValues] = useState<FormValues>(() => ({
    name: "",
    firma: "",
    branche: branchen[0],
    anlagengroesseKwp: "",
    status: "aktiv",
    letzterKontakt: todayIso(),
    telefon: "",
    email: "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const updateField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    addCustomer({
      name: values.name.trim(),
      firma: values.firma.trim(),
      branche: values.branche,
      anlagengroesseKwp: parseKwp(values.anlagengroesseKwp) ?? 0,
      status: values.status,
      letzterKontakt: values.letzterKontakt,
      telefon: values.telefon.trim(),
      email: values.email.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-customer-title"
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 id="new-customer-title" className="text-lg font-semibold text-gray-900">
            Neuer Kunde
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="inline-flex items-center justify-center p-2 min-h-[40px] min-w-[40px] rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-5">
          <p className="text-xs text-gray-500">Felder mit * sind Pflichtfelder.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Name" htmlFor="new-name" required error={errors.name}>
              <input
                id="new-name"
                type="text"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-invalid={!!errors.name}
                className={inputClass(!!errors.name)}
              />
            </Field>

            <Field label="Firma" htmlFor="new-firma" required error={errors.firma}>
              <input
                id="new-firma"
                type="text"
                value={values.firma}
                onChange={(e) => updateField("firma", e.target.value)}
                aria-invalid={!!errors.firma}
                className={inputClass(!!errors.firma)}
              />
            </Field>

            <Field label="Branche" htmlFor="new-branche">
              <select
                id="new-branche"
                value={values.branche}
                onChange={(e) => updateField("branche", e.target.value)}
                className={inputClass(false)}
              >
                {branchen.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Anlagengröße kWp" htmlFor="new-kwp" error={errors.anlagengroesseKwp}>
              <input
                id="new-kwp"
                type="text"
                inputMode="decimal"
                placeholder="z. B. 84,5"
                value={values.anlagengroesseKwp}
                onChange={(e) => updateField("anlagengroesseKwp", e.target.value)}
                aria-invalid={!!errors.anlagengroesseKwp}
                className={inputClass(!!errors.anlagengroesseKwp)}
              />
            </Field>

            <Field label="Status" htmlFor="new-status">
              <select
                id="new-status"
                value={values.status}
                onChange={(e) => updateField("status", e.target.value as CustomerStatus)}
                className={inputClass(false)}
              >
                {customerStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Letzter Kontakt" htmlFor="new-kontakt" required error={errors.letzterKontakt}>
              <input
                id="new-kontakt"
                type="date"
                value={values.letzterKontakt}
                onChange={(e) => updateField("letzterKontakt", e.target.value)}
                aria-invalid={!!errors.letzterKontakt}
                className={inputClass(!!errors.letzterKontakt)}
              />
            </Field>

            <Field label="Telefon" htmlFor="new-telefon">
              <input
                id="new-telefon"
                type="tel"
                value={values.telefon}
                onChange={(e) => updateField("telefon", e.target.value)}
                className={inputClass(false)}
              />
            </Field>

            <Field label="E-Mail" htmlFor="new-email" error={errors.email} className="sm:col-span-2">
              <input
                id="new-email"
                type="email"
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={!!errors.email}
                className={inputClass(!!errors.email)}
              />
            </Field>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 min-h-[40px] text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 min-h-[40px] text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
