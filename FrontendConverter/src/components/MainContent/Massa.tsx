import React, { useState, useRef, useEffect } from 'react';
import './Massa.css';

const massUnits = [
    'Gramas (g)',           // 1 g
    'Miligramas (mg)',      // 1e-3 g
    'Centigramas (cg)',     // 1e-2 g
    'Decigramas (dg)',      // 1e-1 g
    'Quilogramas (kg)',     // 1e3 g
    'Toneladas (t)',        // 1e6 g
    'Onças (oz)',           // 28.3495 g
    'Libras (lb)',          // 453.592 g
    'Stone (st)'            // 6350.29 g
];

const conversionFactors: { [key: string]: number } = {
    'Gramas (g)': 1,
    'Miligramas (mg)': 0.001,
    'Centigramas (cg)': 0.01,
    'Decigramas (dg)': 0.1,
    'Quilogramas (kg)': 1000,
    'Toneladas (t)': 1e6,
    'Onças (oz)': 28.3495,
    'Libras (lb)': 453.592,
    'Stone (st)': 6350.29
};

const Massa: React.FC = () => {
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
            <h1>Unidades de Massa</h1>

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
                            {massUnits
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
                            {massUnits
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
                Massa é a quantidade de matéria presente em um corpo, sendo uma grandeza física fundamental.
                Diferente do peso, a massa não depende da gravidade e é medida em unidades como quilogramas (kg),
                gramas (g) e toneladas (t). Ela é essencial para calcular a inércia de objetos e está presente em
                diversas aplicações da ciência, engenharia e do cotidiano.
            </p>

        </>
    );
};

export default Massa;
