import { Level } from './level.model';

export class Resource {
    public _id: String;
    public resourceId: number;
    public resourceName: string;
    public resourceEmail: string;
    public resourceErsteJoiningDate: Date;
    public resourceCertifications: string;
    public resourceLevelId: string;
    public location: String;
    public startDate: Date;
    public endDate: Date;
    public citrix: Boolean;
    public active: boolean;
    public dateFrom: Date;
    public dateUntil: Date;
    public fipUser: string;
    public fipProg: string;
    public fiptst: Date;
}
