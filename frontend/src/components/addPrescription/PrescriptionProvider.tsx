import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IPrescriptionContext {
  name: string;
  setName: (text: string) => void;
  quantity: string,
  setQuantity: (text: string) => void;
  image: { uri: string; type: string; name: string;};
  setImage: ({uri, type, name}: {uri: string; type: string; name: string;}) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  numberOfDoses: number;
  setNumberOfDoses: (numDoses: number) => void;
  doseTimings: Date[];
  setDoseTimings: (dateArray: Date[]) => void;
  foodTiming: string;
  setFoodTiming: (foodTime: string) => void;
}

const PrescriptionContext = createContext<IPrescriptionContext>({
  name: '',
  setName: (text) => {},
  quantity: '',
  setQuantity: (text) => { },
  image: {uri: '', type: '', name: ''},
  setImage: (imageObj) => {},
  startDate: new Date(),
  setStartDate: (date) => {},
  endDate: new Date(),
  setEndDate: (date: Date) => {},
  numberOfDoses: 1,
  setNumberOfDoses: (numberOfDoses: number) => {},
  doseTimings: [],
  setDoseTimings: (dates) => {},
  foodTiming: '',
  setFoodTiming: (foodTime) => {}
});

const PrescriptionProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState({ uri: '', type: '', name: '' });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfDoses, setNumberOfDoses] = useState(1);
  const [doseTimings, setDoseTimings] = useState<Date[]>([]);
  const [foodTiming, setFoodTiming] = useState('AfterFood');

  return (
    <PrescriptionContext.Provider
      value={{
        name,
        image,
        quantity,
        startDate,
        endDate,
        numberOfDoses,
        doseTimings,
        setName: (text) => setName(text),
        setQuantity: (text) => setQuantity(text),
        setImage: (imageObj) => setImage(imageObj),
        setStartDate: (date) => setStartDate(date),
        setEndDate: (date) => setEndDate(date),
        setNumberOfDoses: (numDoses: number) => setNumberOfDoses(numDoses),
        setDoseTimings: (dates: Date[]) => setDoseTimings(dates),
        foodTiming: foodTiming,
        setFoodTiming: (foodTime) => setFoodTiming(foodTime)
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescription = (): IPrescriptionContext => useContext(PrescriptionContext);

export default PrescriptionProvider;
