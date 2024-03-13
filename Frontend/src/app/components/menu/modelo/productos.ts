export interface Eventos {
    id?: string;
    fechainicio?: string;
    fechafin?: string;
    numparticinerno?: number;
    numparticexterno?: number;
    tipoevento?: string;
  }
  export interface Articulos {
    id?: string;
    fuente?: string;
  }
  export interface Capitulos {
    id?: string;
    nombrepublicacion?: string;
    isbn?: string;
    fecha?: Date;
    editorial?: string;
  }
  export interface Libros {
    id?: string;
    isbn?: string;
    fecha?: Date;
    editorial?: string;
    luegarpublicacion?: string;
  }
  export interface Software {
    id?: string;
    tiporegistro?: string;
    numero?: string;
    fecha?: Date;
    pais?: string;
  }
  export interface Industrial {
    id?: string;
    fecha?: Date;
    pais?: string;
    insitutofinanciador?: string;
  }
  export interface Reconocimientos {
    id?: string;
    fecha?: Date;
    nombentidadotorgada?: string;
  }
  export interface Licencia {
    id?: string;
    nombre?: string;
  }
  export interface Apropiacion {
    id?: string;
    fechainicio?: Date;
    fechaFin?: Date;
    licencia?: Licencia;
    formato?: string;
    medio?: string;
    nombreEntidad?: string;
  }
  export interface Contrato {
    id?: string;
    nombre?: string;
    numero?: string;
  }
  export interface Consultoria {
    id?: string;
    año?: Date;
    contrato?: Contrato;
    nombreEntidad?: string;
  }
  export interface Contenido {
    id?: string;
    paginaWeb?: string;
    nombreEntidad?: string;
  }
  export interface PregFinalizadoyCurso {
    id?: string;
    fechaInicio?: Date;
    reconocimientos?: string;
    numeroPaginas?: number;
  }
  export interface Maestria {
    id?: string;
    fechaInicio?: Date;
    institucion?: string;
  }
  export interface ListaProducto {
    id?: string;
    articulo?: Articulos;
    capitulo?: Capitulos;
    software?: Software;
    libro?: Libros;
    prototipoIndustrial?: Industrial
    evento?: Eventos;
    reconocimiento?: Reconocimientos;
    consultoria?: Consultoria;
    contenido?: Contenido;
    pregFinalizadoyCurso?: PregFinalizadoyCurso;
    apropiacion?: Apropiacion;
    maestria?: Maestria;
    proyectoCursoProducto?: string;
    proyectoFormuladoProducto?: string;
    proyectoRSUProducto?: string;
  }


  export interface Producto {
    id?: string;
    tituloProducto?: string;
    investigador ?: string;
    listaProducto ?: ListaProducto;
    tipologiaProducto?: string;
    publicacion?: string;
    estudiantes?:String;
    estadoProdIniSemestre?: string;
    porcentanjeAvanFinSemestre?: number;
    observaciones?: string;
    estadoProducto?: string;
    porcentajeComSemestral?: number;
    porcentajeRealMensual?: number;
    fecha?: Date;
    origen?: string;
    Soporte?: File;
  }
