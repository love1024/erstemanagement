// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    urls: {
        departmentsApi: 'https://erstemanagement.herokuapp.com/departments',
        projectsApi: 'http://localhost:3000/projects',
        // projectsApi: 'https://erstemanagement.herokuapp.com/projects',
        resourcesApi: 'https://erstemanagement.herokuapp.com/resources',
        // resourcesApi: 'http://localhost:3000/resources',
        billingApi: 'https://erstemanagement.herokuapp.com/billing',
        attendanceApi: 'https://erstemanagement.herokuapp.com/attendance'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
