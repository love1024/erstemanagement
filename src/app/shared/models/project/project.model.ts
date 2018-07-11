export class Project {
    public _id: String;
    public projectId: Number;
    public projectNameAsPerSow: String;
    public departmentId: Number;
    public technologyId: Number[];
    public projectModelName: String;
    public projectSitTAM: String;
    public projectSitTAMEmail: String;
    public projectSitProjectManager: String;
    public projectSitProjectManagerEmail: String;
    public projectNagarroTAMId: Number;
    public projectNagarroPMId: Number;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public projectCostCenter: Number;
    public projectPONumber: Number;
    public dateFrom: Date;
    public active: boolean;
    public dateUntil: Date;
    public fipUser: String;
    public fipProg: String;
    public fipTst: Date;
    constructor() {
    }
}
