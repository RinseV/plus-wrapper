import { PlusObject } from '../base/plusObject';
import { AdditionalRequestOptions } from '../plus';
import { StoreModel } from './storeModel';

export class Store extends PlusObject {
    /**
     * Get all stores
     */
    async getStores(additionalRequestOptions?: AdditionalRequestOptions): Promise<StoreModel[]> {
        return await this.plus.get('store', additionalRequestOptions);
    }
}
