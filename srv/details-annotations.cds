using { capm } from './details';

annotate capm.student with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Label:'Name',
            Value : name
        },
        {
            $Type : 'UI.DataField',
            Value : addr1
        },
        {
            $Type : 'UI.DataField',
            Value : addr2
        },
        {
            $Type : 'UI.DataField',
            Value : city
        },
        {
            $Type : 'UI.DataField',
            Value : state
        },
        {
            $Type : 'UI.DataField',
            Value : pincode
        },
        {
            $Type : 'UI.DataField',
            Value : phone
        }
    ],  
);


annotate capm.student with @(       
    UI.FieldGroup #studentInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            $Type : 'UI.DataField',
            Label:'Name',
            Value : name
        },
        {
            $Type : 'UI.DataField',
            Value : addr1
        },
        {
            $Type : 'UI.DataField',
            Value : addr2
        },
        {
            $Type : 'UI.DataField',
            Value : city
        },
        {
            $Type : 'UI.DataField',
            Value : state
        },
        {
            $Type : 'UI.DataField',
            Value : pincode
        },
        {
            $Type : 'UI.DataField',
            Value : phone
        }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'studentInfoFacet',
            Label : 'student Information',
            Target : '@UI.FieldGroup#studentInformation',
        },
    ],    
);
