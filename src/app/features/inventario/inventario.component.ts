import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InventarioService, Producto } from '../../core/services/inventario.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  productos: Producto[] = [];
  loadingProductos = true;
  loadingForm = false;
  errorForm = '';
  successForm = '';

  movimientoForm: FormGroup = this.fb.group({
    productoId: ['', [Validators.required]],
    tipoMovimiento: ['Entrada', [Validators.required]],
    cantidad: ['', [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario() {
    this.loadingProductos = true;
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.productos = data;
        this.loadingProductos = false;
      },
      error: (err) => {
        console.error('Error cargando inventario', err);
        // Descomentar para mock de diseño si la API no está corriendo
        // this.productos = [
        //   { id: 1, nombre: 'Laptop Dell XPS 15', cantidad: 12 },
        //   { id: 2, nombre: 'Teclado Mecánico Keychron', cantidad: 5 },
        //   { id: 3, nombre: 'Monitor LG Ultrawide', cantidad: 0 }
        // ];
        this.loadingProductos = false;
      }
    });
  }

  onSubmitMovimiento() {
    if (this.movimientoForm.invalid) {
      this.movimientoForm.markAllAsTouched();
      return;
    }

    this.loadingForm = true;
    this.errorForm = '';
    this.successForm = '';

    const values = this.movimientoForm.value;
    values.productoId = Number(values.productoId);
    values.cantidad = Number(values.cantidad);

    this.inventarioService.registrarMovimiento(values).subscribe({
      next: () => {
        this.successForm = 'Movimiento registrado exitosamente.';
        this.loadingForm = false;
        this.movimientoForm.patchValue({ cantidad: '' });
        this.movimientoForm.markAsUntouched();
        this.cargarInventario();
        
        setTimeout(() => this.successForm = '', 4000);
      },
      error: (err) => {
        this.errorForm = err.error?.message || 'Error al registrar el movimiento.';
        this.loadingForm = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
