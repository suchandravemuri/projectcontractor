import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractorFormComponent } from './add-contractor/add-contractor.component';
import { MainframeComponent } from './mainframe/mainframe.component'; // Import MainframeComponent
import { EntityComponent } from './entity/entity.component';
import { LocationComponent } from './location/location.component';
import { WorkorderComponent } from './workorder/workorder.component';
import {CompletelocationComponent} from './completelocation/completelocation.component'

const routes: Routes = [
  // { path: '', redirectTo: '/mainframe', pathMatch: 'full' }, // Default route
  {
    path: '',
    component: MainframeComponent,
    children: [
      { path: 'add', component: AddContractorFormComponent },
      { path: 'addEntity', component: EntityComponent },
      {path:'addLocation', component: LocationComponent},
      {path:'createWorkOrder', component: WorkorderComponent},
      {path:'completeLocation', component: CompletelocationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
