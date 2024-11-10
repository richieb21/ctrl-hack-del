import { Links } from "../constants/types";
import { api } from "../services/api";

interface LinksStepProps {
  links: Links;
  setLinks: (links: Links) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LinksStep = ({
  links,
  setLinks,
  onNext,
  onBack,
}: LinksStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.updateLinks(links).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">
        Professional Links
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GitHub Profile
        </label>
        <input
          type="url"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          value={links.github}
          onChange={(e) => setLinks({ ...links, github: e.target.value })}
          placeholder="https://github.com/yourusername"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn Profile
        </label>
        <input
          type="url"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          value={links.linkedin}
          onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
          placeholder="https://linkedin.com/in/yourusername"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Portfolio Website
        </label>
        <input
          type="url"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          value={links.portfolio}
          onChange={(e) => setLinks({ ...links, portfolio: e.target.value })}
          placeholder="https://yourportfolio.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          X Profile
        </label>
        <input
          type="url"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          value={links.x}
          onChange={(e) => setLinks({ ...links, x: e.target.value })}
          placeholder="https://x.com/yourusername"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          value={links.email}
          onChange={(e) => setLinks({ ...links, email: e.target.value })}
          placeholder="yourname@email.com"
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-[#2C74B3] hover:underline"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-full"
        >
          Next
        </button>
      </div>
    </form>
  );
};
