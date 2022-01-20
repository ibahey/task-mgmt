import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Task } from '../interfaces/task';
import { catchError, map, tap } from 'rxjs/operators';
import { getStringDateNow } from '../../common';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'api/tasks';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private selectedTask = new Subject<Task>();
  public seledctedTask$ = this.selectedTask.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      tap((tasks) => console.log('データを取得しました')),
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  getTask(task: Task | number): Observable<Task | null> {
    const id = typeof task === 'number' ? task : task.id;
    if (!id) {
      console.log('詳細画面をクリアしました');
      return of(null);
    }
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap((_) => console.log(`タスク(id=${id})を取得しました`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => {
        console.log(
          `タスク(id=${newTask.id})を追加しました(${task.createdAt})`
        );
      }),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap((_) =>
        console.log(`タスク(id=${task.id})を更新しました(${task.updatedAt})`)
      ),
      catchError(this.handleError<any>('updatetask'))
    );
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    const dt_now = getStringDateNow();
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap((_) => console.log(`タスク(id=${id})を削除しました(${dt_now})`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  public onNotifySelected(selected: Task) {
    this.selectedTask.next(selected);
  }

  private handleError<T>(operation = 'opration', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
