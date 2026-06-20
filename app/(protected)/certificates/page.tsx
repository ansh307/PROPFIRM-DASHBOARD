"use client";

import Link from "next/link";
import React from "react";
import { FiDownload, FiLink } from "react-icons/fi";
type CertificatePhase = {
  phase: "PHASE I" | "PHASE II" | "PHASE III";
  title: string;
  achieved: boolean;
  certificateId?: string;
};

const CERTIFICATES: CertificatePhase[] = [
  {
    phase: "PHASE I",
    title: "Evaluation Stage",
    achieved: true,
    certificateId: "5bcdb6fb-038a-4da6-9a38-5b8c3532da22",
  },
  {
    phase: "PHASE II",
    title: "Verification Stage",
    achieved: false,
  },
  {
    phase: "PHASE III",
    title: "Master Stage",
    achieved: false,
  },
];
const CertificatesPage = () => {
  return (
    <div className="p-8 space-y-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5 ">
          <span className="text-[#22c55e] text-2xl font-semibold">EFT</span>
          <div className="border-l border-gray-200/15 h-10 w-0.5" />

          <h1 className="text-2xl font-semibold">Certificates</h1>
        </div>
      </div>

      {/* Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATES.map((cert) => {
          return (
            <div
              key={cert.phase}
              className={`relative rounded-2xl overflow-hidden bg-green-500/5 border border-white/10 p-4 
              ${
                cert.achieved
                  ? "hover:scale-[1.02] transition cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              {/* Certificate Image */}

              {cert.achieved ?    <img
                src="/images/certificates/image.png"
                alt={cert.phase}
                className="w-full h-[90%] object-cover"
              />: 
              <div className="w-full h-[90%] bg-gray-800/20 flex items-center justify-center text-gray-500">
                <p className="text-sm">Certificate Preview Unavailable</p>
              </div>
              }
            

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

              <div className="flex gap-3 h-full justify-between py-4">
                <div className="z-10">
                  <p className="text-xs uppercase text-white/70">
                    Certificate of Achievement
                  </p>
                  <p className="text-xl font-bold">{cert.phase}</p>
                  <p className="text-sm text-white/80">{cert.title}</p>
                </div>

                {cert.achieved && (
                  <div className="flex gap-3 h-full ">
                    {/* Download Button */}
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl
               bg-white/5 border border-white/10 text-sm text-white
               hover:bg-white/10 hover:border-white/20
               transition h-fit z-10"
                    >
                      Download
                      <FiDownload className="w-4 h-4" />
                    </button>

                    {/* Copy Link Button */}
                    <Link
                      href={`/certificates/verify/${cert.certificateId}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl
                      bg-white/5 border border-white/10 text-sm text-white
                      hover:bg-white/10 hover:border-white/20
                      transition h-fit z-10"
                    >
                      Link
                      <FiLink className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Locked badge */}
              {!cert.achieved && (
                <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-black/60 border border-white/20">
                  Locked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificatesPage;
