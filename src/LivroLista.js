import React, { useState, useEffect } from "react";
import { ControleLivros } from "./controle/ControleLivros";
import LinhaLivro from "./LinhaLivro";

function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);
    const controleLivros = new ControleLivros();

    useEffect(() => {
        controleLivros.obterLivros().then(livros => {
            setLivros(livros);
            setCarregado(true);
        });
    }, [carregado]);

    const excluir = async (codigo) => {
        await controleLivros.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main>
            <h1>Lista de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Autores</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <LinhaLivro key={index} livro={livro} excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default LivroLista;
