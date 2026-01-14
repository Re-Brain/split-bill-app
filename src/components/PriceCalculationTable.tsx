interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

interface PriceCalculationTableProps {
  bills: PersonBill[];
  onOpenSummary: (name: string) => void;
}

export const PriceCalculationTable = ({ bills, onOpenSummary }: PriceCalculationTableProps) => {
  if (bills.length === 0) {
    return (
      <div className='text-gray-600 p-4'>
        Please add tablemates and food items to calculate bills.
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-md w-full'>
      <table className='w-full border-separate table-fixed' style={{ borderSpacing: '8px' }}>
        <thead>
          <tr>
            <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>👤</th>
            <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Total</th>
            <th className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>Summary</th>
          </tr>
        </thead>
      </table>
    
      <div className='max-h-70 overflow-y-auto hide-scrollbar'>
        <table className='w-full border-separate table-fixed' style={{ borderSpacing: '8px' }}>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index}>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>{bill.name}</td>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm'>${bill.total.toFixed(2)}</td>
                <td className='text-white bg-blue-500 px-2 py-1 rounded-lg text-sm text-center'>
                  <button 
                    onClick={() => onOpenSummary(bill.name)}
                    className='bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600'
                  >
                    View
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