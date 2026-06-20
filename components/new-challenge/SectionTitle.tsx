interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-white font-semibold text-sm">{title}</h3>
      <p className="text-white/50 text-xs mt-0.5">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
