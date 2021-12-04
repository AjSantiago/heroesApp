import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent {
  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel',
  };

  nuevo: boolean = false;
  id: string = '';
  name: string = '';

  constructor(
    private _heroeService: HeroesService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros['id'];
      console.log('idx', this.id);
      if (this.id !== 'nuevo') {
        this._heroeService
          .getHeroe(this.id)
          .subscribe((heroe) => (this.heroe = heroe));
      }
    });
  }

  guardar() {
    if (this.id === 'nuevo') {
      //Insertando
      this._heroeService.nuevoHeroe(this.heroe).subscribe(
        (data) => {
          this._router.navigate(['/heroe', data]);
        },
        (error) => console.error(error)
      );
    } else {
      //Actualizando
      this._heroeService.actualizarHeroe(this.heroe, this.id).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.error(error)
      );
    }
  }

  agregarNuevo(forma: NgForm) {
    this._router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel',
    });
  }
}
