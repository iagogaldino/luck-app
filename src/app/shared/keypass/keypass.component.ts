import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-keypass',
  templateUrl: './keypass.component.html',
  styleUrls: ['./keypass.component.css'],
})
export class KeypassComponent implements OnInit {
  @ViewChild('inputElement1') inputElement1!: ElementRef;
  @ViewChild('inputElement2') inputElement2!: ElementRef;
  @ViewChild('inputElement3') inputElement3!: ElementRef;
  @ViewChild('inputElement4') inputElement4!: ElementRef;
  @Output() onCompleteCode = new EventEmitter<any>();
  public form: FormGroup;

  constructor(private _fb: FormBuilder, private renderer: Renderer2) {
    this.form = this._fb.group({
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
      code: [''],
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.onCompleteCode.emit(this.getValueForm());
  }

  getValueForm() {
    const code1 = this.form.get('code1')?.value;
    const code2 = this.form.get('code2')?.value;
    const code3 = this.form.get('code3')?.value;
    const code4 = this.form.get('code4')?.value;
    const codeComplete = `${code1}${code2}${code3}${code4}`;
    this.form.get('code')?.setValue(codeComplete);
    return this.form.value;
  }

  changeFocus(input: number | string, code?: any) {
    console.log('event', code);
    this.onCompleteCode.emit(this.getValueForm());
    if (code) {
      switch (input) {
        case 1:
          {
            this.renderer
              .selectRootElement(this.inputElement1.nativeElement)
              .focus();
          }
          break;
        case 2:
          {
            this.renderer
              .selectRootElement(this.inputElement2.nativeElement)
              .focus();
          }
          break;
        case 3:
          {
            this.renderer
              .selectRootElement(this.inputElement3.nativeElement)
              .focus();
          }
          break;
        case 4:
          {
            this.renderer
              .selectRootElement(this.inputElement4.nativeElement)
              .focus();
          }
          break;
        case 'end':
          {
            this.renderer
              .selectRootElement(this.inputElement4.nativeElement)
              .focus();
          }
          break;
      }
    }
  }
}
