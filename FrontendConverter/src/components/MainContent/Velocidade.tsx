import React, { useState, useRef, useEffect } from 'react';
import './Velocidade.css';

const speedUnits = [
    'Metros por segundo (m/s)',      // 1 m/s
    'Quilômetros por hora (km/h)',   // 0.277778 m/s
    'Milhas por hora (mph)',         // 0.44704 m/s
    'Nós (kn)',                      // 0.514444 m/s
    'Pés por segundo (ft/s)'         // 0.3048 m/s
];

const conversionFactors: { [key: string]: number } = {
    'Metros por segundo (m/s)': 1,
    'Quilômetros por hora (km/h)': 0.277778,
    'Milhas por hora (mph)': 0.44704,
    'Nós (kn)': 0.514444,
    'Pés por segundo (ft/s)': 0.3048
};

const Velocidade: React.FC = () => {
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
                return Number(resultValue.toPrecision(3)).toString();
            }
        }
        return null;
    };

    const result = calculateResult();

    return (
        <>
            <h1>Unidades de Velocidade</h1>

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
                            {speedUnits
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
                            {speedUnits
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
                Velocidade é a grandeza física que indica a rapidez com que um objeto se desloca em relação a um ponto de referência.
                Ela relaciona a distância percorrida com o tempo gasto, sendo fundamental para descrever movimentos.
                As unidades mais comuns de velocidade incluem metros por segundo (m/s), quilômetros por hora (km/h) e milhas por hora (mph).
                A velocidade é amplamente utilizada na física, engenharia, transporte, esportes e na análise de trajetórias.
            </p>

        </>
    );
};

export default Velocidade;
