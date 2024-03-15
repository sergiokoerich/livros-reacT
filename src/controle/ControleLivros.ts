import {Livro} from '../modelo/Livro';

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
    _id: string | null;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

export class ControleLivros {
    async obterLivros(): Promise<Livro[]> {
        const response = await fetch(baseURL);
        const livrosMongo: LivroMongo[] = await response.json();
        return livrosMongo.map((livroMongo: LivroMongo) => {
            return new Livro(
                livroMongo._id || "",
                livroMongo.codEditora,
                livroMongo.titulo,
                livroMongo.resumo,
                livroMongo.autores
            );
        });
    }

    async excluir(codigo: string): Promise<boolean> {
        const response = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });
        return response.ok;
    }

    async incluir(livro: Livro): Promise<boolean> {
        const livroMongo: LivroMongo = {
            _id: null,
            codEditora: livro.codEditora,
            titulo: livro.titulo,
            resumo: livro.resumo,
            autores: livro.autores
        };
        const response = await fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(livroMongo)
        });
        return response.ok;
    }
}