import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphqlComponent } from './graphql/graphql.component';

const routes: Routes = [
  { path: "graph" , component: GraphqlComponent }, 
  { path: "" , redirectTo: "/graph" , pathMatch: 'full' } ,


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
