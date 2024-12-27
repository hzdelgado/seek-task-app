import { IsNotEmpty, IsString, Length } from "class-validator";

export enum TaskStatus {
    TODO = "toDo",
    INPROGRESS = "inProgress",
    DONE = "done",
}

export class Task {
  @IsString()
  @IsNotEmpty()
  protected id: string;
  @IsString()
  @IsNotEmpty()
  protected title: string;
  @IsString()
  @Length(6, 20)
  protected description: string;
  protected status: TaskStatus = TaskStatus.TODO;

  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  setDescription(description: string): void {
    if(!description) {
      throw Error('La descripción no puede estar vacía');
    }

    if(description.length) {
      let moths = description.split(' ').length;
      if(moths < 3) {
        throw Error('La descripción debe tener como mínimo 3 palabras');
      }
    }
    this.description = description;
  }
  
  getStatus() {
    return this.status;
  }

  changeStatus(newStatus: TaskStatus): void {
    if (this.status === TaskStatus.DONE) {
      throw new Error("No se puede cambiar el estado de una tarea completada");
    }
    this.status = newStatus;
  }
}
