import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../app/services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css'
})
export class LessonDetailsComponent implements OnInit{

lessonId:string=""
courseId:string=""
lesson:any
  constructor(private lessonService:LessonService,private route:ActivatedRoute,private router:Router) {
  }
ngOnInit() {
  this.lessonId=this.route.snapshot.paramMap.get('id')!
  this.courseId=this.route.snapshot.paramMap.get('courseId')!
  this.loadLesson()
}
navigate() {
  this.router.navigate(['../'], { relativeTo: this.route })  }

loadLesson(){
  this.lessonService.getLesson(Number(this.courseId),Number(this.lessonId)).subscribe({
    next: (data) => {
      this.lesson = data;
    },
    error: (err) => {
      console.error('Error fetching lesson:', err);
    }
  });
}


}
