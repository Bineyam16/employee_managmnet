import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceServiceService } from '../service-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnChanges {
  registrationForm: FormGroup | any;
  @Input() employeeData: any;
  //@Input() resetform:any
  @Input() resetFormm: boolean = false;
  @Output() formReset = new EventEmitter<void>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  genders = [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
    
  ];
  statuses = [
    { text: 'Active', value: 'Active' },
    { text: 'Inactive', value: 'Inactive' }
  ];
  trustworthinessLevels = [
    { text: 'Sufficient', value: 'Sufficient' },
    { text: 'Insufficient', value: 'Insufficient' },
    { text: 'Perfect', value: 'Perfect' }
  ];

  editingEmployeeId: number | null = null;

  constructor(private fb: FormBuilder, private service: ServiceServiceService) { }

  ngOnInit(): void {
    
    this.registrationForm = this.fb.group({
      EmployeeID: [null],
      Employees: ['', Validators.required],
      Mail: ['', [Validators.required, Validators.email]],
      dob: [''],
      Gender: [''],
      Designation: [''],
      Location: [''],
      Status: [''],
      Trustworthiness: [''],
      Rating: [null, [Validators.min(1), Validators.max(5), Validators.pattern(/^\d*$/)]],
      Software: [null, [Validators.min(0), Validators.max(100)]],
      CurrentSalary: [null, Validators.pattern(/^\d*$/)],
      Address: ['']
    });
    console.log(this.employeeData.id,'employeeData');
    if(this.employeeData != undefined){
      this.registrationForm.patchValue({
        EmployeeID: this.employeeData.EmployeeID,
        Employees: this.employeeData.Employees,
        Mail: this.employeeData.Mail,
        dob: this.employeeData.dob,
        Gender: this.employeeData.Gender,
        Designation: this.employeeData.Designation,
        Location: this.employeeData.Location,
        Status: this.employeeData.Status,
        Trustworthiness: this.employeeData.Trustworthiness,
        Rating: this.employeeData.Rating,
        Software: this.employeeData.Software,
        CurrentSalary: this.employeeData.CurrentSalary,
        Address: this.employeeData.Address
      })
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeData'] && !changes['employeeData'].firstChange) {
      this.initializeForm();
    }
    if (this.resetFormm) {
      this.resetFormValues();
    }
  }
  resetFormValues(): void {
    this.registrationForm.reset();
    this.employeeData= undefined
  }
  initializeForm(): void {
    this.registrationForm = this.fb.group({
      EmployeeID: [null],
      Employees: ['', Validators.required],
      Mail: ['', [Validators.required, Validators.email]],
      dob: [''],
      Gender: [''],
      Designation: [''],
      Location: [''],
      Status: [''],
      Trustworthiness: [''],
      Rating: [null, [Validators.min(1), Validators.max(5), Validators.pattern(/^\d*$/)]],
      Software: [null, [Validators.min(0), Validators.max(100)]],
      CurrentSalary: [null, Validators.pattern(/^\d*$/)],
      Address: ['']
    });
    if (this.employeeData) {
      this.registrationForm.patchValue(this.employeeData);
      this.editingEmployeeId = this.employeeData.id;
    } else {
      this.editingEmployeeId = null;
    }
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      if (this.editingEmployeeId !== null) {
        this.updateEmployee();
      } else {
        this.addEmployee();
      }
    }
  }

  addEmployee(): void {
    const newEmployee = {
      ...this.registrationForm.value,
      EmployeeImg: 'usermale',
      Check: true
    };
    this.service.addEmployee(newEmployee).subscribe(response => {
      console.log('Employee added:', response);
      this.onSave.emit(response); 
      this.editingEmployeeId = response.id;

     // this.resetForm();
    });
  }

  updateEmployee(): void {
    if (this.editingEmployeeId !== null) {
      const updatedEmployee = {
        ...this.registrationForm.value,
        EmployeeImg: 'usermale',
        Check: true
      };
      this.service.updateEmployee(this.editingEmployeeId, updatedEmployee).subscribe(response => {
        console.log('Employee updated:', response);
        this.onSave.emit(response); 
        //this.resetForm();
      });
    }
    else if(this.employeeData != undefined){
      const updatedEmployee = {
        ...this.registrationForm.value,
        EmployeeImg: 'usermale',
        Check: true
      };
      this.service.updateEmployee(this.employeeData.id, updatedEmployee).subscribe(response => {
        this.onSave.emit(response); 
        console.log('Employee updated:', response);
        //this.resetForm();
      });
    }
  }

  deleteEmployee(): void {
    if (this.editingEmployeeId !== null) {
      this.service.deleteEmployee(this.editingEmployeeId).subscribe(response => {
        console.log('Employee deleted:', response);
        this.resetForm();
      });
    }
  }

  editEmployee(employee: any): void {
    this.editingEmployeeId = employee.id;
    this.registrationForm.patchValue({
      EmployeeID: employee.EmployeeID,
      Employees: employee.Employees,
      Mail: employee.Mail,
      dob: employee.dob,
      Gender: employee.Gender,
      Designation: employee.Designation,
      Location: employee.Location,
      Status: employee.Status,
      Trustworthiness: employee.Trustworthiness,
      Rating: employee.Rating,
      Software: employee.Software,
      CurrentSalary: employee.CurrentSalary,
      Address: employee.Address
    });
  }

  resetForm(): void {
    this.editingEmployeeId = null;
    this.registrationForm.reset();
    this.formReset.emit();
  }
}
