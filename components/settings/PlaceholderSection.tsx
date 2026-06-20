"use client";

interface PlaceholderSectionProps {
  title: string;
  description?: string;
}

const PlaceholderSection = ({
  title,
  description,
}: PlaceholderSectionProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>

      <div className=" border rounded-xl p-12 flex flex-col items-center justify-center text-center card-premium">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-500 text-2xl">🚧</span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Coming Soon</h3>
        <p className="text-white/60 text-sm max-w-md">
          {description ||
            `The ${title} feature is currently under development. Check back soon for updates.`}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderSection;
