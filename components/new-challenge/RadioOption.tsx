"use client";

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  extra?: string;
  extraType?: "discount" | "addition";
  badge?: string;
}

const RadioOption = ({
  label,
  selected,
  onClick,
  extra,
  extraType = "addition",
  badge,
}: RadioOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-4 py-4 rounded-xl border transition-all duration-300 w-full text-left group
        ${
          selected
            ? "card-premium hover:border-[#2d3748] "
            : " card-premium-border hover:border-[#2d3748]"
        }`}
    >
      {/* Radio circle */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0
          ${
            selected
              ? "border-green-600 bg-green-600"
              : "border-gray-600 group-hover:border-gray-500"
          }`}
      >
        {selected && (
          <div className="w-2 h-2 bg-white rounded-full animate-scale-in" />
        )}
      </div>

      {/* Label */}
      <span
        className={`text-sm font-medium transition-colors ${
          selected ? "text-white" : "text-gray-400 group-hover:text-gray-300"
        }`}
      >
        {label}
      </span>

      {/* Extra price indicator */}
      {extra && (
        <span
          className={`ml-auto text-xs font-medium ${
            extraType === "discount" ? "text-green-400" : "text-gray-500"
          }`}
        >
          {extra}
        </span>
      )}

      {/* Badge */}
      {badge && (
        <span className="ml-auto text-xs text-gray-500 font-medium">
          {badge}
        </span>
      )}
    </button>
  );
};

export default RadioOption;
