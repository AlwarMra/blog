import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {


  formulario: FormGroup;

  constructor(private servicioService: ServicioService, private router: Router) {
    this.formulario = new FormGroup({
      'titulo': new FormControl(''),
      'autor': new FormControl(''),
      'fecha': new FormControl((new Date()).toISOString().substring(0, 10), [Validators.required]),
      'texto': new FormControl('', [Validators.required]),
      'categoria': new FormControl(''),
      'imagen': new FormControl('')
    });

  }

  ngOnInit(): void {

  }


  async onSubmit() {
    let newPost: Post = new Post();
    newPost = this.formulario.value;
    if (this.formulario.value.autor === '') { this.formulario.value.autor = 'Anónimo' };
    if (this.formulario.value.categoria === '') { this.formulario.value.categoria = ['Sin categoría'] };
    console.log(newPost);


    await this.servicioService.enviarEntrada(newPost);
    this.router.navigate(['blog']);
  }

}
