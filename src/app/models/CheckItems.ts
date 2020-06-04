export class CheckItems{
    public _id: object
    public name: String
    public amount: Number
    public complete: Boolean = false
    public inputAmount: Number = 0

    constructor(name: String, qty: Number){
        this._id = {};
        this.name = name;
        this.amount = qty
    }
}