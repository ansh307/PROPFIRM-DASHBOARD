"use client";

import { FiSliders } from "react-icons/fi";
import RadioOption from "./RadioOption";

interface CustomizeRulesProps {
  profitTarget: string;
  onProfitTargetChange: (value: string) => void;
  discountAmount: number;
}

const CustomizeRules = ({
  profitTarget,
  onProfitTargetChange,
  discountAmount,
}: CustomizeRulesProps) => {
  return (
    <div className="card-premium rounded-2xl  p-5 mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
          <FiSliders className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Customise Trading Rules</h3>
          <p className="text-gray-500 text-xs">
            Adjust your challenge parameters to match your trading style
          </p>
        </div>
      </div>

      {/* Profit Target */}
      <div className="mt-5">
        <h4 className="text-white font-medium text-sm mb-2">Profit Target</h4>
        <p className="text-gray-500 text-xs mb-3">
          Choose options for profit target
        </p>

        <div className="flex gap-3">
          <RadioOption
            label="8%"
            selected={profitTarget === "8%"}
            onClick={() => onProfitTargetChange("8%")}
            badge="Default"
          />
          <RadioOption
            label="10%"
            selected={profitTarget === "10%"}
            onClick={() => onProfitTargetChange("10%")}
            extra={`-$${discountAmount.toFixed(2)}`}
            extraType="discount"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizeRules;
