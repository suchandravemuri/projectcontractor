import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generatebill',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './generatebill.component.html',
  styleUrl: './generatebill.component.css'
})
export class GeneratebillComponent {
  constructor(private http: HttpClient) {}
  entity = {
    name: '',
  };
  onSubmit(form: any): void {
    this.http.post('http://localhost:3000/api/billgeneration/generatebill', this.entity)
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
