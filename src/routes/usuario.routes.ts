import express from "express";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { error } from "node:console";


const app = express();

app.use(express.json());


//Retorna o tipo do usuário
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });

    if (!usuario) {
        return res.status(400).json({ erro: "Login inválido" });
    }

    if (!(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ error: "Credenciais inválidas" })
    }

    return res.status(200).json("Login realizado com sucesso!")
});

//Cadastro do usuário
app.post("/cadastro", async (req, res) => {
    const { nome, email, telefone, cpf, password, tipoUsuario, codigoFuncionario } = req.body;

    const usuarioExistente = await prisma.usuario.findFirst({   //para ver se o usuario existe
        where: { OR: [{ email }, { cpf }] }   // verifica se ja existe esse email ou se ja existe o cpf
    })

    if (usuarioExistente) {
        return res.status(400).json({ error: "Usuário já existe" })
    }

    //Criptografar senha
    const senhaCriptografada = await bcrypt.hash(password, 10)


    //Cria usuário
    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            telefone,
            cpf,
            tipoUsuario: "aluno",
            password: senhaCriptografada
        }
    })

    res.status(201).json({
        mensagem: "Cadastro realizado com sucesso",
        usuario
    })
})
