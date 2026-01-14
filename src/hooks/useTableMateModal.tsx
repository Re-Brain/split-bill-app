import { useState } from 'react';

interface FoodDrinkItem {
  foodDrink: string;
  amount: number;
  price: number;
  sharedWith: string[];
}

export const useTableMateModal = (
  foodDrinks: FoodDrinkItem[],
  setFoodDrinks: (items: FoodDrinkItem[]) => void,
  tablemates: string[]
) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  const openModal = (index: number) => {
    setSelectedItemIndex(index);
    setTempSelected(foodDrinks[index].sharedWith);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItemIndex(null);
    setTempSelected([]);
  };

  const toggleTablemate = (name: string) => {
    if (tempSelected.includes(name)) {
      setTempSelected(tempSelected.filter(n => n !== name));
    } else {
      setTempSelected([...tempSelected, name]);
    }
  };

  const selectAll = () => {
    setTempSelected([...tablemates]);
  };

  const unselectAll = () => {
    setTempSelected([]);
  };

  const saveSelection = () => {
    if (selectedItemIndex !== null) {
      const updatedFoodDrinks = [...foodDrinks];
      updatedFoodDrinks[selectedItemIndex].sharedWith = tempSelected;
      setFoodDrinks(updatedFoodDrinks);
      closeModal();
    }
  };

  return {
    modalOpen,
    tempSelected,
    openModal,
    closeModal,
    toggleTablemate,
    selectAll,
    unselectAll,
    saveSelection
  };
};