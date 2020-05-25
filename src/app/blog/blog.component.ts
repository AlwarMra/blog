import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Post } from '../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [DatePipe]
})
export class BlogComponent implements OnInit {


  arrPosts: Post[];

  constructor(private servicioService: ServicioService) {
  }

  ngOnInit(): void {

    this.todosFecha();

    // Recogemos el click del parent desde servicio para filtrar autores
    this.servicioService.autorSeleccionado$.subscribe(
      pAutor => {
        pAutor === 'Todos' ? this.todosFecha() : this.autor(pAutor);
      });

    // Recogemos el click del parent desde servicio para filtrar categorias
    this.servicioService.categoriaSeleccionada$.subscribe(
      pCategoria => {
        pCategoria != 'Todas' ? this.categoria(pCategoria) : this.todosFecha();
      });

    // Recogemos el submit de new.component
    this.servicioService.nuevaEntrada$.subscribe(
      posts => {
        this.todosFecha();
      }
    )
  }

  async todosFecha() {
    this.arrPosts = await this.servicioService.ordenarFecha();
  }

  // Seleccionar todos los posts por autor
  async autor(pAutor) {
    this.arrPosts = await this.servicioService.getPostByAutor(pAutor);
  }
  onClickAutor($event) {
    this.autor($event.target.innerText);
  }

  // Seleccionar todos los posts por categoría

  async categoria(pCategoria) {
    this.arrPosts = await this.servicioService.getPostbyCategoria(pCategoria)
  }
  onClickCategoria($event) {
    this.categoria($event.target.innerText);
  }





}
