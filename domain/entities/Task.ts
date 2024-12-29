import { IsNotEmpty, IsString, Length } from "class-validator";

// Enum que define los posibles estados de una tarea.
export enum TaskStatus {
    TODO = "toDo",
    INPROGRESS = "inProgress",
    DONE = "done",
}
// Clase que representa una tarea en el sistema.
export class Task {
  // ID único de la tarea, debe ser una cadena no vacía.
  @IsString()
  @IsNotEmpty()
  public id: string;
  // Título de la tarea, debe ser una cadena no vacía.
  @IsString()
  @IsNotEmpty()
  public title: string;
  // Descripción de la tarea, debe ser una cadena con entre 6 y 20 caracteres.
  @IsString()
  @Length(6, 20)
  public description: string;
  // Estado de la tarea, por defecto es "POR HACER".
  public status: TaskStatus = TaskStatus.TODO;

  // Constructor que inicializa los valores de la tarea.
  // @param id - Identificador único de la tarea.
  // @param title - Título de la tarea.
  // @param description - Descripción de la tarea.
  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  // Método que retorna la tarea como un objeto JSON.
  // @returns Un objeto JSON con los datos de la tarea.
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
    };
  }

  // Método que obtiene la descripción de la tarea.
  // @returns La descripción de la tarea o undefined si no está definida.
  getDescription(): string | undefined {
    return this.description;
  }

  // Método que establece la descripción de la tarea.
  // Lanza un error si la descripción es vacía o si tiene menos de 3 palabras.
  // @param description - Nueva descripción de la tarea.
  // @throws Error Si la descripción no es válida.
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

  // Método que obtiene una representación legible del estado de la tarea.
  // @returns El estado de la tarea como una cadena legible (por ejemplo, "POR HACER").
  getStatus() {
    switch(this.status) {
      case TaskStatus.TODO:
        return 'POR HACER';
      case TaskStatus.INPROGRESS:
        return 'EN PROGRESO';
      case TaskStatus.DONE:
        return 'HECHO';
    }
  }

  // Método para cambiar el estado de la tarea.
  // No permite cambiar el estado si la tarea ya está completada (estado 'HECHO').
  // @param newStatus - El nuevo estado que se desea asignar a la tarea.
  // @throws Error Si la tarea ya está completada, no se permite cambiar el estado.
  changeStatus(newStatus: TaskStatus): void {
    if (this.status === TaskStatus.DONE) {
      throw new Error("No se puede cambiar el estado de una tarea completada");
    }
    this.status = newStatus;
  }
}
