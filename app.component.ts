
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserGridComponent } from './list/user-grid.component'; // adjust path
import { Component, ViewChild } from '@angular/core';


import { NgIf } from '@angular/common'; // 👈 Import this
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf,UserGridComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
    @ViewChild(UserGridComponent) userGrid!: UserGridComponent;
  user = { name: '', age: null, email: '' };
  responseMessage = '';
  private apiUrl = 'http://localhost:8080/api/users/add';

  constructor(private http: HttpClient) {}

 onSubmit() {
  console.log('Form submitted', this.user); // ✅ Check this shows in console
  this.http.post(this.apiUrl, this.user).subscribe({
    next: () => {
      this.responseMessage = 'User details submitted successfully!';
       alert(this.responseMessage);
       this.user.name="";
       this.user.age=null;
       this.user.email="";
       this.responseMessage="";
       this.userGrid.ngOnInit();
      console.log(this.responseMessage); // ✅ Log this too
    },
    error: (err) => {
      this.responseMessage = 'Failed to submit user details.';
      console.error('Submission error:', err); // Debug error
    }
  });
}
}
