import {
  Component,
  OnInit
} from '@angular/core';
import {
  PeopleServiceService
} from './people-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SWATJ';
  currentIndex = 1;
  totalCharacters = 0;
  currentCharacter: any = null;
  isLoading: boolean = false;
  pictureUrl = "";
  pictureGender = "";

  constructor(private peopleService: PeopleServiceService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.peopleService.getPeople().subscribe((result: any) => {
      this.totalCharacters = result.count;
    });

    this.peopleService.getNextPerson(this.currentIndex).subscribe((result) => {
      this.currentCharacter = result;
      this.isLoading = false;
      this.peopleService.getPicture(this.currentCharacter.gender).subscribe((result) => {
        this.pictureUrl = result;
      })
    });


  }

  clickedButton() {
    if (this.currentIndex == this.totalCharacters) {
      this.currentIndex = 1;
    } else {
      this.currentIndex++;
    }
    this.isLoading = true;
    this.peopleService.getNextPerson(this.currentIndex).subscribe((result) => {
      this.currentCharacter = result;
      this.isLoading = false;

      if (this.currentCharacter.gender == "male") {
        this.pictureGender = "male";
      } else if (this.currentCharacter.gender == "female") {
        this.pictureGender = "female";
      } else {
        this.pictureGender = "male";
      };

      this.peopleService.getPicture(this.pictureGender).subscribe((result) => {
        this.pictureUrl = result;
      });
    });
  }
}
