export class Task {
    constructor(public createdAt:string | number, public state: boolean, public title: string, public id?:string) {
    }
}