import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { TextareaWrapperComponent } from './textarea-wrapper/textarea-wrapper.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipModule } from '../widgets/tooltip/tooltip.module';

@NgModule({
  declarations: [InputWrapperComponent, TextareaWrapperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TooltipModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    TextareaWrapperComponent,
    TooltipModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class SharedModule {}
