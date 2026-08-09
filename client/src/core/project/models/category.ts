export class Category {
    public readonly id: number;
    public readonly name: string;

    constructor(data: { id: number; name: string }) {
        this.id = data.id;
        this.name = data.name;
    }
}
