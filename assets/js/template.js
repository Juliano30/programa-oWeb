export class Template {
    static render(templateId, data = {}) {
        const template = document.getElementById(templateId);
        if (!template) {
            console.error(`Template não encontrado: ${templateId}`);
            return '';
        }

        let html = template.innerHTML;
        
        // Substitui variáveis
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            html = html.replace(regex, data[key]);
        });

        // Remove comentários
        html = html.replace(/<!--[\s\S]*?-->/g, '');

        return html;
    }

    static renderComponent(name, props = {}) {
        return Template.render(`template-${name}`, props);
    }
}

// Sistema de componentes
export class Component {
    constructor(element) {
        this.element = element;
        this.props = this.getProps();
        this.render();
    }

    getProps() {
        const props = {};
        Array.from(this.element.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
                const propName = attr.name.slice(5);
                props[propName] = attr.value;
            }
        });
        return props;
    }

    render() {
        const componentName = this.element.dataset.component;
        if (!componentName) {
            console.error('Component name not specified');
            return;
        }

        this.element.innerHTML = Template.renderComponent(componentName, this.props);
    }
}