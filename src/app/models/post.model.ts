// 

export class Post {

    titulo: string;
    texto: string;
    autor: string;
    imagen: string;
    fecha: string;
    categoria: string[];

    constructor(pTitulo: string = '', pTexto: string = '', pAutor: string = 'Anónimo', pImagen: string = '', pFecha: string = '', pCategoria: string[] = ['Sin categoría']) {

        this.titulo = pTitulo;
        this.texto = pTexto;
        this.autor = pAutor;
        this.imagen = pImagen;
        this.fecha = pFecha;
        this.categoria = pCategoria;
    }

}