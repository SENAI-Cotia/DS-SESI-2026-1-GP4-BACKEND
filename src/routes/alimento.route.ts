import { Router } from "express";

import prisma from "../lib/prisma";

const app = Router();


////////////////////////// Criar Produtos Funcionário /////////////////////////////////

app.post("/alimento", async (req, res) => {
    const { nome, validade, ingredientes, unidades, preco } = req.body; //Pega dados da tabela
    try {
        const alimento = await prisma.alimento.create({  // Criando alimento no banco de dados
            data: {
                nome,
                validade,
                preco,
                ingredientes,
                unidades
            }
        })
        res.status(201).json(alimento) //Retorna o alimento criado
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar alimento" }) //Vai retornar erro caso dê erro
    }
});

/////////////////////////////// Atualizar Produtos Funcionário ///////////////////////////////////////

app.put("/alimento/:id", async (req, res) => {
    const { id } = req.params; // Pega o id da URL (ex: alimentos/1)
    const { nome, validade, ingredientes, unidades, preco } = req.body; //Pega os novos dados da tabela

    try {
        const alimento = await prisma.alimento.update({ //Vai atualizar o novo alimento no banco de dados
            where: { id: Number(id) }, //Converte o id para número
            data: {
                nome,
                validade,
                preco,
                ingredientes,
                unidades
            }

        })
        res.status(200).json(alimento) //Retorna o alimento
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar alimento" }) //Se o id não existir ou der erro, vai dar erro
    }
});

/////////////////////////////////// Deletar Produtos Funcinário ////////////////////////////////

app.delete("/alimento/:id", async (req, res) => {
    const { id } = req.params; // Pega o id da URL (ex: alimentos/1)

    try {
        await prisma.alimento.delete({ // Vai deletar o alimento do banco de dados
            where: { id: Number(id) }, //Converte o id para número
        })

        res.status(200).json({ mensagem: "Alimento deletado com sucesso" }) // Retorna a mensagem de sucesso
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar alimento" }) // Caso de error, da erro
    }
});

////////////////////////////// Listar Produtos Funcionário //////////////////////////////////

app.get("/alimento", async (req, res) => {
    try {
        const alimentos = await prisma.alimento.findMany(); // Busca todos os alimentos no banco de dados

        res.status(200).json(alimentos) // Retorna
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar alimentos" }) // Caso de error, da erro
    }
});




export default app