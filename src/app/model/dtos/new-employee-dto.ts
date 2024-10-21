export class NewEmployeeDto {
    constructor(
        public cpf: string,
        public name: string,
        public email: string,
        public phone: string,
        public birthday: Date,
        public password: string,
    ){}
}