export interface PlanTrabajo{
    horasestricto?: number,
    rol: string,
    investigador?: string,
    proyecto?: string,
    producto: string
}

export interface ConfiguracionPlanTrabajo{
    fecha?: string | Date;
    estado?: string,
    titulo?: string,
}


//mostrar plan de trabajo
export interface GrupoInvestigacion {
    codigo: string;
    nombre: string;
}

export interface Investigador {
    nombre: string;
    apellidos: string;
    horas_formacion: number;
    Grupoinvestigacion: GrupoInvestigacion;
}

export interface Minciencias {
    id: number;
    categoria: string;
}

export interface Quartil {
    id: number;
    cuartil: string;
}

export interface ProductoAsociado {
    titulo_producto: string;
    minciencias: Minciencias;
    quartil: Quartil;
    estado_inicio_semestre: string;
}

export interface Proyecto {
    codigo: string;
    titulo: string;
    porcentaje_final_semestre: number;
    productos_asociados: ProductoAsociado;
}

export interface PlanDeTrabajo {
    horasestricto: number;
    rol: string;
    investigador: Investigador;
    proyecto: Proyecto;
}

export interface MostrarPlan {
    id: string;
    planTrabajo: PlanDeTrabajo[];
    fecha: string;
    estado: boolean;
    titulo: string;
}

export interface PlanTableData {
    name: string;
    weight: string;
    symbol: number;
    estricto: number;
    codigo: string;
    tituloProyecto: string;
    tipoProducto: string;
    rol: string;
    tituloProducto: string;
    categoria: string;
    quartil: string;
    estado: string;
    avance: number;
  }
  