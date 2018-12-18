import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { DefaultErrorStateMatcher } from 'src/app/common/error-state-matcher';



@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  matcher = new DefaultErrorStateMatcher();


  constructor() { }

  ngOnInit() {
  }

}
