import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted: boolean = false;

  /** create a form (contactForm) with following controls/groups and  validations
   *    - name: control,    valiations: required
   *    - phone: control,   validations: required, number of 10 digits
   *    - address: group
   *      - street: control
   *      - city: control
   *      - zip: number of 6 digits
   */

    constructor(private formBuilder: FormBuilder) { }

  contactForm = new FormGroup({});

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")],
            address: this.formBuilder.group({
              street: [''],
              city: [''],
              zip: ['', Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern("^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")]
            }),
        });

  }

  onSubmit() {
    this.submitted = true;
        if (this.contactForm.invalid) {
            return;
        }
        // console.log('form value =>', this.contactForm.value);
  }

  get name() { return this.contactForm.get('name')}
  get phone() { return this.contactForm.get('phone'); }
  get zip() { return this.contactForm.controls['address'].get('zip'); }
}
