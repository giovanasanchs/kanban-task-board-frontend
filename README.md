# 📌 Kanban Board com Formulário Integrado

Este projeto é uma solução desenvolvida para o desafio técnico proposto pela **Nexum**. O objetivo é criar um **Kanban Board** totalmente funcional, responsivo e intuitivo, utilizando **Vue 3** com funcionalidades completas de **CRUD de tarefas** e **drag-and-drop entre colunas**.

> 💻 **Desenvolvido um CRUD completo, com base em boas práticas, componentização e organização, responsividade e experiência do usuário aprimorada com animações e feedbacks visuais.**

---

## 🔗 Repositório do Backend

Este projeto possui uma API backend desenvolvida em Java 17.  
Acesse o repositório clicando no link abaixo:

👉 [kanban-task-board-backend](https://github.com/giovanasanchs/kanban-task-board-backend)

---

## 🚀 Funcionalidades Implementadas

✅ Criação de tarefas com título, descrição e data de vencimento  
✅ Edição de tarefas diretamente no board  
✅ Exclusão de tarefas com confirmação  
✅ Interface intuitiva com três colunas:  
  📋 A Fazer | 🔄 Em Progresso | ✅ Concluído  
✅ Arrastar e soltar tarefas entre colunas  
✅ Layout responsivo para diferentes telas 
✅ Layout limpo e minimalista  
✅ Utilização de componentes reutilizáveis  
✅ Boas práticas de desenvolvimento e organização

---

## ✨ Funcionalidades Extras (Opcionais Adicionadas)

✨ Animações suaves ao mover tarefas  
🔎 Campo de busca para filtrar tarefas por título  

---

## 🧱 Estrutura de Colunas (Kanban Board)

O sistema é dividido em **três colunas principais**, representando o progresso das tarefas:

| Coluna        | Descrição                                      |
|---------------|-----------------------------------------------|
| 📝 A Fazer     | Tarefas criadas que ainda não foram iniciadas |
| 🔧 Em Progresso| Tarefas que estão sendo executadas            |
| ✅ Concluído   | Tarefas finalizadas                           |

---

## 🧑‍💻 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) Framework e servidor para desenvolvimento
- [VueDraggable](https://github.com/SortableJS/vue.draggable.next) para drag-and-drop
- [Phosphoricons](https://phosphoricons.com/) para ícones
- [Axios](https://axios-http.com/ptbr/) para manipulação de requisição HTTPS

---

## 📂 Organização dos Arquivos

```bash
📁 src
├── 📁 components       → Componentes reutilizáveis (cards, modals, colunas)
├── 📁 views            → Tela principal com board Kanban
├── 📁 stores           → Gerenciamento de estado (Pinia)
├── 📁 assets           → Ícones, imagens e estilos globais
├── App.vue            → Componente raiz
├── main.js            → Ponto de entrada da aplicação
```

---

## 🧪 Como Executar o Projeto Localmente

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/seu-repositorio-kanban.git

# Acesse a pasta do projeto
cd seu-repositorio-kanban

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

A aplicação estará disponível em http://localhost:5173 ou porta indicada no terminal.

```
