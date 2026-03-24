import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-repo-instruction',
  templateUrl: './repo-instruction.component.html',
  standalone: false,
})
export class RepoInstructionComponent {
  @Input() set activeView(view: 'primaryView' | 'secondaryView') {
    if (view) {
      this.selectedView = view;
    }
  }

  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  onSelectionChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
    this.emitSelection(view);
  }

  private emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectionChange.emit(view);
  }
}
