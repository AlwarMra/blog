import { Injectable } from '@angular/core';
import { Post } from './models/post.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  posts: Post[];

  // Interacción del app.component con el servicio para mandar info clicks autor y categoría
  private autorSeleccionadoSource = new Subject<string>();
  autorSeleccionado$ = this.autorSeleccionadoSource.asObservable();

  private categoriaSeleccionadaSource = new Subject<string>();
  categoriaSeleccionada$ = this.categoriaSeleccionadaSource.asObservable();


  // Interacción del new.component con el servicio para mandar nuevo post
  private nuevaEntradaSource = new Subject<Post[]>();
  nuevaEntrada$ = this.nuevaEntradaSource.asObservable();


  constructor() {
    this.posts = [
      new Post('El brazo ejecutor de Dios', 'Hay una figura maldita del mundo\ncon el rostro ensombrecido en justicia,\nsiembra el llano su carácter de niño\nlos actos difusos de la divina\n\nprovidencia. Asesinó a su hermano,\nauspició las masacres de un déspota,\nvenerado, fue confesor de santos,\nfue, de los desamparados, mecenas.\n\nBien sea el espectador resignado\nde la obra que escribe y no comprende,\ny su designio, yerro irresoluble,\n\n¿Qué importa él que sus obras le repugnen?\nEl favor no es dado, mas a él se debe\nla insoportable virtud de su paso.', 'María Abismo', '', '2020-01-30', ['Poesía', 'Soneto']),

      new Post('Como el agua en el agua', 'Somos el agua del viento,\nel devenir de las olas,\nel escindido recuerdo\ndel río de la memoria.\nlos cántaros desmayados\npor la piedra se derraman\npersistentes y ahogados\nen la fonda del mañana.\n\nSomos la noche en el vaho,\nteas en nieblas de aurora\nuna jofaina de barro\nen la que limpiar la copa,\nla libación de un seno\nen la clepsidra de arena,\nde espaldas fuma en el cerro\nla mujer que nos espera.\n\nNo somos ni crin del río,\nno hay humo que el cuerpo lave,\nProteo desvanecido\ndel incienso en el aire.\nAunque ya sea la calma\naun queda sobre mi frente\nla disipada fragancia\ndel sándalo y del aceite.', 'Miguel de Satrús', '', '2020-02-03', ['Campestre']),

      new Post('', 'Nunca el retorno,\niluso rey danés,\nsino el olvido.', 'Jazh Al-Jarzmún', 'https://upload.wikimedia.org/wikipedia/en/5/5e/1_krone_coin.jpg', '2020-02-07', ['Haiku']),

      new Post('El envés de las hojas', 'El envés de las hojas\nlas caras de las palmas\nlos nudos de los árboles\nlos montes de unas manos\nfragancias de las hebras\nparduscas del tabaco\ntejados en arbustos\nde emparedadas casas\nel barro en los zapatos\narrabal en el cuero\nbriznas de bergamota\ny un té al mediodía\n\nSubamos a los cerros\nsaludemos las cosas\nfrágiles como el mundo.', 'María Abismo', '', '2020-02-10', ['Poesía', 'Campestre']),

      new Post('Cuartetos', 'I\nSi por la arena un baúl se perdiera,\nextraviaremos la llave que encierra\nel acertijo que esconden los médanos\ny el sentido a la vida y la espera.\n\nII\nLa noche tiñe en mar la vaga duna\nincierta, se hila en jaimas letras y pluma\nde fuga oculta, ¿Dónde esconde Dios\nel agua clara que la arena busca?\n\nIII\nEl nómada no cree en el espacio,\nel águila perdida por el llano\nresponde al reclamo de otro cetrero\nen el mismo lar del tiempo pasado.\n\nIV\nSin fin o límite por la llanura\njaleo vueltas al mundo por rutas\nque inunden y derramen este tránsito\npor senderos de la más tenue bruma.', 'Jazh Al-Jarzmún', 'https://capturelandscapes.com/wp-content/uploads/2019/04/4-Desert-Nights.jpg', '2020-02-15', ['Poesía', 'Campestre', 'Cuartetos'])
    ]
  }
  // Envío de información hacía children blog.component desde app.component
  enviarAutor(pAutor: string) {
    this.autorSeleccionadoSource.next(pAutor);
  }
  enviarCategoria(pCategoria: string) {
    this.categoriaSeleccionadaSource.next(pCategoria);
  }

  // onSubmit de new.component, añadimos y actualizamos variables
  enviarEntrada(pEntrada: Post) {
    this.addPost(pEntrada);
    this.nuevaEntradaSource.next();
  }


  getAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.posts);
    })
  }

  ordenarFecha(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.posts.sort(function (a, b) {
        return <any>new Date(b.fecha) - <any>new Date(a.fecha);
      }))
    })
  }

  addPost(pValores: Post): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.posts.push(pValores);
      resolve(this.posts);
    })
  }

  getPostByAutor(pAutor): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.posts.filter(post => { return post.autor === pAutor }));
    })
  }


  getPostbyCategoria(pCategoria): Promise<Post[]> {
    return new Promise((resolve, reject) => {

      const arrCat = [];

      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].categoria.includes(pCategoria)) {
          arrCat.push(this.posts[i])
        }
      }
      resolve(arrCat);

    })
  }

  // Recoger y ordenar todos los autores
  getAutores(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const autores = [];
      for (let i = 0; i < this.posts.length; i++) {
        autores.push(this.posts[i].autor);
      }
      resolve(Array.from(new Set(autores)).sort());

    })
  }

  // Recoger y ordenar todas las categorías de los posts
  getCategorias(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const categorias = [];
      for (let i = 0; i < this.posts.length; i++) {
        for (let j = 0; j < this.posts[i].categoria.length; j++) {
          categorias.push(this.posts[i].categoria[j]);
        }
      }
      resolve(Array.from(new Set(categorias)).sort());

    })
  }








}





