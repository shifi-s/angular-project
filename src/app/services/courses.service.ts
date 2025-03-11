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
    const token = sessionStorage.getItem('myToken'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getCourseById(id: string): Observable<any> {
    const token = sessionStorage.getItem('myToken')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  createCourse(courseData: any, token: string): Observable<any> {
    return this.http.post(this.apiUrl, courseData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
  }

  updateCourse(courseId: string, courseData: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData, { headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })});
    
  }



  deleteCourse(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  enrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/${courseId}/enroll`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { userId: userId };

    return this.http.post(url, body, { headers });
  }

  // unEnrollStudent(courseId: number, userId: number, token: string): Observable<any> {
  //   const url = `${this.apiUrl}/${courseId}/unenroll`;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

      unenrollFromCourse(courseId: number, userId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // const body = { userId: userId };
    // return this.http.post( body, { headers });
    
    const body = { userId }; 

    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { headers, body });
  }

  getCoursesByStudentId(studentId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/student/${studentId}`, { headers });
  }
}

