import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  task: Task | null;
  id!: number;
  private subscription!: Subscription;

  constructor(private taskService: TaskService) {
    this.task = null;
  }

  ngOnInit(): void {
    this.subscription = this.taskService.seledctedTask$.subscribe(
      (selectedTask) => this.getTask(selectedTask)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getTask(task: Task | number): void {
    this.taskService.getTask(task).subscribe((task) => (this.task = task));
  }
  clear(): void {
    console.log('詳細画面をクリアしました');
    this.task = null;
  }
}
