import { Component, Input } from '@angular/core';
import { ImageModel } from '../list.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    @Input() item: ImageModel;

}
