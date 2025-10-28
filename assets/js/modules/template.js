export class Template {
    static render(templateId, data = {}) {
        const template = document.getElementById(templateId);
        if (!template) {
            console.error(`Template ${templateId} não encontrado`);
            return '';
        }

        let content = template.innerHTML;

        // Substituir variáveis no template
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            content = content.replace(regex, data[key]);
        });

        return content;
    }

    static compile(templateString, data = {}) {
        // Substituir variáveis no template string
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            templateString = templateString.replace(regex, data[key]);
        });

        return templateString;
    }
}