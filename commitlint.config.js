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
            'revert',  // Reverter commits
            'a11y',    // Melhorias de acessibilidade
            'build'    // Alterações no sistema de build
        ]],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'subject-case': [2, 'always', ['lower-case']],
        'body-leading-blank': [2, 'always']
    }
};