import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { RouterModule } from '@angular/router';
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
  studentId: number = -1
  token: string = '';
  courses: any[] = [];


  constructor(

    private courseService: CoursesService
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
