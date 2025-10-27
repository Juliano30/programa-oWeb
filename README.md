# 🌟 Plataforma Web para ONGs

## 📋 Sobre o Projeto
Este projeto implementa uma plataforma web profissional para ONGs, com foco em acessibilidade, usabilidade e boas práticas de desenvolvimento. O projeto foi desenvolvido como parte da disciplina de Programação Web, aplicando conceitos avançados de desenvolvimento front-end e práticas profissionais de mercado.

### 👥 Personas
1. **Administrador da ONG**
   - Gerenciamento de informações institucionais
   - Cadastro e edição de projetos
   - Acompanhamento de métricas
   - Gestão de voluntários e doações

2. **Voluntário**
   - Descoberta de oportunidades
   - Candidatura a projetos
   - Acompanhamento de participação
   - Compartilhamento de experiências

3. **Doador/Apoiador**
   - Visualização de projetos e impactos
   - Realização de doações online
   - Acompanhamento de recursos
   - Recebimento de relatórios

4. **Visitante**
   - Conhecimento da organização
   - Acesso a informações de contato
   - Visualização de galeria
   - Compartilhamento em redes sociais

### 🎯 Funcionalidades Principais
1. **Área Institucional**
   - Página inicial com missão, visão e valores
   - Histórico e conquistas
   - Equipe e estrutura
   - Relatórios de transparência

2. **Gestão de Projetos**
   - Cadastro detalhado
   - Galeria multimídia
   - Indicadores de impacto
   - Categorização

3. **Engajamento de Voluntários**
   - Portal de oportunidades
   - Sistema de inscrição
   - Área do voluntário
   - Certificados digitais

4. **Captação de Recursos**
   - Campanhas de arrecadação
   - Doações online
   - Metas em tempo real
   - Prestação de contas

5. **Comunicação**
   - Blog de notícias
   - Newsletter
   - Área de imprensa
   - Central de documentos

### Contexto e Relevância
- O terceiro setor brasileiro movimenta mais de R$ 15 bilhões anuais
- Emprega aproximadamente 3 milhões de pessoas
- Existem mais de 820 mil organizações da sociedade civil no país
- Apenas 30% possuem presença digital adequada

## 🎯 Objetivos
### Geral
Desenvolver uma plataforma web completa e profissional para ONGs, integrando todos os conceitos estudados nas quatro unidades da disciplina.

### Específicos
- Aplicar fundamentos de HTML5 na criação de estruturas semânticas
- Implementar leiautes responsivos com CSS3 avançado
- Desenvolver funcionalidades interativas com JavaScript
- Integrar ferramentas de versionamento e acessibilidade
- Simular ambiente de desenvolvimento profissional
- Produzir documentação técnica profissional

## 📝 Status do Projeto

### ✅ Entregas Concluídas

#### Entrega 1 - Estrutura HTML5
- [x] Estrutura HTML5 semântica com 3 páginas
- [x] Hierarquia de títulos lógica e consistente
- [x] Formulário complexo com validação HTML5
- [x] Imagens otimizadas em formato adequado
- [x] Código validado pelo W3C
- [x] Repositório público no GitHub

#### Entrega 2 - CSS3 e Design Responsivo
- [x] Sistema de design consistente
- [x] Layouts responsivos com Grid/Flexbox
- [x] Media queries para diferentes dispositivos
- [x] Animações e transições
- [x] Estilização de formulários
- [x] Paleta de cores e tipografia

#### Entrega 3 - JavaScript e Interatividade
- [x] Sistema SPA (Single Page Application)
- [x] Router para navegação dinâmica
- [x] Sistema de templates
- [x] Validação de formulários
- [x] Máscaras de input
- [x] Componentes interativos

#### Entrega 4 - Acessibilidade e Infraestrutura
- [x] ARIA labels completos
- [x] Contraste WCAG 2.1 AA
- [x] Navegação por teclado
- [x] Otimização de performance
- [x] Build de produção
- [x] Documentação técnica

## 🛠️ Requisitos Técnicos

### Responsividade
- Design mobile-first
- Compatibilidade multiplataforma
- Breakpoints bem definidos
- Imagens e mídias adaptáveis

### Desempenho
- Carregamento < 5 segundos
- Otimização de recursos
- Lazy loading
- Minificação de assets

### Acessibilidade
- WCAG 2.1 nível AA
- Navegação por teclado
- Suporte a leitores de tela
- Contraste adequado

### Segurança
- HTTPS
- Validação de dados
- Proteção contra injeção
- Autenticação segura

### SEO
- Meta tags otimizadas
- Estrutura semântica
- Performance otimizada
- URLs amigáveis

## 🛠️ Tecnologias Utilizadas
- HTML5 Semântico
- CSS3 (Grid/Flexbox)
- JavaScript Moderno
- Git/GitHub
- Otimização de Imagens
- Validação W3C

## 📂 Estrutura do Projeto
```
programa-oWeb/
├── assets/
│   ├── css/
│   │   ├── base/
│   │   │   ├── animations.css
│   │   │   ├── reset.css
│   │   │   ├── themes.css
│   │   │   ├── typography.css
│   │   │   └── variables.css
│   │   ├── components/
│   │   │   ├── navigation.css
│   │   │   └── ui.css
│   │   └── layout/
│   │       ├── grid.css
│   │       └── layout.css
│   ├── js/
│   │   ├── form-validator.js
│   │   ├── main.js
│   │   ├── router.js
│   │   ├── template.js
│   │   └── theme-manager.js
│   └── img/
├── dist/
├── index.html
├── server.js
├── webpack.config.js
├── commitlint.config.js
├── CHANGELOG.md
└── package.json
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- npm (v9+)

### Instalação
1. Clone o repositório
```bash
git clone https://github.com/Juliano30/programa-oWeb.git
cd programa-oWeb
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

4. Para build de produção
```bash
npm run build
```

## 🤝 Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das alterações
4. Faça push para a branch
5. Abra um Pull Request

## ✨ Funcionalidades Atuais
- Navegação entre páginas
- Formulário de cadastro com validação
- Apresentação da ONG e projetos
- Máscara para campos do formulário (CPF, telefone, CEP)

## 📈 Funcionalidades Futuras
- Dashboard administrativo
- Sistema de doações online
- Área do voluntário
- Gestão de projetos
- Sistema de notificações
- Relatórios e métricas

## 👥 Equipe
- Desenvolvedor: [Seu Nome]
- Professor: [Nome do Professor]
- Disciplina: Programação Web

## 📄 Licença
Este projeto está sob a licença MIT.

---
Desenvolvido como parte do curso de Programação Web.