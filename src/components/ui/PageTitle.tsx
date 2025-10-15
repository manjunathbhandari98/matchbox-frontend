export const PageTitle = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm opacity-80 font-medium">{desc}</p>
    </div>
  );
};
