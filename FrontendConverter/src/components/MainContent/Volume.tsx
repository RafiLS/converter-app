import React, { useState, useRef, useEffect } from 'react';
import './Volume.css';

const volumeUnits = [
    'Litro (L)',           // 1 L
    'Mililitro (mL)',      // 1e-3 L
    'Centilitro (cL)',     // 1e-2 L
    'Decilitro (dL)',      // 1e-1 L
    'Metro Cúbico (m³)',   // 1000 L
    'Decâmetro Cúbico (dam³)', // 1000 L
    'Hectômetro Cúbico (hm³)', // 1e6 L
    'Galão (US gal)',      // 3.78541 L
    'Galão (UK gal)',      // 4.54609 L
    'Onça Líquida (fl oz)',// 0.0295735 L
    'Barril (bbl)'         // 158.987 L
];

const conversionFactors: { [key: string]: number } = {
    'Litro (L)': 1,
    'Mililitro (mL)': 0.001,
    'Centilitro (cL)': 0.01,
    'Decilitro (dL)': 0.1,
    'Metro Cúbico (m³)': 1000,
    'Decâmetro Cúbico (dam³)': 1000,
    'Hectômetro Cúbico (hm³)': 1e6,
    'Galão (US gal)': 3.78541,
    'Galão (UK gal)': 4.54609,
    'Onça Líquida (fl oz)': 0.0295735,
    'Barril (bbl)': 158.987
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
            <h1>Unidades de Volume</h1>

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
                        placeholder="Escreva / Selecione unidade Para"
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
            <p className="explicacao">
                Volume é a medida do espaço ocupado por um objeto ou substância em três dimensões.
                É uma grandeza física fundamental usada para quantificar líquidos, gases e sólidos.
                As unidades de volume mais comuns incluem litros (L), mililitros (mL), metros cúbicos (m³) e centímetros cúbicos (cm³).
                O volume é importante em diversas áreas, como ciência, engenharia, culinária e transporte,
                ajudando a determinar a capacidade de recipientes e o espaço ocupado por materiais.
            </p>
        </>
    );
};

export default Volume;
