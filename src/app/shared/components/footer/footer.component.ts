import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  lang: string = localStorage.getItem('lang') !== null ? localStorage.getItem('lang')! : 'en';


}
