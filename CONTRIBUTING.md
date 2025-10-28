# Guia de Contribuição

## Fluxo de Trabalho (GitFlow)

1. **main**: Branch principal
   - Contém código em produção
   - Protegida contra commits diretos
   - Somente merges via pull requests

2. **develop**: Branch de desenvolvimento
   - Base para novas features
   - Código em desenvolvimento
   - Teste de integração

3. **feature/***
   - Para novas funcionalidades
   - Criada a partir de develop
   - Merge de volta para develop

4. **hotfix/***
   - Para correções urgentes
   - Criada a partir de main
   - Merge para main e develop

5. **release/***
   - Preparação para release
   - Criada a partir de develop
   - Merge para main e develop

## Commits Semânticos

Use os seguintes prefixos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto e vírgula, etc.
- `refactor`: Refatoração de código
- `test`: Adição/modificação de testes
- `chore`: Atualização de tarefas

Exemplo:
```
feat: adiciona validação de CPF
fix: corrige layout em telas pequenas
docs: atualiza README
```

## Processo de Contribuição

1. Fork o projeto
2. Clone seu fork
3. Crie uma branch feature/
4. Faça suas alterações
5. Commit usando commits semânticos
6. Push para seu fork
7. Crie um Pull Request

## Pull Requests

- Descreva claramente as mudanças
- Referencie issues relacionadas
- Inclua screenshots se relevante
- Verifique os testes
- Aguarde review

## Padrões de Código

- Use ESLint
- Siga o style guide
- Documente funções complexas
- Teste seu código

## Testes

- Execute `npm test`
- Mantenha cobertura > 80%
- Teste casos de erro
- Teste acessibilidade

## Versionamento

Seguimos [SemVer](https://semver.org/):

- MAJOR: Mudanças incompatíveis
- MINOR: Novas funcionalidades
- PATCH: Correções de bugs

## Acessibilidade

- Siga WCAG 2.1
- Use landmarks
- Forneça textos alternativos
- Teste com leitores de tela

## Performance

- Otimize imagens
- Minifique assets
- Use lazy loading
- Monitore métricas

## Dúvidas?

Abra uma issue ou contate a equipe.