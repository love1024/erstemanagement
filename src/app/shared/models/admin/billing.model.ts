
export class BillingRate {
    public _id: String;
    public billingId: number;
    public technologyId: number;
    public resourceLevelId: number;
    public resourceOffshoreRate: number;
    public resourceOnshoreShorttermRate: number;
    public resourceOnshoreLongtermRate: number;
    public resourceOncallStandbyRate: number;
    public resourceOncallSupportWeekdayRate: number;
    public resourceOncallSupportWeekendRate: number;
    public active: boolean;
    public dateFrom: Date;
    public dateUntil: Date;
    public fipUser: String;
    public fipProg: String;
    public fipTst: Date;
}
