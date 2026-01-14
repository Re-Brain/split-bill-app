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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (foodDrink.trim() === "" || amount.trim() === "" || price.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const parsedAmount = parseInt(amount);
    const parsedPrice = parseInt(price);

    if (isNaN(parsedAmount) || isNaN(parsedPrice)) {
      alert("Amount and price must be valid numbers");
      return;
    }

    onSubmit(foodDrink.trim(), parsedAmount, parsedPrice);
    
    // Clear form
    setFoodDrink("");
    setAmount("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-row gap-2 p-2 m-2 max-w-md mx-auto'>
      <input
        type='text'
        value={foodDrink}
        onChange={(e) => setFoodDrink(e.target.value)}
        placeholder={foodDrinkPlaceholder}
        className='border border-gray-300 rounded text-black w-full px-3 py-2 text-sm'
      />
      <input
        type='text'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={amountPlaceholder}
        className='border border-gray-300 rounded text-black w-full px-3 py-2 text-sm'
      />
      <input
        type='text'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder={pricePlaceholder}
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

