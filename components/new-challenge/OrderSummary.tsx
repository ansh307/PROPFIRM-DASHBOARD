"use client";

interface OrderSummaryProps {
  accountSize: string;
  challengeType: string;
  model: string;
  platform: string;
  price: number;
  platformFee: number;
  profitTargetDiscount: number;
  agreed: boolean;
  onAgreeChange: (agreed: boolean) => void;
  onPayment: () => void;
}

const OrderSummary = ({
  accountSize,
  challengeType,
  model,
  platform,
  price,
  platformFee,
  profitTargetDiscount,
  agreed,
  onAgreeChange,
  onPayment,
}: OrderSummaryProps) => {
  const total = price + platformFee + profitTargetDiscount;

  return (
    <div className="card-premium rounded-2xl  overflow-hidden">
      {/* Green accent line */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />

      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-6">Order Summary</h3>

        {/* Order details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-300 text-sm">
                {accountSize} — {challengeType} {model}
              </p>
              <p className="text-white/50 text-xs mt-1">Platform: {platform}</p>
            </div>
            <span className="text-white font-semibold">
              ${price.toFixed(2)}
            </span>
          </div>

          {platformFee > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Platform fee ({platform})</span>
              <span className="text-gray-300">+${platformFee.toFixed(2)}</span>
            </div>
          )}

          {profitTargetDiscount !== 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Profit target adjustment</span>
              <span
                className={
                  profitTargetDiscount < 0 ? "text-green-400" : "text-gray-300"
                }
              >
                {profitTargetDiscount < 0 ? "-" : "+"}$
                {Math.abs(profitTargetDiscount).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700/50 mb-4" />

        {/* Total */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-white/60 font-medium">Total</span>
          <span className="text-3xl font-bold text-white">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Terms checkbox */}
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => onAgreeChange(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                  ${
                    agreed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-600 group-hover:border-gray-500"
                  }`}
              >
                {agreed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-300">
                I agree with all the following terms:
              </span>
              <ul className="text-gray-500 text-xs mt-2 space-y-1">
                <li>
                  • I have read and agreed to the{" "}
                  <a href="#" className="text-green-400 hover:underline">
                    Terms of Use
                  </a>
                  .
                </li>
                <li>
                  • All information provided is correct and matches
                  government-issued ID.
                </li>
                <li>
                  • I have read and agree with the{" "}
                  <a href="#" className="text-green-400 hover:underline">
                    Terms & Conditions
                  </a>
                  .
                </li>
                <li>• I confirm that I am not a U.S. citizen or resident.</li>
              </ul>
            </div>
          </label>
        </div>

        {/* Payment button */}
        <button
          onClick={onPayment}
          disabled={!agreed}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300
            ${
              agreed
                ? "bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-400 hover:to-green-400 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 active:scale-[0.98]"
                : "bg-[#3b3b3b] cursor-not-allowed opacity-60"
            }`}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
