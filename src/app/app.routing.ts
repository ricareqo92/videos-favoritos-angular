import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { IdentityGuard } from './services/identity.guard';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { DetailVideoComponent } from './components/detail-video/detail-video.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'inicio/:page', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'editar', component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'crear-video', component: CreateVideoComponent, canActivate: [IdentityGuard]},
    {path: 'editar-video/:id', component: EditVideoComponent, canActivate: [IdentityGuard]},
    {path: 'detalle-video/:id', component: DetailVideoComponent, canActivate: [IdentityGuard]},
    {path: 'error', component: ErrorComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);