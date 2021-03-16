import mongoose from 'mongoose';

export interface CompnayAttributes {
    name: string;
    employeeStrength: number;
    operationStartDate: Date;
    adresses: Array<address>;
    quarterData: Array<quarter>;
}

interface address {
    state: string;
    employeeNum: number;
}

interface quarter {
    name: string;
    profit: number;
}

export interface CompanyDoc extends mongoose.Document {
    name: string;
    employeeStrength: number;
    operationStartDate: Date;
    adresses: Array<address>;
    quarterData: Array<quarter>;
}
interface CompanyModel extends mongoose.Model<CompanyDoc> {
    createNew(attributes: CompnayAttributes): CompanyDoc
}

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeStrength: {
        type: Number,
        required: true
    },
    operationStartDate: {
        type: Date,
        required: true
    },
    adresses: {
        type: Array,
        default: [],
        required: false
    },
    quarterData: {
        type: Array,
        default: [],
        required: false
    }
}, {
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    timestamps: true
});

companySchema.statics.createNew = (attributes: CompnayAttributes) => {
    return new Company(attributes);
}

const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema);

export { Company };