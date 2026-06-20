"use client";

import { useState } from "react";

const categories = [
  "Trading Features",
  "Account Management",
  "User Interface",
  "Reporting & Analytics",
  "Mobile App",
  "Integrations",
  "Security",
  "Other",
];

const priorities = [
  { value: "low", label: "Low - Nice to have" },
  { value: "medium", label: "Medium - Would improve my experience" },
  { value: "high", label: "High - Important for my workflow" },
  { value: "critical", label: "Critical - Essential feature" },
];

const FeatureSuggestionsSection = () => {
  const [featureTitle, setFeatureTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [useCase, setUseCase] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = () => {
    // Handle feature suggestion submission
    console.log("Submitting feature suggestion:", {
      featureTitle,
      category,
      description,
      useCase,
      priority,
    });
    // Reset form
    setFeatureTitle("");
    setCategory("");
    setDescription("");
    setUseCase("");
    setPriority("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Feature Suggestions</h1>

      <div className=" border  rounded-xl p-6 card-premium">
        <h3 className="text-white font-semibold text-base mb-6">
          Feature Suggestion
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/50 text-sm mb-2">
              Feature Title
            </label>
            <input
              type="text"
              value={featureTitle}
              onChange={(e) => setFeatureTitle(e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border "
              placeholder="Brief title for your feature suggestion"
            />
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border  appearance-none cursor-pointer"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">
              Detailed Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border resize-none"
              placeholder="Describe your feature idea in detail. What problem does it solve? How would it work?"
              rows={5}
              maxLength={2000}
            />
            <p className="text-gray-500 text-xs mt-1 text-right">
              {description.length} / 2000 characters
            </p>
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">
              Use Case (Optional)
            </label>
            <textarea
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border resize-none"
              placeholder="When and how would you use this feature? Example scenarios..."
              rows={5}
              maxLength={1000}
            />
            <p className="text-gray-500 text-xs mt-1 text-right">
              {useCase.length} / 1000 characters
            </p>
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">
              How important is this to you?
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full  border  rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 card-premium-border appearance-none cursor-pointer"
            >
              <option className="bg-[#0b0c0e]" value="">
                Select priority
              </option>
              {priorities.map((p) => (
                <option className="bg-[#0b0c0e]" key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Submit Suggestion
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSuggestionsSection;
