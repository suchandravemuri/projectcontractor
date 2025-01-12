import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completelocation',
  imports: [FormsModule,CommonModule],
  templateUrl: './completelocation.component.html',
  styleUrl: './completelocation.component.css'
})
export class CompletelocationComponent {
  contractorDropdownValues: { [key: string]: string } = {};
  locationDropdownValues: { [key: string]: string } = {};
  showPopup = false;
  keys: string[] = [];
  location_keys = Object.keys(this.locationDropdownValues);
  location_completion = {
    location : "",
    completed_by : "",
  };

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.dataService.getContractorDropdownValues().subscribe(
      (data) => {
        // If data is an array, convert it to an object with key-value pairs
        if (Array.isArray(data)) {
          this.contractorDropdownValues = data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as { [key: string]: string });
        } else {
          // If data is already an object, assign it directly
          this.contractorDropdownValues = data;
        }
        this.keys = Object.keys(this.contractorDropdownValues); // Get keys for the dropdown
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

  openPopup(location: string): void {
    this.fetchContractors(location);
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  fetchContractors(location: string): void {
    this.location_completion.location = location;
    this.dataService.getContractorWorkOrderDropdownValues(location).subscribe(
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
  }
  onSubmit(form: any): void {
    this.http.post('http://localhost:3000/api/locationentity/completeLocation', this.location_completion)
      .subscribe(
        response => {
          console.log('Form submitted successfully!', response);
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
