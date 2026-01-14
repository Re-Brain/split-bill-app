interface FoodDrinkItem {
  foodDrink: string;
  amount: number;
  price: number;
  sharedWith: string[];
}

interface FoodDrinksTableProps {
  foodDrinks: FoodDrinkItem[];
  onOpenModal: (index: number) => void;
  onDelete: (index: number) => void;
}

export const FoodDrinkTable = ({ foodDrinks, onOpenModal, onDelete }: FoodDrinksTableProps) => {
  // Don't render anything if no items
  if (foodDrinks.length === 0) {
    return null;
  }

  return (
    <div className='mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl w-full px-2 sm:px-4'>
      <table className='w-full border-separate table-fixed' style={{ borderSpacing: '4px' }}>
        <thead>
          <tr>
            <th className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>Item</th>
            <th className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>Amount</th>
            <th className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>Price</th>
            <th className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>Shared</th>
            <th className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>Action</th>
          </tr>
        </thead>
      </table>
    
      <div className='max-h-60 sm:max-h-80 lg:max-h-96 overflow-y-auto hide-scrollbar'>
        <table className='w-full border-separate table-fixed' style={{ borderSpacing: '4px' }}>
          <tbody>
            {foodDrinks.map((item, index) => (
              <tr key={index}>
                <td className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>{item.foodDrink}</td>
                <td className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>{item.amount}</td>
                <td className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>{item.price}</td>
                <td className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base text-center'>
                  <button 
                    onClick={() => onOpenModal(index)}
                    className='bg-slate-600 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-slate-500'
                  >
                    {item.sharedWith.length > 0 ? `👤${item.sharedWith.length}` : 'Choose'}
                  </button>
                </td>
                <td className='text-white bg-slate-800 px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base'>
                  <button 
                    onClick={() => onDelete(index)}
                    className='bg-slate-600 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-slate-500'
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
  );
};