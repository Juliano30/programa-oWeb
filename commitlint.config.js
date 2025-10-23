module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            'feat',    // Nova funcionalidade
            'fix',     // Correção de bug
            'docs',    // Documentação
            'style',   // Alterações de estilo
            'refactor',// Refatoração de código
            'perf',    // Melhorias de performance
            'test',    // Testes
            'chore',   // Tarefas de build, etc
            'ci',      // Configuração de CI
            'revert'   // Reverter commits
        ]]
    }
};