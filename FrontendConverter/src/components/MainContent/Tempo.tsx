import React, { useState, useRef, useEffect } from 'react';
import './Tempo.css';

const timeUnits = [
    'Segundos (s)',      // 1 s
    'Milissegundos (ms)',// 1e-3 s
    'Minutos (min)',     // 60 s
    'Horas (h)',         // 3600 s
    'Dias (d)',          // 86400 s
    'Semanas (wk)',      // 604800 s
    'Meses (mo)',        // 2.628e6 s (média)
    'Anos (yr)'          // 3.154e7 s (365 dias)
];

const conversionFactors: { [key: string]: number } = {
    'Segundos (s)': 1,
    'Milissegundos (ms)': 0.001,
    'Minutos (min)': 60,
    'Horas (h)': 3600,
    'Dias (d)': 86400,
    'Semanas (wk)': 604800,
    'Meses (mo)': 2.628e6,
    'Anos (yr)': 3.154e7
};

const Tempo: React.FC = () => {
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
            <h1>Unidades de Tempo</h1>

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
                            {timeUnits
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
                            {timeUnits
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
                Tempo é a grandeza física que permite medir a duração e a sequência de acontecimentos.
                É uma das medições mais fundamentais na vida cotidiana e na ciência, sendo usado para
                organizar atividades, estudar fenômenos naturais e sincronizar processos. As unidades mais
                comuns de tempo incluem segundos (s), minutos (min), horas (h), dias e anos. A medição precisa
                do tempo é essencial em áreas como astronomia, física, transporte, tecnologia e comunicação.
            </p>

        </>
    );
};

export default Tempo;
