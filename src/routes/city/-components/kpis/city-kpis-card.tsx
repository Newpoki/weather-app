type CityKPIsCardProps = {
  label: string;
  value: string | undefined;
};

export const CityKPIsCard = ({ label, value }: CityKPIsCardProps) => {
  return (
    <li className="bg-card text-card-foreground border-border flex flex-col gap-6 rounded-[12px] border p-5">
      <h4 className="text-preset-6 text-muted-foreground">{label}</h4>
      <p className="text-preset-3">{value ?? "-"}</p>
    </li>
  );
};
