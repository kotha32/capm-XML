namespace com.sumanth.satinfotech;
using { managed, cuid } from '@sap/cds/common';

entity student:managed, cuid {
    @title: 'Name'
    name: String(10);
    @title: 'Address1'
    addr1: String(10);
    @title: 'Address2'
    addr2: String(10);
    @title: 'City'
    city: String(10);
    @title: 'State'
    state: String(2);
    @title: 'Pincode'
    pincode: String(6);
    @title: 'Phone'
    phone: String(10);
}