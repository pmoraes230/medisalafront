# GestSala - Sistema de Gestão de Salas e Insumos

<p align="center">
  <img src="./public/logo.png" alt="GestSala Logo" width="180"/>
</p>

<p align="center">
  <strong>Sistema completo de reserva de salas, controle de insumos e gestão de usuários</strong>
</p>

<p align="center">
  <a href="#features">Funcionalidades</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#imagens">Imagens</a> •
  <a href="#autor">Autor</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow" alt="Status"/>
</p>

## Funcionalidades

| Módulo              | Recursos Implementados                                                                 |
|---------------------|-----------------------------------------------------------------------------------------|
| **Dashboard**       | Visão geral, relógio em tempo real, estatísticas rápidas                                |
| **Reservas**        | Agendamento com verificação de conflito, seleção de insumos, atualização automática de estoque |
| **Salas**           | Cadastro, edição e exclusão de salas com capacidade e status                         |
| **Insumos**         | Controle de estoque, validade, baixo estoque, consumo automático ao reservar            |
| **Usuários**        | Cadastro de usuários (em desenvolvimento)                                              |
| **Perfil**          | Upload de foto, salvamento no localStorage, sincronizado com header                     |
| **Autenticação**    | Simulação com contexto + localStorage (pronto para integrar com backend)               |
| **Acessibilidade**  | Modo escuro automático, aumento de fonte, alto contraste                                |
| **Responsivo**      | 100% adaptável para tablet e celular                                                    |

## Tecnologias

- **React 18** + **TypeScript**
- **Vite** (build ultra rápido)
- **Tailwind CSS** (design moderno e responsivo)
- **React Router DOM** (navegação)
- **Zustand** ou **Context API** (gerenciamento de estado)
- **localStorage** (persistência de dados)
- **Font Awesome** + **Bootstrap Icons**

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gestsala.git

# Entre na pasta
cd gestsala

# Instale as dependências
npm install
# ou
yarn
# ou
pnpm install

# Rode o projeto
npm run dev
# ou
yarn dev