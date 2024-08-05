import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectoyproductoService } from '../../../services/proyectoyproducto';
import { PlanTableData,MostrarPlan } from '../../../modelo/planDeTrabajo';
@Component({
  selector: 'app-dialogo-informacion-plan-trabajo',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './dialogo-informacion-plan-trabajo.component.html',
  styleUrls: ['./dialogo-informacion-plan-trabajo.component.css']
})
export class DialogoInformacionPlanTrabajoComponent implements AfterViewInit {
  
  displayedColumns: string[] = [
    'name', 'weight', 'symbol', 'estricto', 'codigo', 'tituloProyecto',
    'tipoProducto', 'rol', 'tituloProducto', 'categoria', 'quartil', 'estado', 'avance'
  ];
  dataSource: MatTableDataSource<PlanTableData> = new MatTableDataSource<PlanTableData>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private planTrabajoService: ProyectoyproductoService) {}

  ngOnInit() {
    this.planTrabajoService.getPlanTrabajo().subscribe((data: MostrarPlan[]) => {
      // Flatten the array of MostrarPlan and transform each planTrabajo
      const transformedData = data.flatMap(plan => this.transformData(plan));
      this.dataSource.data = transformedData;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  transformData(plan: MostrarPlan): PlanTableData[] {
    return plan.planTrabajo.map(pt => ({
      name: pt.investigador.Grupoinvestigacion.nombre,
      weight: `${pt.investigador.nombre} ${pt.investigador.apellidos}`,
      symbol: pt.investigador.horas_formacion,
      estricto: pt.horasestricto,
      codigo: pt.proyecto.codigo,
      tituloProyecto: pt.proyecto.titulo,
      tipoProducto: pt.proyecto.productos_asociados.titulo_producto,
      rol: pt.rol,
      tituloProducto: pt.proyecto.productos_asociados.titulo_producto,
      categoria: pt.proyecto.productos_asociados.minciencias.categoria,
      quartil: pt.proyecto.productos_asociados.quartil.cuartil,
      estado: pt.proyecto.productos_asociados.estado_inicio_semestre,
      avance: pt.proyecto.porcentaje_final_semestre
    }));
  }
}