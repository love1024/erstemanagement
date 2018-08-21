import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Task } from '../../shared/models/task/task.model';
import { TaskService } from '../../core/task/task.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'erste-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('smoothInOut', [
      state('in', style({ 'min-height': '30px', 'height': 'auto' })),
      transition('void => *', [
        style({ 'min-height': '0', 'height': '0' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ 'height': '0' }))
      ])
    ]),
    trigger('fadeOut', [
      transition('* => void', [
        animate(200, style({ 'height': '0' }))
      ])
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TasksComponent implements OnInit {

  displayedColumns = ['id', 'name'];
  dataSource = new MatTableDataSource();
  currentTask: Task;
  buttonMessage = "Entry";
  isOpen = false;
  isLoading = true;

  constructor(
    private dataService: TaskService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.isLoading = true;
    this.dataService.getTaskList(true)
      .subscribe(
        list => {
          this.dataSource = new MatTableDataSource(this.addDetailColumn(list));
          this.dataSource.filterPredicate = this.dataFilter;
          this.isLoading = false;
        }
      );
    this.closeDialog();
  }

  toggleDialog() {
    if (this.isOpen) {
      this.closeDialog();
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    let icon = document.getElementsByClassName('fa-plus')[0];
    this.buttonMessage = 'Close';
    this.renderer.setStyle(icon, 'transform', 'rotate(45deg)')
    this.isOpen = true;
  }

  closeDialog() {
    let icon = document.getElementsByClassName('fa-plus')[0];
    this.buttonMessage = 'Entry';
    this.renderer.setStyle(icon, 'transform', 'rotate(0deg)')
    this.isOpen = false;
  }

  isExpansionDetailRow(i: number, row: Object) {
    return row.hasOwnProperty('editor');
  }

  onRowClick(task: Task) {
    if (task == this.currentTask)
      this.currentTask = null;
    else
      this.currentTask = task;
  }

  addDetailColumn(list: Task[]) {
    const rows = [];
    list.forEach(element => rows.push(element, { editor: true, element }));
    return rows;
  }

  dataFilter(data: any, filter) {
    const filterArr = JSON.parse(filter);
    const str = filterArr.val.toString().toLowerCase();
    const col = filterArr.col;
    if (data.editor)
      return true;
    return data[col].toString().toLowerCase().indexOf(str) != -1;
  }

  onFilter(col, val) {
    this.dataSource.filter = JSON.stringify({ col, val });
  }
}
