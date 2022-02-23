import { Routes } from "@angular/router";
import { LoginTemplateComponent } from "./login-template/login-template.component";



export const SessionsRoutes: Routes = [
  {
    path: "",
    component: LoginTemplateComponent,
    // children: [
    //   {
    //     path: "",
    //     component: SigninComponent,
    //     data: { title: "Sign In" }
    //   },
    //   {
    //     path: "forgot-password",
    //     component: ForgotPasswordComponent,
    //     data: { title: "Forgot password" },
    //     children: [
    //       {
    //         path: ':id',
    //         component: ForgotPasswordComponent
    //       }
    //     ]
    //   },
    //   {
    //     path: "lockscreen",
    //     component: LockscreenComponent,
    //     data: { title: "Lockscreen" }
    //   },
    //   {
    //     path: "404",
    //     component: NotFoundComponent,
    //     data: { title: "Not Found" }
    //   },
    //   {
    //     path: "error",
    //     component: ErrorComponent,
    //     data: { title: "Error" }
    //   },
    // ]
  }
];
