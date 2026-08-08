type InfoCardProps = {
  label: string;
  value: React.ReactNode;
  color?: string;
};

export function InfoCard1({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-gray-800">
        {value}
      </div>
    </div>
  );
}
export function InfoCard2({ label, value, color }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</div>
          <div className="mt-2">
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${color}`}>
              {value}
            </span>
          </div>
    </div>
  );
}
