using { com.sumanth.satinfotech as db } from '../db/schema';

service capm {
    entity student as projection on db.student actions {
        action data() returns String;
    }
}

annotate capm.student with @odata.draft.enabled;
