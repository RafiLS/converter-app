import React, { useState, useRef, useEffect } from 'react';
import './Volume.css';

const volumeUnits = [
    'Liter (L)',               // 1 L
    'Milliliter (mL)',         // 1e-3 L
    'Centiliter (cL)',         // 1e-2 L
    'Deciliter (dL)',          // 1e-1 L
    'Cubic meter (m³)',        // 1000 L
    'Cubic decameter (dam³)',  // 1000 L
    'Cubic hectometer (hm³)',  // 1e6 L
    'US gallon (US gal)',      // 3.78541 L
    'UK gallon (UK gal)',      // 4.54609 L
    'Fluid ounce (fl oz)',     // 0.0295735 L
    'Barrel (bbl)'             // 158.987 L
];

const conversionFactors: { [key: string]: number } = {
    'Liter (L)': 1,
    'Milliliter (mL)': 0.001,
    'Centiliter (cL)': 0.01,
    'Deciliter (dL)': 0.1,
    'Cubic meter (m³)': 1000,
    'Cubic decameter (dam³)': 1000,
    'Cubic hectometer (hm³)': 1e6,
    'US gallon (US gal)': 3.78541,
    'UK gallon (UK gal)': 4.54609,
    'Fluid ounce (fl oz)': 0.0295735,
    'Barrel (bbl)': 158.987
};

const Volume: React.FC = () => {
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
            if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
                setOpenFromDropdown(false);
            }
            if (toRef.current && !toRef.current.contains(event.target as Node)) {
                setOpenToDropdown(false);
            }
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
                return Number(resultValue.toPrecision(3)).toString();
            }
        }
        return null;
    };

    const result = calculateResult();

    return (
        <>
            <h1>Volume Units</h1>

            <div className="dropdownRow">
                <div className="dropdown" ref={fromRef}>
                    <input
                        type="text"
                        placeholder="Write / Select unit From"
                        value={fromUnit || fromSearch}
                        onClick={() => setOpenFromDropdown(true)}
                        onChange={e => { setFromSearch(e.target.value); setFromUnit(null); setOpenFromDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {openFromDropdown && (
                        <div className="dropdownMenu">
                            {volumeUnits
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
                        placeholder="Write / Select unit To"
                        value={toUnit || toSearch}
                        onClick={() => setOpenToDropdown(true)}
                        onChange={e => { setToSearch(e.target.value); setToUnit(null); setOpenToDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {openToDropdown && (
                        <div className="dropdownMenu">
                            {volumeUnits
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
                        placeholder={`Value in ${fromUnit}`}
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
                <button className="resetButton" onClick={resetSelection}>Reset Selection</button>
            )}
            <p className="explicacao">
                Volume is the measure of the space occupied by an object or substance in three dimensions.
                It is a fundamental physical quantity used to quantify liquids, gases and solids.
                The most common volume units include liters (L), milliliters (mL), cubic meters (m³) and cubic centimeters (cm³).
                Volume is important in various fields such as science, engineering, cooking and transportation,
                helping to determine the capacity of containers and the space occupied by materials.
            </p>
        </>
    );
};

export default Volume;
