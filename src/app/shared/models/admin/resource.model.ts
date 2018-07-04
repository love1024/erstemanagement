import { Level } from './level.model';

export class Resource {
    public resourceId: number;
    public resourceName: string;
    public resourceEmail: string;
    public resourceErsteJoiningDate: Date;
    public resourceCertifications: string;
    public resourceLevelId: string;
    public dateFrom: Date;
    public dateUntil: Date;
    public active: boolean;
    public fipUser: string;
    public fipProg: string;
    public fiptst: Date;
}
