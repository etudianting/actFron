export class User{
    constructor(
        public login:string,
        public password:string,
        public repassword:string,
        public email:string,
        public name: string,
        public lastName: string,
        public telephone:string,
        public roleName:string,
        public id?:number,
        
        public token?:string
    ){}
}