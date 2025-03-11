import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../app/services/lesson.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {

constructor(private lessonService: LessonService,private route:ActivatedRoute,private router:Router) {

}
lessons:any[]=[]
courseId=''
ngOnInit() {
  
  const courseId = this.route.snapshot.paramMap.get('id')
  if (courseId) {
    this.courseId=courseId
    this.loadLessons();
    
  }
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
    console.log(this.lessons.length);
    
  }

  
}

navigateToLesson(lessonId: number) {
  this.router.navigate([`/courses/${this.courseId}/lessons/${lessonId}`]);
}


}
