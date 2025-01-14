import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-location',
  imports: [FormsModule,CommonModule],
  templateUrl: './workorder.component.html',
  styleUrl: './workorder.component.css'
})
export class WorkorderComponent {
  contractorDropdownValues: { [key: string]: string } = {};
  locationDropdownValues: { [key: string]: string } = {};
  keys: string[] = [];
  location_keys = Object.keys(this.locationDropdownValues);
  work_order = {
    contractor: '',
    payment_terms: '',
    due_date: '',
    locations: [{ location: '', rate: '', qty: '' }],
  };

  constructor(private dataService: DataService, private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.dataService.getContractorDropdownValues().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.contractorDropdownValues = data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as { [key: string]: string });
        } else {
          this.contractorDropdownValues = data;
        }
        this.keys = Object.keys(this.contractorDropdownValues);
      },
      (error) => {
        console.error('Error fetching dropdown values', error);
      }
    );
    
    this.dataService.getLocationDropdownValues().subscribe(
      (data) => {
        // If data is an array, convert it to an object with key-value pairs
        if (Array.isArray(data)) {
          this.locationDropdownValues = data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as { [key: string]: string });
        } else {
          // If data is already an object, assign it directly
          this.locationDropdownValues = data;
        }
        this.location_keys = Object.keys(this.locationDropdownValues); // Get keys for the dropdown
      },
      (error) => {
        console.error('Error fetching dropdown values', error);
      }
    );
  }

  addContractor(): void {
    this.work_order.locations.push({ location: '', rate: '', qty: '' });
  }

  removeContractor(index: number): void {
    this.work_order.locations.splice(index, 1);
  }
  onSubmit(form: any): void {
    this.http.post('http://localhost:3000/api/workorder/addWorkOrder', this.work_order)
      .subscribe(
        response => {
          this.toastr.success('WOrk order generation is successfully done', 'Success');
          console.log('Form submitted successfully!', response);
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
