import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../app/services/courses.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule,MatCardModule,MatButtonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
navToLessons() {
  this.router.navigate(['lessons'], { relativeTo: this.route })
}
  course: any;

  constructor(private router:Router,private route: ActivatedRoute, private coursesService: CoursesService) {}
courseId=""
myCourses:any[]=[]
token=''
userId=-1
open=false
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId')
    this.token=sessionStorage.getItem('myToken')!
    this.userId=Number(sessionStorage.getItem('userId'))
    if (courseId) {
      this.loadCourse(courseId);
      this.courseId=courseId
      this.getCourses()
    }
    

  }

  loadCourse(id: string) {
    this.coursesService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }
  getCourses(){
    this.coursesService.getCoursesByStudentId(this.userId)
    .subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
     this.myCourses=response
      },
      error: (error) => {
        console.error('Error adding course', error);
      }
    });
  }
  enrollStudent() {
    this.coursesService.enrollStudent(Number(this.courseId), this.userId)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.getCourses()
alert("נרשמת בהצלחה!")
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }
  unEnrollStudent() {
    this.coursesService.unenrollFromCourse(Number(this.courseId), this.userId)
        .subscribe({
      next: (data) => {
        console.log(data);
        
      this.getCourses()
      alert("!עזבת בהצלחה")
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }
  check()
  {
    for (let i = 0; i < this.myCourses.length; i++) {
      if(this.myCourses[i].id===this.course.id)
        return true
      
    }
    return false
  }
  navigate(){
    this.router.navigate(['../'], { relativeTo: this.route });  }
  }

