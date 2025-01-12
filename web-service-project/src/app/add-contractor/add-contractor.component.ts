import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-contractor-form',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.css']
})
export class AddContractorFormComponent {
  isVisible = true;  // Exam

  contractor = {
    name: '',
    email: '',
    phone: ''
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  onSubmit(form: any): void {
    console.log('Form submitted!', form);
    console.log('Contractor Data:', this.contractor);
    this.http.post('http://localhost:3000/api/contractors/add', this.contractor)
      .subscribe(
        response => {
          this.toastr.success('Bill generation initiation successfully done', 'Success');
          console.log('Form submitted successfully!', response);
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
