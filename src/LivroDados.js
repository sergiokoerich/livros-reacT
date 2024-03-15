import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    const navigate = useNavigate();

    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event) => {
        event.preventDefault();
        const autoresArray = autores.split('\n');
        const novoLivro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autoresArray,
            codEditora
        };
        controleLivro.incluir(novoLivro);
        navigate('/');
    };

    return (
        <main>
            <h1>Cadastro de Livros</h1>
            <form onSubmit={incluir}>
                <div className="form-group">
                    <label>Título:</label>
                    <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Resumo:</label>
                    <textarea className="form-control" value={resumo} onChange={(e) => setResumo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Autores:</label>
                    <textarea className="form-control" value={autores} onChange={(e) => setAutores(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Editora:</label>
                    <select className="form-control" value={codEditora} onChange={tratarCombo}>
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Incluir</button>
            </form>
        </main>
    );
};

export default LivroDados;
