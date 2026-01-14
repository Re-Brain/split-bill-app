import { useState } from 'react';

interface NameFormProps {
  onSubmit: (name: string) => void;
  buttonText?: string;
  placeholder?: string;
}

export const NameForm = ({
    onSubmit,
    buttonText = "Add",
    placeholder = "Enter name"
} : NameFormProps) => {

    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() === "") {
            alert("Please fill in the name");
            return;
        }

        onSubmit(name.trim());
        setName("");
    }

    return (
        <form onSubmit={handleSubmit} className='flex justify-between gap-2 p-2 m-2 max-w-md mx-auto'>

            <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={placeholder}
            className='border border-gray-300 rounded text-black w-full px-3 py-2 text-sm'
            />

            <button 
            type="submit"
            className="bg-slate-800 text-white rounded px-3 py-2 text-sm whitespace-nowrap"
            >
            {buttonText}
            </button>

        </form>
        
        
    )
}