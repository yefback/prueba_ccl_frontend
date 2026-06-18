import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface MovimientoRequest {
  productoId: number;
  tipoMovimiento: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  // URL usando HTTP para evitar bloqueos del navegador por certificados SSL no confiables
  private apiUrl = 'http://localhost:5200/api/productos';

  getInventario(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/inventario`);
  }

  registrarMovimiento(movimiento: MovimientoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/movimiento`, movimiento);
  }
}
