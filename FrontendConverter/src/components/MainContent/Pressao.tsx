import React, { useState, useRef, useEffect } from 'react';
import './Pressao.css';

const unidadesPressao = [
     'Pascal (Pa)',             // 1 Pa
    'Kilopascal (kPa)',        // 1e3 Pa
    'Megapascal (MPa)',        // 1e6 Pa
    'Bar (bar)',               // 1e5 Pa
    'Millimeter of Mercury (mmHg)', // 133.322 Pa
    'Atmosphere (atm)',        // 101325 Pa
    'Psi (psi)'                // 6894.76 Pa
];

const fatoresConversao: { [key: string]: number } = {
    'Pascal (Pa)': 1,
    'Kilopascal (kPa)': 1e3,
    'Megapascal (MPa)': 1e6,
    'Bar (bar)': 1e5,
    'Millimeter of Mercury (mmHg)': 133.322,
    'Atmosphere (atm)': 101325,
    'Psi (psi)': 6894.76
};

const Pressao: React.FC = () => {
    const [deUnidade, setDeUnidade] = useState<string | null>(null);
    const [paraUnidade, setParaUnidade] = useState<string | null>(null);
    const [valor, setValor] = useState<number | ''>('');
    const [abertoDeDropdown, setAbertoDeDropdown] = useState(false);
    const [abertoParaDropdown, setAbertoParaDropdown] = useState(false);
    const [pesquisaDe, setPesquisaDe] = useState('');
    const [pesquisaPara, setPesquisaPara] = useState('');

    const deRef = useRef<HTMLDivElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (deRef.current && !deRef.current.contains(event.target as Node)) setAbertoDeDropdown(false);
            if (paraRef.current && !paraRef.current.contains(event.target as Node)) setAbertoParaDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const reiniciar = () => {
        setDeUnidade(null);
        setParaUnidade(null);
        setValor('');
        setPesquisaDe('');
        setPesquisaPara('');
        setAbertoDeDropdown(false);
        setAbertoParaDropdown(false);
    };

    const calcularResultado = (): string | null => {
        if (deUnidade && paraUnidade && valor !== '') {
            const fatorDe = fatoresConversao[deUnidade];
            const fatorPara = fatoresConversao[paraUnidade];
            if (fatorDe !== undefined && fatorPara !== undefined) {
                const resultado = (valor * fatorDe) / fatorPara;
                return Number(resultado.toPrecision(6)).toString();
            }
        }
        return null;
    };

    const resultado = calcularResultado();

    return (
        <>
            <h1>Pressure Converter</h1>

            <div className="dropdownRow">
                <div className="dropdown" ref={deRef}>
                    <input
                        type="text"
                        placeholder="Choose From Unit"
                        value={deUnidade || pesquisaDe}
                        onClick={() => setAbertoDeDropdown(true)}
                        onChange={e => { setPesquisaDe(e.target.value); setDeUnidade(null); setAbertoDeDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {abertoDeDropdown && (
                        <div className="dropdownMenu">
                            {unidadesPressao
                                .filter(unidade => unidade.toLowerCase().includes((pesquisaDe || deUnidade || '').toLowerCase()))
                                .map(unidade => (
                                    <button
                                        key={unidade}
                                        className="dropdownItem"
                                        onClick={() => { setDeUnidade(unidade); setPesquisaDe(''); setAbertoDeDropdown(false); }}
                                    >
                                        {unidade}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>

                <div className="dropdown" ref={paraRef}>
                    <input
                        type="text"
                        placeholder="Choose To Unit"
                        value={paraUnidade || pesquisaPara}
                        onClick={() => setAbertoParaDropdown(true)}
                        onChange={e => { setPesquisaPara(e.target.value); setParaUnidade(null); setAbertoParaDropdown(true); }}
                        className="dropdownToggle"
                    />
                    {abertoParaDropdown && (
                        <div className="dropdownMenu">
                            {unidadesPressao
                                .filter(unidade => unidade.toLowerCase().includes((pesquisaPara || paraUnidade || '').toLowerCase()))
                                .map(unidade => (
                                    <button
                                        key={unidade}
                                        className="dropdownItem"
                                        onClick={() => { setParaUnidade(unidade); setPesquisaPara(''); setAbertoParaDropdown(false); }}
                                    >
                                        {unidade}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {deUnidade && paraUnidade && (
                <div className="conversionRow">
                    <input
                        type="number"
                        placeholder={`Value in ${deUnidade}`}
                        value={valor}
                        onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
                        className="valueInput"
                    />
                    {valor !== '' && resultado !== null && (
                        <p className="resultBox">{valor} {deUnidade} = <b>{resultado}</b> {paraUnidade}</p>
                    )}
                </div>
            )}

            {(deUnidade || paraUnidade || valor !== '') && (
                <button className="resetButton" onClick={reiniciar}>Reset Selection</button>
            )}
            <p className="explicacao">
                Pressure is the force exerted per unit area on a surface.
                It is a fundamental physical quantity in fluid mechanics and in various applications in daily life.
                The most common pressure units include pascal (Pa), bar, atmosphere (atm) and millimeters of mercury (mmHg).
                Pressure is important in science, engineering, meteorology, medicine and industry,
                influencing everything from tire and hydraulic system operation to natural phenomena.
            </p>
        </>
    );
};

export default Pressao;
