import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../app/services/courses.service';
import { Course } from '../../app/models/course';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit{
open=false
course!: Course ;
token=''
constructor(private courseService:CoursesService,private route:ActivatedRoute,private router:Router ) {
}
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id')
    this.token=sessionStorage.getItem('myToken')!
    if(courseId)
    {
     
      this.loadCourse(courseId)
    }
    
  }

  loadCourse(id: string) {
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
        this.myForm.setValue({
          title: this.course.title,
          description: this.course.description,
          teacherId: this.course.teacherId
        });
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }
  updateCourse() {
    const courseData=this.myForm.getRawValue()
    this.courseService.updateCourse(String(this.course.id), courseData, this.token)
    .subscribe({
      next: (data) => {
        this.myForm.reset()
      this.loadCourse(String(this.course.id))
      },
      error: (err) => {
       
        console.error('Error fetching course:', err);
      }
    });
    this.open=false
  }

      myForm = new FormGroup({
        title: new FormControl(""),
        description: new FormControl(""),
        teacherId:new FormControl(0)
      });
  
      deleteCourse(){
        this.courseService.deleteCourse(this.course.id,sessionStorage.getItem('myToken')!).subscribe({
          next: (response) => {
            console.log('Course deleted successfully:', response);
            this.router.navigate(['/teachCourses'])
          },
          error: (error) => {
            console.error('Error deleting course', error);
          }
        });
      }
      openForm(){
        this.open=true;
      }

}
