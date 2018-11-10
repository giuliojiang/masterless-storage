export class Logger {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    info(msg: string): void {
        console.info(`${this.name}: ${msg}`);
    }

    error(msg: string): void {
        console.error(`${this.name}: ${msg}`);
    }
}