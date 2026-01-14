interface ExtraChargeFormProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const ExtraChargeForm = ({
    value,
    onChange,
    placeholder = "Enter amount"
} : ExtraChargeFormProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const inputValue = e.target.value;
    
        // Only allow empty string or integers (no decimals)
        if (inputValue === '' || /^\d+$/.test(inputValue)) {
            if (inputValue === '') {
                onChange(0);
            } else {
                const numValue = parseInt(inputValue);
                if (!isNaN(numValue) && numValue >= 0) {
                    onChange(numValue);
                }
            }
        }

    };

    return (
        <form className='flex justify-between gap-2 p-2 m-2 max-w-md mx-auto'>
            
            <input
                type='text'
                value={value === 0 ? '' : value}
                onChange={handleChange}
                placeholder={placeholder}
                className='border border-gray-300 rounded text-black px-3 py-2 max-w-md w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                min="0"
            />

        </form>
    )
}