interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

interface SummaryModalProps {
  bill: PersonBill | null;
  tax: number;
  serviceCharge: number;
  totalTablemates: number;
}

export const SummaryModal = ({ bill, tax, serviceCharge, totalTablemates }: SummaryModalProps) => {
  if (!bill) return null;

  const taxPerPerson = totalTablemates > 0 ? tax / totalTablemates : 0;
  const serviceChargePerPerson = totalTablemates > 0 ? serviceCharge / totalTablemates : 0;
  const foodTotal = bill.items.reduce((sum, item) => sum + item.pricePerPerson, 0);

  return (
    <>
      <h2 className='text-2xl font-bold mb-4 text-black'>Summary for {bill.name}</h2>
      
      {/* Food Items Breakdown */}
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-black mb-2'>Food & Drinks:</h3>
        <div className='max-h-64 overflow-y-auto'>
          {bill.items.length > 0 ? (
            bill.items.map((item, index) => (
              <div key={index} className='flex justify-between items-center p-2 bg-gray-100 rounded mb-2'>
                <span className='text-black flex-1'>{item.foodDrink}</span>
                <span className='text-black font-semibold'>${item.pricePerPerson.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className='text-gray-600'>No food items</p>
          )}
        </div>
        <div className='flex justify-between items-center p-2 mt-2 border-t-2 border-gray-300'>
          <span className='text-black font-semibold'>Food Subtotal:</span>
          <span className='text-black font-semibold'>${foodTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Tax and Service Charge */}
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-black mb-2'>Additional Charges:</h3>
        {tax > 0 && (
          <div className='flex justify-between items-center p-2 bg-gray-100 rounded mb-2'>
            <span className='text-black'>Tax (split among {totalTablemates})</span>
            <span className='text-black font-semibold'>${taxPerPerson.toFixed(2)}</span>
          </div>
        )}
        {serviceCharge > 0 && (
          <div className='flex justify-between items-center p-2 bg-gray-100 rounded mb-2'>
            <span className='text-black'>Service Charge (split among {totalTablemates})</span>
            <span className='text-black font-semibold'>${serviceChargePerPerson.toFixed(2)}</span>
          </div>
        )}
        {tax === 0 && serviceCharge === 0 && (
          <p className='text-gray-600'>No additional charges</p>
        )}
      </div>

      {/* Total */}
      <div className='flex justify-between items-center p-3 bg-blue-500 rounded'>
        <span className='text-white text-xl font-bold'>Total:</span>
        <span className='text-white text-xl font-bold'>${bill.total.toFixed(2)}</span>
      </div>

      {/* Breakdown Formula */}
      <div className='mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700'>
        <p className='font-semibold mb-1'>Calculation:</p>
        <p>${foodTotal.toFixed(2)} (food) + ${taxPerPerson.toFixed(2)} (tax) + ${serviceChargePerPerson.toFixed(2)} (service) = ${bill.total.toFixed(2)}</p>
      </div>
    </>
  );
};