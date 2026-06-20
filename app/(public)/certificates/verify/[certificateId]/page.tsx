"use client";

import { useParams } from "next/navigation";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FiCheckCircle, FiDownload, FiImage, FiLink } from "react-icons/fi";

const CertificatePage = () => {
  const params = useParams();

  // later fetch from DB
  const certificate = {
    phase: "PHASE I",
    name: "ANSH S",
    date: "Jan 2, 2026",
  };

  const actions = [
    { label: "PNG", icon: FiDownload },
    { label: "PDF", icon: FiDownload },
    { label: "Image", icon: FiImage },
    { label: "Link", icon: FiLink },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 w-1/2 border-r border-white/10">
        {/* Title */}
        <h1 className="text-xl font-semibold text-[#22c55e] mb-6">
          Epic Funded Traders
        </h1>

        <div
          className="
          flex items-center gap-3
          px-6 py-3
          rounded-xl
          bg-[#0c1a14]
          border border-[#22c55e]/30
          text-[#22c55e]
          text-sm font-medium
          shadow-[0_0_25px_rgba(34,197,94,0.15)]
          mb-8
        "
        >
          <FiCheckCircle className="text-lg" />
          <span>This certificate has been successfully verified</span>
        </div>

        {/* Certificate Card */}
        <div
          className="w-full max-w-3xl rounded-3xl  px-10 py-8 shadow-xl border border-white/10"
          style={{
            backgroundColor: "var(--card-bg)",
          }}
        >
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            {/* Left labels */}
            <div className="space-y-4 text-gray-300">
              <p className="font-semibold">Name -</p>
              <p className="font-semibold">Certificate Id -</p>
              <p className="font-semibold">Issued Date -</p>
              <p className="font-semibold">Phase -</p>
            </div>

            {/* Right values */}
            <div className="space-y-4 text-gray-300">
              <p className=" font-semibold">{certificate.name}</p>
              <p className="break-all font-semibold">{params.certificateId}</p>
              <p className=" font-semibold">{certificate.date}</p>
              <p className=" font-semibold">{certificate.phase}</p>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4 mt-6">
          {actions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-2 px-6 py-2 rounded-xl
                 border border-white/10 text-sm text-gray-300
                 hover:bg-white/5 hover:border-white/40
                 transition"
            >
              <Icon className="text-base opacity-80" />
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            Get Your Certificate Now
          </h2>
          <p className=" text-gray-400 mb-8">
            Start your trading journey today. Review our trading rules and
            choose a challenge that suits your goals.
          </p>

          <div className="flex gap-4 justify-center ">
            <button className="px-6 py-2.5 rounded-xl border border-white/20 text-sm flex items-center gap-4 text-gray-300  hover:bg-white/5 hover:border-white/40">
              Trading Rules
              <HiArrowTopRightOnSquare className="w-5 h-5" />
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-[#22c55e] text-black font-medium flex items-center gap-4">
              Start Challenge
              <HiArrowTopRightOnSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="relative w-[420px]  rounded-2xl overflow-hidden border border-white/10">
          <img
            src="/images/certificates/image.png"
            alt="Certificate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
