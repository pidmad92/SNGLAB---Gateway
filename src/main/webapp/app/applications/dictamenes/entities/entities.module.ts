import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem, DropdownModule } from 'primeng/primeng';

const ENTITY_STATES = [];

@NgModule({
    declarations: [],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES), ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioFinancieroModule { }
