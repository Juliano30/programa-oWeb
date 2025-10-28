// Event bus para comunicação entre componentes
export class EventBus {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
        
        // Retorna uma função para remover o listener
        return () => {
            const callbacks = this.events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) callbacks.splice(index, 1);
        };
    }

    emit(event, data) {
        if (!this.events.has(event)) return;
        this.events.get(event).forEach(callback => callback(data));
    }

    clear(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}