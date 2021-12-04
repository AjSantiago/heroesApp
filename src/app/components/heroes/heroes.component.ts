import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent {
  heroes: any[] = [];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes().subscribe((data) => {
      this.heroes = data;
      this.loading = false;
      // setTimeout(() => {
      //   this.heroes = data;
      //   this.loading = false;
      // }, 2000);
    });
  }

  borrarHeroe(key$: any) {
    this._heroesService.borrarHeroe(key$).subscribe((data) => {
      if (data) {
        console.error(data);
      } else {
        delete this.heroes[key$]; //Eliminar algo de un objeto
      }
    });
  }
}
