import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LoginComponent } from '../components/login/login.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { StudentCoursesComponent } from '../components/student-courses/student-courses.component';
import { AllCoursesComponent } from '../components/all-courses/all-courses.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { TeacherLessonsComponent } from '../components/teacher-lessons/teacher-lessons.component';
import { LessonDetailsComponent } from '../components/lesson-details/lesson-details.component';
import { LessonsManagementComponent } from '../components/lessons-management/lessons-management.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
   {path:'courses',component:AllCoursesComponent}
   ,{path:'login',component:LoginComponent}
   ,{path:'signIn',component:SignInComponent},
   { path: 'courses/:id', component: CourseDetailsComponent },
   {path:'courses/:id/lessons',component:LessonComponent},
   {path:'myCourses',component:StudentCoursesComponent},
   {path:'teachCourses',component:CoursesComponent},
   {path:'teachCourses/:id',component:CourseManagementComponent},
   {path:"teachCourses/:id/lessons",component:TeacherLessonsComponent},
   {path:'courses/:courseId/lessons/:lessonId',component:LessonDetailsComponent},
   {path:'teachCourses/:courseId/lessons/:lessonId',component:LessonsManagementComponent}
];

