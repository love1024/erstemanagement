import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../shared/models/task/task.model';
import { TaskService } from '../../core/task/task.service';
import { CompareService } from '../../core/compare/compare.service';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'erste-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit {

  inputForm: FormGroup;
  @Input() task: Task;
  @Input() isNew: Boolean;
  @Output() refresh = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: TaskService,
    private compareService: CompareService,
    private snackbarService: SnackbarService,
    private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.task) {
      this.createEditForm(this.task);
    } else {
      this.createForm();
    }
    if (this.isNew) {
      let container = document.getElementById('form-container');
      this.renderer.setStyle(container, 'margin-bottom', '50px');
      this.renderer.setStyle(container, 'border', '1px solid lightgrey')
      this.renderer.setStyle(container, 'box-shadow', 'none')
    }
  }

  ngOnInit() { }

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      taskId: [0, []],
      taskName: ['', [Validators.required]],
      active: [true, [Validators.required]]
    });
  }

  createEditForm(task: Task): void {
    this.inputForm = this.formBuilder.group({
      taskId: [task.taskId, []],
      taskName: [task.taskName, [Validators.required]],
      active: [true, [Validators.required]]
    });
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      if (this.task) {
        this.editTask();
      } else {
        this.createTask(this.inputForm.value);
      }
    }
  }

  onDelete() {
    this.deleteTask(this.task.taskId);
  }

  editTask() {
    const oldResource = <Task>this.task
    const newResource = <Task>this.inputForm.value;
    const isEqual = this.compareService.isEqual(newResource, oldResource);
    if (isEqual) {
      this.snackbarService.open("Form is not changed");
      return;
    }
    if (this.checkDefined(newResource)) {
      this.updateTask(newResource);
    }
  }

  updateTask(task: Task): void {
    this.dataService.updateTask(task).subscribe(res => {
      this.emitRefresh()
    });
  }

  createTask(task: Task): void {
    this.dataService.createTask(task).subscribe(res => {
      this.emitRefresh()
    });
  }

  deleteTask(id): void {
    this.dataService.deleteTask(id).subscribe(res => {
      this.emitRefresh()
    });
  }

  emitRefresh() {
    this.refresh.emit('');
  }

  checkDefined(task: Task): boolean {
    if (task != null && task !== undefined) {
      return true;
    }
    return false;
  }


}
