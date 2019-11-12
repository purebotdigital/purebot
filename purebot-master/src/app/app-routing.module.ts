import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ChatDialogComponent } from './chat/chat-dialog/chat-dialog.component';


const routes: Routes = [{
  path: 'chart',
  component: ChartComponent
},
{
  path: 'chatbot',
  component: ChatDialogComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
