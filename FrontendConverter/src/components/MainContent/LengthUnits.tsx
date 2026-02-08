import React, { useState, useRef, useEffect } from 'react';
import './LengthUnits.css';

const lengthUnits = [
    'Metro (m)',           // 1 m
    'Centímetro (cm)',     // 1e-2 m
    'Milímetro (mm)',      // 1e-3 m
    'Quilómetro (km)',     // 1000 m
    'Polegada (in)',       // 0.0254 m
    'Pé (ft)',             // 0.3048 m
    'Jarda (yd)',          // 0.9144 m
    'Milha (mi)',          // 1609.34 m
    'Milha Náutica (nmi)', // 1852 m
    'Decímetro (dm)',      // 1e-1 m
    'Decâmetro (dam)',     // 10 m
    'Hectómetro (hm)',     // 100 m
    'Megâmetro (Mm)',      // 1e6 m
    'Gigâmetro (Gm)',      // 1e9 m
    'Terâmetro (Tm)',      // 1e12 m
    'Petâmetro (Pm)',      // 1e15 m
    'Exâmetro (Em)',       // 1e18 m
    'Zetâmetro (Zm)',      // 1e21 m
    'Iotâmetro (Ym)',      // 1e24 m
    'Micrómetro (µm)',     // 1e-6 m
    'Nanómetro (nm)',      // 1e-9 m
    'Picómetro (pm)',      // 1e-12 m
    'Femtómetro (fm)',     // 1e-15 m
    'Attómetro (am)',      // 1e-18 m
    'Zeptómetro (zm)',     // 1e-21 m
    'Yoctómetro (ym)'      // 1e-24 m
];

const conversionFactors: { [key: string]: number } = {
    'Metro (m)': 1,
    'Centímetro (cm)': 0.01,
    'Milímetro (mm)': 0.001,
    'Quilómetro (km)': 1000,
    'Polegada (in)': 0.0254,
    'Pé (ft)': 0.3048,
    'Jarda (yd)': 0.9144,
    'Milha (mi)': 1609.34,
    'Milha Náutica (nmi)': 1852,
    'Decímetro (dm)': 0.1,
    'Decâmetro (dam)': 10,
    'Hectómetro (hm)': 100,
    'Megâmetro (Mm)': 1e6,
    'Gigâmetro (Gm)': 1e9,
    'Terâmetro (Tm)': 1e12,
    'Petâmetro (Pm)': 1e15,
    'Exâmetro (Em)': 1e18,
    'Zetâmetro (Zm)': 1e21,
    'Iotâmetro (Ym)': 1e24,
    'Micrómetro (µm)': 1e-6,
    'Nanómetro (nm)': 1e-9,
    'Picómetro (pm)': 1e-12,
    'Femtómetro (fm)': 1e-15,
    'Attómetro (am)': 1e-18,
    'Zeptómetro (zm)': 1e-21,
    'Yoctómetro (ym)': 1e-24
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
            <h1>Unidades de Comprimento</h1>

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
                        placeholder="Escreva / Selecione unidade Para"
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
                Comprimento é a medida da extensão de um objeto de uma ponta à outra.
                É uma das principais grandezas físicas e é usada para medir distâncias,
                tamanhos de objetos ou espaços entre pontos.
            </p>
        </>

    );
};

export default LengthUnits;
