import { Component } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [MatCardModule,RouterModule,MatButtonModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {
  courses: any[] = [];
  token=""
  role=""
  userId=-1
  constructor(private coursesService: CoursesService,private router:Router) {}
  
  ngOnInit() {
    this.loadCourses();
    this.token=sessionStorage.getItem('myToken')!
    this.role=sessionStorage.getItem('role')!
    this.userId=Number(sessionStorage.getItem('userId'))
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }
  navigate(){
    this.router.navigate(["myCourses"])
  }
  

}
