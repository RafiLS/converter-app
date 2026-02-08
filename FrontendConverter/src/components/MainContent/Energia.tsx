import React, { useState, useRef, useEffect } from 'react';
import './Energia.css';

const energyUnits = [
  'Joule (J)',             // 1 J
  'Quilojoule (kJ)',       // 1e3 J
  'Caloria (cal)',         // 4.184 J
  'Quilocaloria (kcal)',   // 4184 J
  'Watt hora (Wh)',        // 3600 J
  'Quilowatt hora (kWh)',  // 3.6e6 J
];

const conversionFactors: { [key: string]: number } = {
  'Joule (J)': 1,
  'Quilojoule (kJ)': 1e3,
  'Caloria (cal)': 4.184,
  'Quilocaloria (kcal)': 4184,
  'Watt hora (Wh)': 3600,
  'Quilowatt hora (kWh)': 3.6e6,
};


const Energia: React.FC = () => {
  const [fromUnit, setFromUnit] = useState<string | null>(null);
  const [toUnit, setToUnit] = useState<string | null>(null);
  const [value, setValue] = useState<number | ''>('');
  const [openFromDropdown, setOpenFromDropdown] = useState(false);
  const [openToDropdown, setOpenToDropdown] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) setOpenFromDropdown(false);
      if (toRef.current && !toRef.current.contains(event.target as Node)) setOpenToDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetSelection = () => {
    setFromUnit(null);
    setToUnit(null);
    setValue('');
    setFromSearch('');
    setToSearch('');
    setOpenFromDropdown(false);
    setOpenToDropdown(false);
  };

  const calculateResult = (): string | null => {
    if (fromUnit && toUnit && value !== '') {
      const fromFactor = conversionFactors[fromUnit];
      const toFactor = conversionFactors[toUnit];
      if (fromFactor !== undefined && toFactor !== undefined) {
        const resultValue = (value * fromFactor) / toFactor;
        return Number(resultValue.toPrecision(6)).toString();
      }
    }
    return null;
  };

  const result = calculateResult();

  return (
    <>
      <h1>Unidades de Energia</h1>

      <div className="dropdownRow">
        <div className="dropdown" ref={fromRef}>
          <input
            type="text"
            placeholder="Escreva / Selecione unidade De"
            value={fromUnit || fromSearch}
            onClick={() => setOpenFromDropdown(true)}
            onChange={e => { setFromSearch(e.target.value); setFromUnit(null); setOpenFromDropdown(true); }}
            className="dropdownToggle"
          />
          {openFromDropdown && (
            <div className="dropdownMenu">
              {energyUnits
                .filter(unit => unit.toLowerCase().includes((fromSearch || fromUnit || '').toLowerCase()))
                .map(unit => (
                  <button
                    key={unit}
                    className="dropdownItem"
                    onClick={() => { setFromUnit(unit); setFromSearch(''); setOpenFromDropdown(false); }}
                  >
                    {unit}
                  </button>
                ))}
            </div>
          )}
        </div>

        <div className="dropdown" ref={toRef}>
          <input
            type="text"
            placeholder="Escreva / Selecione unidade Para"
            value={toUnit || toSearch}
            onClick={() => setOpenToDropdown(true)}
            onChange={e => { setToSearch(e.target.value); setToUnit(null); setOpenToDropdown(true); }}
            className="dropdownToggle"
          />
          {openToDropdown && (
            <div className="dropdownMenu">
              {energyUnits
                .filter(unit => unit.toLowerCase().includes((toSearch || toUnit || '').toLowerCase()))
                .map(unit => (
                  <button
                    key={unit}
                    className="dropdownItem"
                    onClick={() => { setToUnit(unit); setToSearch(''); setOpenToDropdown(false); }}
                  >
                    {unit}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {fromUnit && toUnit && (
        <div className="conversionRow">
          <input
            type="number"
            placeholder={`Valor em ${fromUnit}`}
            value={value}
            onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))}
            className="valueInput"
          />
          {value !== '' && result !== null && (
            <p className="resultBox">{value} {fromUnit} = <b>{result}</b> {toUnit}</p>
          )}
        </div>
      )}

      {(fromUnit || toUnit || value !== '') && (
        <button className="resetButton" onClick={resetSelection}>Reiniciar seleção</button>
      )}
    </>
  );
};

export default Energia;
