import { User } from '../models/User';

export class Mark {
    id: number;
    markValue: number;
    locked: boolean;
    semester: number;
    dateRated: any;
    lastUpdateDate: any;
    description: string;
    student: any;
    schedule: any;
    markType: any;
    ratedBy: User;

}
