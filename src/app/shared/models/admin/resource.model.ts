import { Level } from './level.model';

export class Resource {
    public resourceId: number;
    public resourceName: string;
    public resourceEmail: string;
    public resourceErsteJoiningDate: Date;
    public resourceProjectId: number;
    public resourceCertifications: string;
    public resourceAllocation: number;
    public resourceAllocationEndDate: Date;
    public resourceLevelMsaName: string;
    public resourceLevelId: string;
    public levelChangeStartDate: Date;
    public levelChangeEndDate: Date;
    public resourceBillingId: number;
    public isNagarroTAM: boolean;
    public resourceIsBillable: boolean;
    public resourceIsPM: boolean;
}
