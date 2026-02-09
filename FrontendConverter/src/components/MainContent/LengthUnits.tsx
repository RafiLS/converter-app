import React, { useState, useRef, useEffect } from 'react';
import './LengthUnits.css';

const lengthUnits = [
    'Meter (m)',            // 1 m
    'Centimeter (cm)',      // 1e-2 m
    'Millimeter (mm)',      // 1e-3 m
    'Kilometer (km)',       // 1000 m
    'Inch (in)',            // 0.0254 m
    'Foot (ft)',            // 0.3048 m
    'Yard (yd)',            // 0.9144 m
    'Mile (mi)',            // 1609.34 m
    'Nautical mile (nmi)', // 1852 m
    'Decimeter (dm)',       // 1e-1 m
    'Decameter (dam)',      // 10 m
    'Hectometer (hm)',      // 100 m
    'Megameter (Mm)',       // 1e6 m
    'Gigameter (Gm)',       // 1e9 m
    'Terameter (Tm)',       // 1e12 m
    'Petameter (Pm)',       // 1e15 m
    'Exameter (Em)',        // 1e18 m
    'Zettameter (Zm)',      // 1e21 m
    'Yottameter (Ym)',      // 1e24 m
    'Micrometer (µm)',      // 1e-6 m
    'Nanometer (nm)',       // 1e-9 m
    'Picometer (pm)',       // 1e-12 m
    'Femtometer (fm)',      // 1e-15 m
    'Attometer (am)',       // 1e-18 m
    'Zeptometer (zm)',      // 1e-21 m
    'Yoctometer (ym)'       // 1e-24 m
];

const conversionFactors: { [key: string]: number } = {
    'Meter (m)': 1,
    'Centimeter (cm)': 0.01,
    'Millimeter (mm)': 0.001,
    'Kilometer (km)': 1000,
    'Inch (in)': 0.0254,
    'Foot (ft)': 0.3048,
    'Yard (yd)': 0.9144,
    'Mile (mi)': 1609.34,
    'Nautical mile (nmi)': 1852,
    'Decimeter (dm)': 0.1,
    'Decameter (dam)': 10,
    'Hectometer (hm)': 100,
    'Megameter (Mm)': 1e6,
    'Gigameter (Gm)': 1e9,
    'Terameter (Tm)': 1e12,
    'Petameter (Pm)': 1e15,
    'Exameter (Em)': 1e18,
    'Zettameter (Zm)': 1e21,
    'Yottameter (Ym)': 1e24,
    'Micrometer (µm)': 1e-6,
    'Nanometer (nm)': 1e-9,
    'Picometer (pm)': 1e-12,
    'Femtometer (fm)': 1e-15,
    'Attometer (am)': 1e-18,
    'Zeptometer (zm)': 1e-21,
    'Yoctometer (ym)': 1e-24
};

const LengthUnits: React.FC = () => {
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
            <h1>Units of Length</h1>

            <div className="dropdownRow">
                <div className="dropdown" ref={fromRef}>
                    <input
                        type="text"
                        placeholder="Write / Select From Unit"
                        value={fromUnit || fromSearch}
                        onClick={() => setOpenFromDropdown(true)}
                        onChange={e => { setFromSearch(e.target.value); setFromUnit(null); setOpenFromDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {openFromDropdown && (
                        <div className="dropdownMenu">
                            {lengthUnits
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
                        placeholder="Write / Select To Unit"
                        value={toUnit || toSearch}
                        onClick={() => setOpenToDropdown(true)}
                        onChange={e => { setToSearch(e.target.value); setToUnit(null); setOpenToDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {openToDropdown && (
                        <div className="dropdownMenu">
                            {lengthUnits
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
                Length is the measurement of the extent of an object from one end to the other.
                It is one of the main physical quantities and is used to measure distances,
                sizes of objects or spaces between points.
            </p>
        </>

    );
};

export default LengthUnits;
