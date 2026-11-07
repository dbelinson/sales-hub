interface PlaceholderProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500">Dieser Bereich folgt in Kürze.</p>
    </div>
  );
}
