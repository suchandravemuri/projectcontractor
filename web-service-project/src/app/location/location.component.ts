import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-location',
  imports: [FormsModule,CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  enitiyDropdownValues: { [key: string]: string } = {}; 
  states: { [key: string]: string }  = {1:"Ready", 2: "Complete"};
  keys: string[] = [];
  state_keys = Object.keys(this.states);
  location = {
    entity: '',
    location_name: '',
    state: '',
  };

  constructor(private dataService: DataService, private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.dataService.getEntityDropdownValues().subscribe(
      (data) => {
        // If data is an array, convert it to an object with key-value pairs
        if (Array.isArray(data)) {
          this.enitiyDropdownValues = data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as { [key: string]: string });
        } else {
          // If data is already an object, assign it directly
          this.enitiyDropdownValues = data;
        }

        this.keys = Object.keys(this.enitiyDropdownValues); // Get keys for the dropdown
      },
      (error) => {
        console.error('Error fetching dropdown values', error);
      }
    );
  }

  onSubmit(form: any): void {
    console.log(this.location);
    
    this.http.post('http://localhost:3000/api/locationentity/locations', this.location)
      .subscribe(
        response => {
          this.toastr.success('location creation is successfully done', 'Success');
          console.log('Form submitted successfully!', response);
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
