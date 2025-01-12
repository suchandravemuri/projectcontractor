import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generatebill',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './generatebill.component.html',
  styleUrl: './generatebill.component.css'
})
export class GeneratebillComponent {
  constructor(private http: HttpClient,private toastr: ToastrService) {}
  entity = {
    name: '',
  };
  onSubmit(form: any): void {
    this.http.post('http://localhost:3000/api/billgeneration/generatebill', this.entity)
      .subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          this.toastr.success('Bill generation initiation successfully done', 'Success');
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
