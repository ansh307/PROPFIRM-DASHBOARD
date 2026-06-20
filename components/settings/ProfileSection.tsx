"use client";

import { useState } from "react";

interface ProfileData {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  timezone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

const timezones = [
  {
    value: "UTC+05:30",
    label: "+05:30 India Time - Mumbai, Delhi, Bengaluru, Hyderabad",
  },
  { value: "UTC+00:00", label: "+00:00 UTC - London, Dublin, Lisbon" },
  { value: "UTC-05:00", label: "-05:00 Eastern Time - New York, Toronto" },
  { value: "UTC-08:00", label: "-08:00 Pacific Time - Los Angeles, Vancouver" },
  { value: "UTC+01:00", label: "+01:00 Central European Time - Paris, Berlin" },
  { value: "UTC+08:00", label: "+08:00 Singapore/Hong Kong Time" },
  { value: "UTC+09:00", label: "+09:00 Japan/Korea Time - Tokyo, Seoul" },
];

const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "India",
  "Australia",
  "Germany",
  "France",
  "Singapore",
  "Japan",
  "Other",
];

const ProfileSection = () => {
  const [profile, setProfile] = useState<ProfileData>({
    title: "",
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "",
    email: "lafapo7647@mekuron.com",
    timezone: "UTC+05:30",
    streetAddress: "123 Main Street",
    city: "",
    postalCode: "12345",
    country: "",
  });

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-semibold text-white">Profile Details</h1>

      {/* Personal Information */}
      <div className=" border rounded-xl p-6 card-premium ">
        <div className="mb-6">
          <h3 className="text-white font-semibold text-base">
            Personal Information
          </h3>
          <p className="text-white/50 text-sm mt-1">
            Update your personal details and contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Title</label>
            <select
              value={profile.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full  border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 card-premium-border appearance-none cursor-pointer card-premium-border"
            >
              <option value="">Select title...</option>
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 card-premium-border"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 card-premium-border"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 card-premium-border"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full  card-premium-border rounded-lg px-4 py-3 text-gray-400 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Preferred Time Zone
            </label>
            <select
              value={profile.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 card-premium-border appearance-none cursor-pointer"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className=" border  rounded-xl p-6 card-premium">
        <div className="mb-6">
          <h3 className="text-white font-semibold text-base">
            Address Information
          </h3>
          <p className="text-white/50 text-sm mt-1">
            Your residential address for verification and billing purposes.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white/50 text-sm mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={profile.streetAddress}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
              className="w-full  card-premium-border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 text-sm mb-2">City</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label className="block text-white/50 text-sm mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={profile.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border"
                placeholder="12345"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">Country</label>
            <select
              value={profile.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border appearance-none cursor-pointer"
            >
              <option className="bg-[#0b0c0e]" value="">
                Select...
              </option>
              {countries.map((country) => (
                <option className="bg-[#0b0c0e]" key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
