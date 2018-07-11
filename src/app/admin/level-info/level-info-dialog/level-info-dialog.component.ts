import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Level } from '../../../shared/models/admin/level.model';

@Component({
  selector: 'erste-level-info-dialog',
  templateUrl: './level-info-dialog.component.html',
  styleUrls: ['./level-info-dialog.component.scss']
})
export class LevelInfoDialogComponent implements OnInit {

  inputForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LevelInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public level: Level) { }

  ngOnInit() {
    if (this.level !== null) {
      this.createEditForm(this.level);
    } else {
      this.createForm();
    }
  }

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      levelId: [0, []],
      levelName: ['', [Validators.required]],
      fipUser: ['test'],
      fipProg: ['Web'],
      fipTst: [Date.now()]
    });
  }

  createEditForm(level: Level): void {
    this.inputForm = this.formBuilder.group({
      levelId: [level.levelId, []],
      levelName: [level.levelName, [Validators.required]],
      fipUser: [level.fipUser],
      fipProg: [level.fipProg],
      fipTst: [level.fipTst]
    });
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.dialogRef.close(this.inputForm.value);
    }
  }

}
