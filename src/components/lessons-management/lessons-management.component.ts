import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../app/services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Lesson } from '../../app/models/lesson';

@Component({
  selector: 'app-lessons-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lessons-management.component.html',
  styleUrl: './lessons-management.component.css'
})
export class LessonsManagementComponent implements OnInit {
lessonId:string=""
courseId:string=""
lesson!:Lesson
open=false
  constructor(private lessonService:LessonService,private route:ActivatedRoute,private router:Router) {
  }
ngOnInit() {
  this.lessonId=this.route.snapshot.paramMap.get('lessonId')!
  this.courseId=this.route.snapshot.paramMap.get('courseId')!
  this.loadLesson(Number(this.courseId),Number(this.lessonId))
  
  
}

loadLesson(courseId:number,lessonId:number){
  this.lessonService.getLesson(courseId,lessonId).subscribe({
    next: (data) => {
      this.lesson = data;
      
      this.myForm.setValue({
        title: this.lesson.title,
        content: this.lesson.content
      });
    },
    error: (err) => {
      console.error('Error fetching lesson:', err);
    }
  });
}

deleteLesson()
{
  this.lessonService.deleteLesson(this.lesson.courseId,this.lesson.id).subscribe({
    next: (data) => {
      this.router.navigate([`teachCourses/${this.courseId}/lessons`])
    },
    error: (err) => {
      console.error('Error fetching lesson:', err);
    }
  });
}

openForm(){
this.open=true
}

updateLesson(){
  const data=this.myForm.getRawValue()
  this.lessonService.updateLesson(this.lesson.courseId,this.lesson.id,data.title!,data.content!).subscribe({
    next: (data) => {
    this.loadLesson(this.lesson.courseId,this.lesson.id)
    },
    error: (err) => {
      console.error('Error fetching lesson:', err);
    }
  });

}

    myForm = new FormGroup({
      title: new FormControl(""),
      content: new FormControl("")
      
    });
}
