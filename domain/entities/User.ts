import { IsString, IsNotEmpty, Length, IsEmail, IsOptional } from "class-validator";

export class User {
    @IsString()
    @IsNotEmpty()
    public id: string;
    @IsString()
    @IsOptional()
    public name?: string;
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    public password: string;
  
    constructor(id: string, email: string, password: string) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  }
  