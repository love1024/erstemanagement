export class ProjectResource {
  public _id: Number;
  public projectResourceId: Number;
  public projectId: Number;
  public resourceId: Number;
  public billRateId: Number;
  public technologyId: Number;
  public resourceAllocation: Number;
  public resourceIsBillable: Boolean;
  public keyResource: Boolean;
  public invoicingEntity: String;
  public active: Boolean;
  public dateFrom: Date;
  public dateUntil: Date;
  public fipUser: String;
  public fipProg: String;
  public fipTst: Date;
  public projectName: String;
}
