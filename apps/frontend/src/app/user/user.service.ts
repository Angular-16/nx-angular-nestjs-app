import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ICreateUser {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('api/user');
  }

  createUser(user: ICreateUser): Observable<IUser> {
    const body = { ...user };
    return this.http.post<IUser>('api/user', body);
  }
}
