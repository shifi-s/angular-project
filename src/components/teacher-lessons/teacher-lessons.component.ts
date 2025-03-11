import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../app/services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-lessons',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-lessons.component.html',
  styleUrl: './teacher-lessons.component.css'
})
export class TeacherLessonsComponent implements OnInit {
navigate() {
  this.router.navigate(['../'], { relativeTo: this.route })}

constructor(private lessonService: LessonService,private route:ActivatedRoute,private router:Router) {

}
lessons:any[]=[]
open=false
courseId=''

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('courseId')!
      if (this.courseId) {
        
        this.loadLessons();
      }
    });
  }
  

loadLessons(){
  {
    this.lessonService.getLessons(Number(this.courseId)).subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (err) => {
        console.error('Error fetching lessons:', err);
      }
    });
  }
}

addLesson(){
  this.lessonService.createLesson(Number(this.courseId),this.myForm.getRawValue().title!,this.myForm.getRawValue().content!).subscribe({
    next: (data) => {
      this.loadLessons()
      this.open=false
    },
    error: (err) => {
      console.error('Error fetching lessons:', err);
    }
  });
}

    myForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl('')
      
    });

 
    openForm(){
      this.open=true;
    }

    navigateToLesson(lessonId: number) {
      this.router.navigate([this.router.url,lessonId]);
    }
    

}
