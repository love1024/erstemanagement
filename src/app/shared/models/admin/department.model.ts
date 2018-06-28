import { Deserializable } from './../deserializable.interface';
export class Department implements Deserializable<Department> {
    public departmentId: string;
    public departmentName: string;
    public departmentHod: string;
    public departmentHodEmail: string;

    public deserialize(input: any): Department {
        Object.assign(this, input);
        return this;
    }
}
