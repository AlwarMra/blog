import { Component } from '@angular/core';
import { ServicioService } from './servicio.service';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]

})
export class AppComponent {


  autores: string[];
  categorias: string[];


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  constructor(private servicioService: ServicioService) {
  }



  ngOnInit() {

    this.getAllAutores();
    this.getAllCategorias();

    this.servicioService.nuevaEntrada$.subscribe(
      valores => {
        this.autores = [];
        this.getAllAutores();
        this.getAllCategorias();
      }
    )


  }

  // Autores para el menu desplegable
  async getAllAutores() {
    this.autores = await this.servicioService.getAutores();
  }
  // Categorias   para el menu desplegable
  async getAllCategorias() {
    this.categorias = await this.servicioService.getCategorias();
  }


  // Captación del evento click autor
  enviarAutorSeleccionado($event) {
    this.servicioService.enviarAutor($event.target.innerText);
  }

  // Captación del evento click categoría
  enviarCategoriaSeleccionada($event) {
    this.servicioService.enviarCategoria($event.target.innerText);
  }


}
