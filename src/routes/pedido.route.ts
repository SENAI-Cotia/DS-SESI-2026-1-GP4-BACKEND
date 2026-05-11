import { Router } from "express"; // Importa o Router do express (para criar rotas separadas)

import prisma from "../lib/prisma"; //Importa conexão com o banco (prisma)
const app = Router(); // Cria um mini servidor de rotas


app.post("/pedido", async (req, res) => { //Rota para criar o pedido
    const { usuarioId, itens } = req.body; // Pega os dados enviados do body
    try {

        // Calcular pedido automaticamente
        const alimentosIds = itens.map((item: any) => item.alimentoId); // pega todos os ids dos alimentos
        const alimentos = await prisma.alimento.findMany({ // busca os alimentos no banco
            where: {
                id: { in: alimentosIds }
            }
        });

        let totalCalculado = 0; // calcula o total
        itens.forEach((item: any) => {
            const alimento = alimentos.find(a => a.id === item.alimentoId);
            if (alimento) {
                totalCalculado += alimento.preco * item.quantidade;
            }


        });
        const pedido = await prisma.pedido.create({  //Cria um novo pedido no banco
            data: {
                status: "pendente", // começa como pendente
                total: totalCalculado,
                senha: Math.floor(Math.random() * 1000), // Gera uma senha aleatória para o pedido
                pagamento: {
                    create: {
                        valor: totalCalculado
                    }
                },
                usuario: {
                    connect: { id: usuarioId }
                },
                itens: { // cria os itens do pedido
                    create: itens.map((item: { quantidade: number; alimentoId: number; }) => ({
                        quantidade: item.quantidade,
                        alimentoId: item.alimentoId
                    }))
                }
            },

            include: {  // Pra já retornar os itens junto
                itens: true
            }
        });
        res.status(201).json(pedido); // Retorna caso dê certo
    } catch (error) {
        console.log(error); // Mostra erro no terminal
        res.status(500).json({ error: "Erro ao criar pedido" }); // Caso dê erro, dá erro
    }
});

////////////////////////////////////////////Status Pedido ///////////////////////////////////////
app.put("/pedido/:id/status", async (req, res) => {
  const {id} = req.params; // pega o id do pedido pela url
  const status = req.params; // pega o novo status do body
  try {
    const pedidoAtualizado = await prisma.pedido.update ({
        where: {
            id: Number(id) // converte para numero

        },
        data: {
            status: req.body.status //  novo status (pendente , concluido e cancelado)

        }
    });
    res.status(200).json(pedidoAtualizado);
  } catch (error) {
    console.log(error); 
    res.status(500).json({error: "Erro ao atualizar status do pedido"})
  }
} )


export default app