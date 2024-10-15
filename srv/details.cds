using { com.sumanth.satinfotech as db } from '../db/schema';

service capm{
    entity student as projection on db.student;
    entity data as select from student;
}

annotate capm.student with @odata.draft.enabled;