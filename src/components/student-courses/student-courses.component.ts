import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,RouterModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent implements OnInit {
navToCourse(id:number) {
this.router.navigate([this.router.url,id])}
  studentId: number = -1
  token: string = '';
  courses: any[] = [];



  constructor(

    private courseService: CoursesService,private router:Router
  ) { }
  ngOnInit() {
    this.studentId=Number(sessionStorage.getItem('userId'))
    this.token=sessionStorage.getItem('myToken')!
    this.loadCourses()
  }

  loadCourses() {
    this.courseService.getCoursesByStudentId(this.studentId)
    .subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
     this.courses=response
      },
      error: (error) => {
        console.error('Error adding course', error);
      }
    });
   
  }
}
