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

interface FoodDrinkItem {
  foodDrink: string;
  amount: number;
  price: number;
  sharedWith: string[];
}

function App() {
  const MAX_TABLEMATES = 20;
  const MAX_FOOD_DRINKS = 50;

  const [tablemates, setTablemates] = useState<string[]>([]);
  const [foodDrinks, setFoodDrinks] = useState<FoodDrinkItem[]>([]);
  const [tax, setTax] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);

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
      </main>

      <footer className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Thank you for using my service" className="text-xs-1 text-white"/>
      </footer>
    </div>
  )
}

export default App