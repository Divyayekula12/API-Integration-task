import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  imports: [FormsModule, NgFor, NgIf],
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];  
  student: Student = this.getEmptyStudent(); 
  isEditMode: boolean = false;
  editStudentId: number | null = null; 

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // Fetch all students
  loadStudents(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  // Populate form fields when clicking "Update"
  editStudent(student: Student): void {
    this.student = { ...student };  // Copies student data
    this.isEditMode = true;
    this.editStudentId = student.id || null;
  }

  // Add or update student
  onSubmit(): void {
    if (this.isEditMode && this.editStudentId !== null) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  }

  // Create new student
  addStudent(): void {
    this.studentService.addStudent(this.student).subscribe((newStudent) => {
      this.students.push(newStudent); 
      this.resetForm();    
    });
  }

  // Update existing student
  updateStudent(): void {
    if (this.editStudentId !== null) {
      this.studentService.updateStudent(this.editStudentId, this.student).subscribe((updatedStudent) => {
        const index = this.students.findIndex(s => s.id === this.editStudentId);
        if (index !== -1) {
          this.students[index] = updatedStudent; // Update UI
        }
        this.resetForm();
      });
    }
  }

  // Delete student
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(s => s.id !== id); // Remove student from UI
    });
  }

  // Reset form
  resetForm(): void {
    this.student = this.getEmptyStudent();
    this.isEditMode = false;
    this.editStudentId = null;
  }

  private getEmptyStudent(): Student {
    return {
      id: undefined,  // ✅ Fix: Use `undefined`
      firstName: '',
      lastName: '',
      age: null,
      bloodGroup: '',
      email: '',
      phoneNumber: ''
    };
  }
  
}
