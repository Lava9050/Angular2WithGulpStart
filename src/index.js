import {Component, View, bootstrap} from 'angular2/angular2';
import {Angular2Learning} from 'angular-2-learning';

@Component({
  selector: 'main'
})

@View({
  directives: [Angular2Learning],
  template: `
    <angular-2-learning></angular-2-learning>
  `
})

class Main {

}

bootstrap(Main);
