import { useState } from 'react'

import { Text } from './components/Text'
import { SectionTitle } from './components/SectionTitle'

import { NameForm } from './components/forms/NameForm'
import { FoodDrinkForm } from './components/forms/FoodDrinkForm'
import { ExtraChargeForm } from './components/forms/ExtraChargeForm'

import { Modal } from './components/Modal/Modal'
import { TableMateSelector } from './components/Modal/TableMateSelector'

import { TableMateList } from './components/TableMateList'
import { FoodDrinkTable } from './components/FoodDrinkTable'

import { useTableMateModal } from './hooks/useTableMateModal'

import { PriceCalculationTable } from './components/PriceCalculationTable'
import { calculateBills } from './utils/billCalculator'
import { SummaryModal } from './components/Modal/SummaryModal'

interface FoodDrinkItem {
  foodDrink: string;
  amount: number;
  price: number;
  sharedWith: string[];
}

interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

function App() {
  const MAX_TABLEMATES = 20;
  const MAX_FOOD_DRINKS = 50;

  const [tablemates, setTablemates] = useState<string[]>([]);
  const [foodDrinks, setFoodDrinks] = useState<FoodDrinkItem[]>([]);
  const [tax, setTax] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const [bills, setBills] = useState<PersonBill[]>([]);
  const [showCalculation, setShowCalculation] = useState(false);

  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<PersonBill | null>(null);

  const {
    modalOpen,
    tempSelected,
    openModal,
    closeModal,
    toggleTablemate,
    selectAll,
    unselectAll,
    saveSelection
  } = useTableMateModal(foodDrinks, setFoodDrinks, tablemates);

  const handleAddName = (name: string) => {
    if (tablemates.length >= MAX_TABLEMATES) {
      alert(`Maximum ${MAX_TABLEMATES} tablemates allowed!`);
      return;
    }
    setTablemates([...tablemates, name]);
  };

  const handleDeleteName = (index: number) => {
    const deletedName = tablemates[index];
    setTablemates(tablemates.filter((_, i) => i !== index));
    
    const updatedFoodDrinks = foodDrinks.map(item => ({
      ...item,
      sharedWith: item.sharedWith.filter(name => name !== deletedName)
    }));
    setFoodDrinks(updatedFoodDrinks);
  };

  const handleAddFoodAndDrink = (foodDrink: string, amount: number, price: number) => {
    if (foodDrinks.length >= MAX_FOOD_DRINKS) {
      alert(`Maximum ${MAX_FOOD_DRINKS} food and drinks allowed!`);
      return;
    }
    setFoodDrinks([...foodDrinks, { foodDrink, amount, price, sharedWith: [] }]);
  };

  const handleDeleteFoodDrink = (index: number) => {
    setFoodDrinks(foodDrinks.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    if (tablemates.length === 0) {
      alert("Please add at least one tablemate!");
      return;
    }
    if (foodDrinks.length === 0) {
      alert("Please add at least one food/drink item!");
      return;
    }

    const calculatedBills = calculateBills(foodDrinks, tablemates, tax, serviceCharge);
    setBills(calculatedBills);
    setShowCalculation(true);
  };

  const handleReset = () => {
    setBills([]);
    setShowCalculation(false);
  };

  // Replace the old handleOpenSummary with this:
  const handleOpenSummary = (name: string) => {
    const bill = bills.find(b => b.name === name);
    if (bill) {
      setSelectedBill(bill);
      setSummaryModalOpen(true);
    }
  };

  // Add this function:
  const handleCloseSummary = () => {
    setSummaryModalOpen(false);
    setSelectedBill(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Group Meal Splitter" className="text-3xl text-white"/>
      </header>

      <main className='bg-white text-center flex-1'>
        <SectionTitle text={`Tablemates (Max : ${MAX_TABLEMATES})`}/>
        <NameForm onSubmit={handleAddName} buttonText='Add' placeholder='Tablemate Name'/>
        <TableMateList tablemates={tablemates} onDelete={handleDeleteName}/>

        <SectionTitle text={`Food & Drinks (Max : ${MAX_FOOD_DRINKS})`}/>
        <FoodDrinkForm
          onSubmit={handleAddFoodAndDrink}
          buttonText='Add'
          foodDrinkPlaceholder='Item'
          amountPlaceholder='Amount'
          pricePlaceholder='Price'
        />
        <FoodDrinkTable 
          foodDrinks={foodDrinks}
          onOpenModal={openModal}
          onDelete={handleDeleteFoodDrink}
        />

        <Modal isOpen={modalOpen} onClose={closeModal}>
          <TableMateSelector
            tablemates={tablemates}
            tempSelected={tempSelected}
            onToggle={toggleTablemate}
            onSelectAll={selectAll}
            onUnselectAll={unselectAll}
            onSave={saveSelection}
          />
        </Modal>

        <SectionTitle text={`Tax (Optional)`}/>
        <ExtraChargeForm value={tax} onChange={setTax} placeholder='Tax (Optional)'/>

        <SectionTitle text={`Service Charge (Optional)`}/>
        <ExtraChargeForm value={serviceCharge} onChange={setServiceCharge} placeholder='Service Charge (Optional)'/>

        <SectionTitle text={`Price Calculation`}/>
      
        {showCalculation && (
          <PriceCalculationTable 
            bills={bills}
            onOpenSummary={handleOpenSummary}
          />
        )}

        <div className='flex justify-center gap-2 m-2'>
          <button 
            onClick={handleCalculate}
            className='bg-blue-500 text-white rounded p-2 hover:bg-blue-600 max-w-md w-full font-bold text-lg'
          >
            {showCalculation ? 'Re-Calculate' : 'Calculate'}
          </button>

          {showCalculation && (
            <button 
              onClick={handleReset}
              className='bg-red-500 text-white rounded p-2 hover:bg-red-600 font-bold text-lg px-6'
            >
              Reset
            </button>
          )}
        </div>

        <Modal isOpen={summaryModalOpen} onClose={handleCloseSummary}>
          <SummaryModal 
            bill={selectedBill}
            tax={tax}
            serviceCharge={serviceCharge}
            totalTablemates={tablemates.length}
          />
        </Modal>

      </main>
      <footer className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Thank you for using my service" className="text-xs-1 text-white"/>
      </footer>
    </div>
  )
}

export default App