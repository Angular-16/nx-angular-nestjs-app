import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser, UserService } from './user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  form!: FormGroup;
  users$!: Observable<IUser[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    // TODO: отписаться
    this.userService.createUser(this.form.value).subscribe(() => {
      this.form.reset();
    });
  }

  getUsers(): void {
    this.users$ = this.userService.getAllUsers();
  }
}
