"use client";

import { useState, useMemo } from "react";
import {
  RadioOption,
  SectionTitle,
  OrderSummary,
  CustomizeRules,
  CouponCode,
} from "@/components/new-challenge";

// Pricing data based on screenshots
const PRICING = {
  "One Step": {
    EFT: {
      "$5,000.00": 32,
      "$10,000.00": 62,
      "$25,000.00": 142,
      "$50,000.00": 272,
      "$100,000.00": 555,
    },
  },
  "Two Step": {
    EFT: {
      "$5,000.00": 39,
      "$10,000.00": 69,
      "$25,000.00": 159,
      "$50,000.00": 299,
      "$100,000.00": 569,
    },
    "EFT Pro": {
      "$5,000.00": 45,
      "$10,000.00": 79,
      "$25,000.00": 179,
      "$50,000.00": 339,
      "$100,000.00": 629,
    },
  },
  Zero: {
    EFT: {
      "$5,000.00": 29,
      "$10,000.00": 55,
      "$25,000.00": 129,
      "$50,000.00": 249,
      "$100,000.00": 499,
    },
  },
};

// Profit target discount percentages (applied to base price)
const PROFIT_TARGET_DISCOUNT_RATE = {
  "$5,000.00": 3,
  "$10,000.00": 5,
  "$25,000.00": 12,
  "$50,000.00": 20,
  "$100,000.00": 40,
};

const PLATFORM_FEE = {
  "MetaTrader 5": 0,
  MatchTrader: 0,
  CTrader: 20,
};

type ChallengeType = "One Step" | "Two Step" | "Zero";
type Model = "EFT" | "EFT Pro";
type AccountSize =
  | "$5,000.00"
  | "$10,000.00"
  | "$25,000.00"
  | "$50,000.00"
  | "$100,000.00";
type Platform = "MetaTrader 5" | "MatchTrader" | "CTrader";

const NewChallengePage = () => {
  const [challengeType, setChallengeType] = useState<ChallengeType>("One Step");
  const [model, setModel] = useState<Model>("EFT");
  const [accountSize, setAccountSize] = useState<AccountSize>("$100,000.00");
  const [platform, setPlatform] = useState<Platform>("MetaTrader 5");
  const [profitTarget, setProfitTarget] = useState("8%");
  const [agreed, setAgreed] = useState(false);

  // Calculate pricing
  const pricing = useMemo(() => {
    const challengePrices =
      PRICING[challengeType as keyof typeof PRICING] || {};
    const modelPrices =
      challengePrices[model as keyof typeof challengePrices] || {};
    const basePrice = (modelPrices as Record<string, number>)[accountSize] || 0;
    const platformFee = PLATFORM_FEE[platform];

    // Profit target discount only applies to Two Step
    let profitTargetDiscount = 0;
    if (challengeType === "Two Step" && profitTarget === "10%") {
      profitTargetDiscount =
        -PROFIT_TARGET_DISCOUNT_RATE[
          accountSize as keyof typeof PROFIT_TARGET_DISCOUNT_RATE
        ];
    }

    return {
      basePrice,
      platformFee,
      profitTargetDiscount,
      total: basePrice + platformFee + profitTargetDiscount,
    };
  }, [challengeType, model, accountSize, platform, profitTarget]);

  // Get available models for current challenge type
  const availableModels = useMemo(() => {
    if (challengeType === "Two Step") {
      return ["EFT", "EFT Pro"];
    }
    return ["EFT"];
  }, [challengeType]);

  // Reset model when challenge type changes
  const handleChallengeTypeChange = (type: ChallengeType) => {
    setChallengeType(type);
    if (type !== "Two Step" && model === "EFT Pro") {
      setModel("EFT");
    }
    // Reset profit target when not Two Step
    if (type !== "Two Step") {
      setProfitTarget("8%");
    }
  };

  const handleApplyCoupon = (code: string) => {
    console.log("Applying coupon:", code);
    // TODO: Implement coupon logic
  };

  const handlePayment = () => {
    console.log("Processing payment...", {
      challengeType,
      model,
      accountSize,
      platform,
      profitTarget,
      total: pricing.total,
    });
    // TODO: Implement payment flow
  };

  return (
    <div className="min-h-screen bg-black p-8 ">
      <div className="mx-auto">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-8">
          New Challenge
        </h1>

        <div className="flex gap-8">
          {/* Left Column - Configuration */}
          <div className="flex-1 space-y-8">
            {/* Challenge Type */}
            <section>
              <SectionTitle
                title="Challenge Type"
                subtitle="Choose the type of challenge you want to take"
              />
              <div className="grid grid-cols-2 gap-3">
                {(["One Step", "Two Step", "Zero"] as ChallengeType[]).map(
                  (type) => (
                    <RadioOption
                      key={type}
                      label={type}
                      selected={challengeType === type}
                      onClick={() => handleChallengeTypeChange(type)}
                    />
                  )
                )}
              </div>
            </section>

            {/* Model */}
            <section>
              <SectionTitle title="Model" subtitle="Choose the trading model" />
              <div className="grid grid-cols-2 gap-3">
                {availableModels.map((m) => (
                  <RadioOption
                    key={m}
                    label={m}
                    selected={model === m}
                    onClick={() => setModel(m as Model)}
                  />
                ))}
              </div>
            </section>

            {/* Customise Trading Rules - Only for Two Step */}
            {challengeType === "Two Step" && (
              <CustomizeRules
                profitTarget={profitTarget}
                onProfitTargetChange={setProfitTarget}
                discountAmount={
                  PROFIT_TARGET_DISCOUNT_RATE[
                    accountSize as keyof typeof PROFIT_TARGET_DISCOUNT_RATE
                  ]
                }
              />
            )}

            {/* Account Size */}
            <section>
              <SectionTitle
                title="Account Size"
                subtitle="Choose your preferred account size"
              />
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    "$5,000.00",
                    "$10,000.00",
                    "$25,000.00",
                    "$50,000.00",
                    "$100,000.00",
                  ] as AccountSize[]
                ).map((size) => (
                  <RadioOption
                    key={size}
                    label={size}
                    selected={accountSize === size}
                    onClick={() => setAccountSize(size)}
                  />
                ))}
              </div>
            </section>

            {/* Trading Platform */}
            <section>
              <SectionTitle
                title="Trading Platform"
                subtitle="Choose your preferred trading platform"
              />
              <div className="grid grid-cols-3 gap-3">
                {(["MetaTrader 5", "MatchTrader", "CTrader"] as Platform[]).map(
                  (p) => (
                    <RadioOption
                      key={p}
                      label={p}
                      selected={platform === p}
                      onClick={() => setPlatform(p)}
                      extra={
                        PLATFORM_FEE[p] > 0
                          ? `+$${PLATFORM_FEE[p]}.00`
                          : undefined
                      }
                    />
                  )
                )}
              </div>
            </section>
            {/* Billing Details */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Billing Details
              </h3>
              <p className="text-white/50 text-xs mb-6">
                Enter your billing information for the challenge purchase
              </p>

              {/* Billing Form */}
              <div className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-white/50 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs text-white/50 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Market Street"
                    className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                  />
                </div>

                {/* City / State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                    />
                  </div>
                </div>

                {/* Country / Zip */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 mb-1 ">
                      Country
                    </label>
                    <select className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white focus:outline-none focus:border-green-500/40">
                      <option className="bg-black ">Select Country</option>
                      <option className="bg-black">United States</option>
                      <option className="bg-black">United Kingdom</option>
                      <option className="bg-black">UAE</option>
                      <option className="bg-black">Europe</option>
                      <option className="bg-black">India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full card-premium-border px-4 py-4 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Billing & Summary */}
          <div className="w-[480px] flex-shrink-0 space-y-6">
            {/* Coupon Code */}
            <CouponCode onApply={handleApplyCoupon} />

            {/* Order Summary */}
            <OrderSummary
              accountSize={accountSize}
              challengeType={challengeType}
              model={model}
              platform={platform}
              price={pricing.basePrice}
              platformFee={pricing.platformFee}
              profitTargetDiscount={pricing.profitTargetDiscount}
              agreed={agreed}
              onAgreeChange={setAgreed}
              onPayment={handlePayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChallengePage;
