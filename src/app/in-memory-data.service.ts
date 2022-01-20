import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { getStringDateNow } from './common';
import { Task } from './task/interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      {
        id: 10,
        title: 'taskA',
        createdAt: getStringDateNow(),
        updatedAt: '',
      },
      {
        id: 11,
        title: 'taskB',
        createdAt: getStringDateNow(),
        updatedAt: '',
      },
      {
        id: 12,
        title: 'taskC',
        createdAt: getStringDateNow(),
        updatedAt: '',
      },
      {
        id: 13,
        title: 'taskD',
        createdAt: getStringDateNow(),
        updatedAt: '',
      },
      {
        id: 14,
        title: 'taskE',
        createdAt: getStringDateNow(),
        updatedAt: '',
      },
      {
        id: 15,
        title: 'taskF',
        createdAt: getStringDateNow(),
        updatedAt: '',
      },
    ];
    return { tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 10;
  }
}
