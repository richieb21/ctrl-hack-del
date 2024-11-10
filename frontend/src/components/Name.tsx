import { api } from "../services/api";

interface NameStepProps {
  name: string;
  setName: (name: string) => void;
  onNext: () => void;
}

export const NameStep = ({ name, setName, onNext }: NameStepProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateName(name).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">
        First, let's start with introductions
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What is your name?
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-full"
      >
        Next
      </button>
    </form>
  );
};
