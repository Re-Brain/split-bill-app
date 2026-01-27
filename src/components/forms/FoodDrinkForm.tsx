import { useState } from 'react';

interface FoodDrinkFormProps {
  onSubmit: (foodDrink: string, amount: number, price: number) => void;
  buttonText?: string;
  foodDrinkPlaceholder?: string;
  amountPlaceholder?: string;
  pricePlaceholder?: string;
}

export const FoodDrinkForm = ({
    onSubmit,
    buttonText = "Add",
    foodDrinkPlaceholder = "Enter food or drink ",
    amountPlaceholder = "Enter amount",
    pricePlaceholder = "Enter price"
} : FoodDrinkFormProps) => {

  const [foodDrink, setFoodDrink] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow empty string or integers
    if (value === '' || /^\d+$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow empty string or integers
    if (value === '' || /^\d+$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (foodDrink.trim() === "" || amount.trim() === "" || price.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const parsedAmount = parseInt(amount);
    const parsedPrice = parseInt(price);

    if (isNaN(parsedAmount) || isNaN(parsedPrice) || parsedAmount <= 0 || parsedPrice <= 0) {
      alert("Amount and price must be valid positive numbers");
      return;
    }

    onSubmit(foodDrink.trim(), parsedAmount, parsedPrice);
    
    // Clear form
    setFoodDrink("");
    setAmount("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-2 p-2 m-2 max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto'>
      <input
        type='text'
        value={foodDrink}
        onChange={(e) => setFoodDrink(e.target.value)}
        placeholder={foodDrinkPlaceholder}
        className='border border-gray-300 rounded text-black w-full px-2 sm:px-3 py-2 text-sm sm:text-base'
      />
      <input
        type='text'
        value={amount}
        onChange={handleAmountChange}
        placeholder={amountPlaceholder}
        className='border border-gray-300 rounded text-black w-full sm:w-24 lg:w-32 px-2 sm:px-3 py-2 text-sm sm:text-base'
        inputMode="numeric"
      />
      <input
        type='text'
        value={price}
        onChange={handlePriceChange}
        placeholder={pricePlaceholder}
        className='border border-gray-300 rounded text-black w-full sm:w-24 lg:w-32 px-2 sm:px-3 py-2 text-sm sm:text-base'
        inputMode="numeric"
      />

      <button 
        type="submit"
        className="bg-primary bg-primary-hover text-white rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap shadow-md hover-scale"
      >
        ➕ {buttonText}
      </button>

    </form>
  )
}