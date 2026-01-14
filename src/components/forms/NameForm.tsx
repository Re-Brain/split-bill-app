import { useState } from 'react';

interface NameFormProps {
  onSubmit: (name: string) => void;
  buttonText?: string;
  placeholder?: string;
}

export const NameForm = ({
    onSubmit,
    buttonText = "Submit",
    placeholder = "Enter name"
} : NameFormProps) => {

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    onSubmit(name.trim());
    setName(""); // Clear input after submission
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-2 p-2 m-2 max-w-md sm:max-w-2xl mx-auto'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className='border border-gray-300 rounded text-black px-3 py-2 text-sm sm:text-base w-full'
      />

      <button 
        type="submit"
        className="bg-slate-800 text-white rounded px-4 py-2 text-sm sm:text-base whitespace-nowrap hover:bg-slate-700"
      >
        {buttonText}
      </button>

    </form>
  )
}