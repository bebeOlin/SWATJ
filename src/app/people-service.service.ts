import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Character } from './character.model';
import { Picture } from './picture.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http:HttpClient) { }

  getPeople() {
   return this.http.get("https://swapi.dev/api/people");
  }

  getNextPerson(index:number) {
    return this.http.get<Character>(`https://swapi.dev/api/people/${index}`);
  }

  getPicture(gender:string) {
    return this.http.get(`https://randomuser.me/api/?gender=${gender}`)
    .pipe(
      map((result:any) => {
        return result.results;
      }),
      map((results:any) => {
        return results[0].picture.large;
      })
    );
  }
}
