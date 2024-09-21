import { Component ,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss']
})
export class SharedHeaderComponent {
    // Input properties, marked with @Input() decorator, to receive data from parent component
  
    @Input() headerMainText: string = ''; // Additional main text for the header
    @Input() headerPargraph: string = ''; 
    @Input() headerBtnText: string = ''; // Text for the button in the header

    @Output() addClicked: EventEmitter<void> = new EventEmitter<void>();

    // Method to emit the buttonClicked event
    onAddClick() {
      this.addClicked.emit();
    }

}
