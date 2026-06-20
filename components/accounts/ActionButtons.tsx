"use client";

import { useRouter } from "next/navigation";
import { BiTrophy } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

import { GiFlame } from "react-icons/gi";

type ActionCard =
  | {
      type: "progress";
      title: string;
      subtitle: string;
      progress: number;
      cta?: string;
      href?: string;
    }
  | {
      type: "social";
      name: string;
      country?: string;
      message: string;
    }
  | {
      type: "event";
      title: string;
      endsIn: string;
      subtitle?: string;
      href?: string;
    };

export default function ActionCards({ cards }: { cards: ActionCard[] }) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      {cards.map((card, idx) => {
        /* =======================
           PROGRESS CARD
        ======================= */
        if (card.type === "progress") {
          return (
            <div
              key={idx}
              onClick={() => card.href && router.push(card.href)}
              className="cursor-pointer rounded-xl card-premium  p-4 "
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">
                  {card.title}
                </h4>
                <BsArrowRight className="w-4 h-4 text-white/40" />
              </div>

              <p className="text-xs text-white/60 mb-3">{card.subtitle}</p>

              {/* Bar */}
              <div className="relative flex-1 h-3.5 rounded-full overflow-hidden bg-[#2F3135]">
                {/* Filled */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-green-500"
                  style={{ width: `${card.progress}%` }}
                />

                {/* Dot */}
                {card.progress > 0 && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-2 w-2 h-2 rounded-full bg-black"
                    style={{ left: `calc(${card.progress}% - 4px)` }}
                  />
                )}
              </div>

              {card.cta && (
                <p className="text-xs text-green-500 mt-2">{card.cta}</p>
              )}
            </div>
          );
        }

        /* =======================
           SOCIAL PROOF
        ======================= */
        if (card.type === "social") {
          return (
            <div
              key={idx}
              className="rounded-xl card-premium p-4 flex items-center gap-3"
            >
              <GiFlame className="w-4 h-4 text-orange-400 shrink-0" />

              <p className="text-sm text-white/80">
                <span className="font-semibold text-white">{card.name}</span>{" "}
                {card.country && <span>🇮🇳 </span>}
                {card.message}
              </p>
            </div>
          );
        }

        /* =======================
           EVENT / ARENA
        ======================= */
        if (card.type === "event") {
          return (
            <div
              key={idx}
              onClick={() => card.href && router.push(card.href)}
              className="cursor-pointer rounded-xl card-premium p-4 "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BiTrophy className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-sm font-semibold text-white">
                    {card.title}
                  </h4>
                </div>
                <BsArrowRight className="w-4 h-4 text-white/40" />
              </div>

              <p className="text-xs text-green-500 mt-2">
                Ends in {card.endsIn}
              </p>

              {card.subtitle && (
                <p className="text-xs text-white/50 mt-1">{card.subtitle}</p>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
