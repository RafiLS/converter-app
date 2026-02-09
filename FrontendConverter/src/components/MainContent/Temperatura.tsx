import React, { useState, useRef, useEffect } from 'react';
import './Temperatura.css';

const temperatureUnits = [
    'Celsius (°C)',
    'Fahrenheit (°F)',
    'Kelvin (K)'
];

const conversionFactors: { [key: string]: (value: number) => number } = {
    'Celsius (°C)': (v) => v,
    'Fahrenheit (°F)': (v) => (v - 32) * 5 / 9,
    'Kelvin (K)': (v) => v - 273.15
};

const Temperatura: React.FC = () => {
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

    const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
        if (fromUnit === toUnit) return value;

        let celsiusValue = conversionFactors[fromUnit](value);

        switch (toUnit) {
            case 'Celsius (°C)':
                return celsiusValue;
            case 'Fahrenheit (°F)':
                return celsiusValue * 9 / 5 + 32;
            case 'Kelvin (K)':
                return celsiusValue + 273.15;
            default:
                return celsiusValue;
        }
    };

    const calculateResult = (): string | null => {
        if (fromUnit && toUnit && value !== '') {
            const resultValue = convertTemperature(value, fromUnit, toUnit);
            return Number(resultValue.toPrecision(3)).toString();
        }
        return null;
    };

    const result = calculateResult();

    return (
        <>
            <h1>Temperature Units</h1>

            <div className="dropdownRow">
                <div className="dropdown" ref={fromRef}>
                    <input
                        type="text"
                        placeholder="Choose unit From"
                        value={fromUnit || fromSearch}
                        onClick={() => setOpenFromDropdown(true)}
                        onChange={e => { setFromSearch(e.target.value); setFromUnit(null); setOpenFromDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {openFromDropdown && (
                        <div className="dropdownMenu">
                            {temperatureUnits
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
                        placeholder="Choose unit To"
                        value={toUnit || toSearch}
                        onClick={() => setOpenToDropdown(true)}
                        onChange={e => { setToSearch(e.target.value); setToUnit(null); setOpenToDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {openToDropdown && (
                        <div className="dropdownMenu">
                            {temperatureUnits
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
                Temperature is a measure that indicates the degree of heat or cold of a body or environment.
                It is a fundamental physical quantity used to describe the thermal energy of systems.
                The most common temperature units include Celsius (°C), Kelvin (K) and Fahrenheit (°F).
                Temperature influences various physical, chemical and biological phenomena, being essential
                in daily activities, in industry, in science and in meteorology.
            </p>

        </>
    );
};

export default Temperatura;
