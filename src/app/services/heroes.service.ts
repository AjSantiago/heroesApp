import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroesURL: string =
    'https://heroesapp-de1b9-default-rtdb.firebaseio.com/heroes.json';
  heroeURL: string =
    'https://heroesapp-de1b9-default-rtdb.firebaseio.com/heroes/';
  respuesta: string = '';

  constructor(private http: HttpClient) {}

  nuevoHeroe(heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.heroesURL, body, { headers }).pipe(
      map((res) => {
        console.log('Insertando');
        console.log(res);
        //this.respuesta = JSON.stringify(res);
        this.respuesta = JSON.stringify(res).slice(9, -2);
        console.log('resp ', this.respuesta);
        return this.respuesta;
      })
    );
  }

  actualizarHeroe(heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let url = `${this.heroeURL}/${key$}.json`;

    return this.http.put(url, body, { headers }).pipe(
      map((res) => {
        console.log('Actualizando');
        console.log(res);
        return res;
      })
    );
  }

  getHeroe(key$: string) {
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.get(url).pipe(
      map((res) => {
        console.log('Obteniendo', res);
        this.respuesta = JSON.stringify(res);
        console.log('respuesta', this.respuesta);
        return JSON.parse(this.respuesta);
      })
    );
  }

  getHeroes() {
    return this.http.get(this.heroesURL).pipe(
      map((res) => {
        console.log('Obteniendo todos');
        this.respuesta = JSON.stringify(res);
        return JSON.parse(this.respuesta);
      })
    );
  }

  borrarHeroe(key$: string) {
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url).pipe(
      map((res) => {
        console.log('Eliminando');
        // this.respuesta = JSON.stringify(res);
        // return JSON.parse(this.respuesta);
        return res;
      })
    );
  }
}
