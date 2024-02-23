import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-invesigadores',
  templateUrl: './invesigadores.component.html',
  styleUrls: ['./invesigadores.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,RouterModule],
})

export class InvesigadoresComponent {

}
