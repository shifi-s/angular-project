import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../app/models/course';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,RouterModule,ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  editId=-1
  courses: any[] = []
  course:any
  open:boolean=false
  role=""
  userId=-1
  constructor(private coursesService: CoursesService) {}
  
  ngOnInit() {
    this.loadCourses();
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
  
  addCourse() {
    
    const courseData = this.myForm.getRawValue();
  
    console.log('Adding course:', courseData); 
     
    this.coursesService.createCourse(courseData).subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
        this.loadCourses();
        this.myForm.reset();
      },
      error: (error) => {
        console.error('Error adding course', error);
      }
    });
    this.open=false;
    
  }
toEdit(id:number){
this.open=true;
this.editId=id
}

    myForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      teacherId:new FormControl(sessionStorage.getItem('userId'))
    });

 
    openForm(){
      this.open=true;
    }
}
