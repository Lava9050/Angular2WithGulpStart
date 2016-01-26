import {ComponentMetadata as Component, ViewMetadata as View} from 'angular2/angular2';

@Component({
  selector: 'angular-2-learning'
})

@View({
  templateUrl: 'angular-2-learning.html'
})

export class Angular2Learning {

  constructor() {
    console.info('Angular2Learning Component Mounted Successfully');
  }

}
