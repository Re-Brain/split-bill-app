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
  return (
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
              <tr key={index}>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{item.foodDrink}</td>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{item.amount}</td>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{item.price}</td>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm text-center'>
                  <button 
                    onClick={() => onOpenModal(index)}
                    className='bg-green-500 text-white px-2 py-1 rounded text-xs'
                  >
                    {item.sharedWith.length > 0 ? `👤${item.sharedWith.length}` : 'Choose'}
                  </button>
                </td>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>
                  <button 
                    onClick={() => onDelete(index)}
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
  );
};