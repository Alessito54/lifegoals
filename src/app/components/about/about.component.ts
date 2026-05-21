import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // Contact information
  developer = {
    name: 'Alessandro Pedraza',
    email: 'arielpedraza10@outlook.com',
    phone: '2721398260',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile'
  };
}
