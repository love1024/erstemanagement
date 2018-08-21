// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    urls: {
        // departmentsApi: 'https://erstemanagement.herokuapp.com/departments',
        // projectsApi: 'https://erstemanagement.herokuapp.com/projects',
        // resourcesApi: 'https://erstemanagement.herokuapp.com/resources',
        // billingApi: 'https://erstemanagement.herokuapp.com/billing',
        // attendanceApi: 'https://erstemanagement.herokuapp.com/attendance',
        // projectResourceApi: 'https://erstemanagement.herokuapp.com/projectresource',
        // loginApi: 'https://erstemanagement.herokuapp.com/login',
        // technologyApi: 'https://erstemanagement.herokuapp.com/technology',
        // levelInfoApi: 'https://erstemanagement.herokuapp.com/level',
        // taskApi: 'https://erstemanagement.herokuapp.com/task',
        resourcesApi: 'http://localhost:3000/resources',
        attendanceApi: 'http://localhost:3000/attendance',
        technologyApi: 'http://localhost:3000/technology',
        projectResourceApi: 'http://localhost:3000/projectresource',
        projectsApi: 'http://localhost:3000/projects',
        departmentsApi: 'http://localhost:3000/departments',
        levelInfoApi: 'http://localhost:3000/level',
        billingApi: 'http://localhost:3000/billing',
        loginApi: 'http://localhost:3000/login',
        taskApi: 'http://localhost:3000/task',
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
