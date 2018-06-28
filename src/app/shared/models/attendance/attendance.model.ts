export class Attendance {
    public attendanceId: number;
    public resourceId: number;
    public startDate: Date;
    public endDate: Date;
    public attendanceType: string; // wfh, public holiday, onsite public holiday, personal , personal onsite
    public approvalDate: Date;
    public leaveType: string; // planned, unplanned
    public reason: string;
    public clientApprovalDate: Date;
}
