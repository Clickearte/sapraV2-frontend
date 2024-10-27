import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInvoice1Component } from './general-invoice1.component';

const routes: Routes = [{ path: '', component: GeneralInvoice1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInvoice1RoutingModule { }
