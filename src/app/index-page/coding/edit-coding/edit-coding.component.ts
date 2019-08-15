import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-coding',
  templateUrl: './edit-coding.component.html',
  styleUrls: ['./edit-coding.component.css']
})
export class EditCodingComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    
  }

  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

}
