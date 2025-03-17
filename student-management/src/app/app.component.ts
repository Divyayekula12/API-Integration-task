import { Component } from '@angular/core';
import { StudentComponent } from "./student/student.component";

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [StudentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-management';
}

