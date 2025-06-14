import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // import CommonModule

@Component({
  selector: 'app-user-grid',
   standalone: true,                // <-- standalone component
  imports: [CommonModule],  
  templateUrl: './user-grid.component.html'
})
export class UserGridComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}
    filterText: string = '';

  ngOnInit(): void {
    
    this.http.get<any[]>('http://localhost:8080/api/users/user').subscribe({
    
      next: (data) => 
        {
            console.log("endpoint is triggered");
          this.users = data
           console.log("user data "+data);
        },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
deleteUser(index: number): void {
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    this.users.splice(index, 1);
  }
}
}