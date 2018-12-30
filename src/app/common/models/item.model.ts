export class Item {

    Id?: string;
    Name: string;
    Description?:string;
    Amount?: number;
    Date?: Date | string;
    IsPrivate?: boolean;

    constructor (Name: string, Description?:string, Amount?: number, Date?: Date, IsPrivate?: boolean, Id?: string){
        this.Id = Id;
        this.Name = Name;
        this.Description = Description;
        this.Amount = Amount;
        this.Date = Date; //??
        this.IsPrivate = IsPrivate;
    }
}