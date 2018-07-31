import { Role } from './Role';

export class User {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  role: Role;
  students: any;
  class: any;
  subjects: any;
}

// export class User {
//     private _id: number;
//     private _name: string;
//     private _username: string;
//     private _lastname: string;
//     private _email: string;
//     private _role: string;

//     public get id(): number {
//         return this._id;
//     }

//     public set id(id: number) {
//         this._id = id;
//     }

//     public get name(): string {
//         return this._name;
//     }

//     public set name(name: string) {
//         this._name = name;
//     }

//     public get username(): string {
//         return this._username;
//     }

//     public set username(username: string) {
//         this._username = username;
//     }

//     public get lastname(): string {
//         return this._lastname;
//     }

//     public set lastname(lastname: string) {
//         this._lastname = lastname;
//     }

//     public get email(): string {
//         return this._email;
//     }

//     public set email(email: string) {
//         this._email = email;
//     }

//     public get role(): string {
//         return this._role;
//     }

//     public set role(role: string) {
//         this._role = role;
//     }
// }
