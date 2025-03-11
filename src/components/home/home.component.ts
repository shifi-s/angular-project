import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router) {
   
    
  }
  login=()=>{
this.router.navigate(['/login'])

  }

  signIn=()=>{
    this.router.navigate(['/signIn'])
    
      }
}
