import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityComponent {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  entity = {
    name: '',
  };
  onSubmit(form: any): void {
    this.http.post('http://localhost:3000/api/locationentity/entities', this.entity)
      .subscribe(
        response => {
          this.toastr.success('Entity creation is successfully done', 'Success');
          console.log('Form submitted successfully!', response);
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
