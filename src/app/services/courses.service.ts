import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {

    return this.http.get<any[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.apiUrl, courseData);
  }

  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData);
    
  }



  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  enrollStudent(courseId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${courseId}/enroll`;
  
    const body = { userId: userId };

    return this.http.post(url, body);
  }


      unenrollFromCourse(courseId: number, userId: number): Observable<any> {
    const body = { userId }; 

    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {  body });
  }

  getCoursesByStudentId(studentId: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/student/${studentId}`);
  }
}

