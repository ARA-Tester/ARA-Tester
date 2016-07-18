import * as Mongoose from 'mongoose';

interface DBService<SearchPredicate, QerryResult, DocumentType> {
    cast(document: DocumentType): QerryResult;
    findOne(search: SearchPredicate): Promise<QerryResult>;
    findAll?(search: SearchPredicate): Promise<Array<QerryResult>>;
    update?(search: SearchPredicate, change: QerryResult): Promise<void>;
    remove?(search: SearchPredicate): Promise<void>;
}

export default DBService;