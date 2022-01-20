import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { getStringDateNow } from '../../../common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task | null;

  constructor(private taskService: TaskService) {
    this.tasks = [];
    this.selectedTask = null;
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onSelect(task: Task): void {
    console.log(`タスク(id=${task.id})が選択されました`);
    this.taskService.onNotifySelected(task);
  }

  onSelectEdit(task: Task): void {
    this.selectedTask = task;
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  add(title: string): void {
    if (!title.trim()) {
      alert('inputError');
      return;
    }
    this.taskService
      .addTask({
        title,
        createdAt: getStringDateNow(),
        updatedAt: '',
      } as Task)
      .subscribe((task) => {
        this.tasks.push(task);
      });
  }

  update(title: string, selectedTask: Task): void {
    if (!title.trim()) {
      alert('inputError');
      return;
    }
    const task = {
      ...selectedTask,
      title: title,
      updatedAt: getStringDateNow(),
    };
    this.taskService.updateTask(task).subscribe(() => {
      this.selectedTask = null;
      this.getTasks();
      this.taskService.onNotifySelected({} as Task);
    });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }
}
