import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Text } from './components/Text'
import { SectionTitle } from './components/SectionTitle'

import { NameForm } from './components/forms/NameForm'
import { FoodDrinkForm } from './components/forms/FoodDrinkForm'

// Define the type for food/drink items
interface FoodDrinkItem {
  foodDrink: string;
  amount: number;
  price: number;
}

function App() {

  const MAX_TABLEMATES = 20;
  const MAX_FOOD_DRINKS = 50;

  const [tablemates, setTablemates] = useState<string[]>([]);
  const [foodDrinks, setFoodDrinks] = useState<FoodDrinkItem[]>([]);

  const handleAddName = (name : string) => {
    if (tablemates.length >= MAX_TABLEMATES) {
      alert(`Maximum ${MAX_TABLEMATES} tablemates allowed!`);
      return;
    }
    setTablemates([...tablemates, name]);
    console.log("Name Added:", name);
  }
  
  const handleDeleteName = (index : number) => {
    setTablemates(tablemates.filter((_, i) => i !== index));
    console.log("Name Deleted at index:", index);
  }

  const handleAddFoodAndDrink = (foodDrink: string, amount: number, price: number) => {
    if (tablemates.length >= MAX_FOOD_DRINKS) {
      alert(`Maximum ${MAX_FOOD_DRINKS} food and drinks allowed!`);
      return;
    }

    const newItem: FoodDrinkItem = { foodDrink, amount, price };
    setFoodDrinks([...foodDrinks, newItem]);
    console.log("Food & Drink Added:", foodDrink, amount, price);
  }

  const handleDeleteFoodDrink = (index: number) => {
    setFoodDrinks(foodDrinks.filter((_, i) => i !== index));
    console.log("Food/Drink Deleted at index:", index);
  }
 
  return (
    <div className="min-h-screen flex flex-col">
      <header className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Group Meal Splitter" className="text-3xl text-white"/>
      </header>

      <main className='bg-white text-center flex-1'>
        
        {/* Tablemates Section */}

        <SectionTitle text={`Tablemates (Max : ${MAX_TABLEMATES})`}/>
        <NameForm
          onSubmit={handleAddName}
          buttonText='Add'
          placeholder='Tablemate Name'
        />

        <div className='flex flex-col max-h-70 overflow-y-auto'>
          {tablemates.map((tablemate, index) => (
            <div key={index} className='flex items-center bg-blue-500 rounded p-2 my-1 mx-2'>
              <Text text={tablemate} className="text-lg text-white flex-1" />
              <button 
                onClick={() => handleDeleteName(index)}
                className='bg-red-500 text-white px-3 py-1 rounded'
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Food & Drinks Section */}

        <SectionTitle text={`Food & Drinks (Max : ${MAX_FOOD_DRINKS})`}/>

        <FoodDrinkForm
          onSubmit={handleAddFoodAndDrink}
          buttonText='Add'
          foodDrinkPlaceholder='Item'
          amountPlaceholder='Amount'
          pricePlaceholder='Price'
        />

        <div className='mx-auto max-w-md w-full'>
            <table className='w-full border-separate table-fixed' style={{ borderSpacing: '8px' }}>
              <thead>
                <tr>
                  <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Item</th>
                  <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Amount</th>
                  <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Price</th>
                  <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Shared</th>
                  <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Action</th>
                </tr>
              </thead>
            </table>
        
            <div className='max-h-70 overflow-y-auto hide-scrollbar'>
              <table className='w-full border-separate table-fixed' style={{ borderSpacing: '8px' }}>
                  <tbody>
                  {foodDrinks.map((item, index) => (
                    <tr key={index} className='max-h-70 overflow-y-auto'>
                      <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{item.foodDrink}</td>
                      <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{item.amount}</td>
                      <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{item.price}</td>
                      <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Tablemates</td>
                      <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>
                        <button 
                          onClick={() => handleDeleteFoodDrink(index)}
                          className='bg-red-500 text-white px-2 py-1 rounded text-xs'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </main>

      <footer className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Thank you for using my service" className="text-xs-1 text-white"/>
      </footer>
    </div>
  )
}

export default App
