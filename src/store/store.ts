import { PlusObject } from '../base/plusObject';
import { AdditionalRequestOptions } from '../plus';
import { StoreModel } from './storeModel';

export class Store extends PlusObject {
    async getStores(additionalRequestOptions?: AdditionalRequestOptions): Promise<StoreModel[]> {
        return await this.plus.get('store', additionalRequestOptions);
    }
}
