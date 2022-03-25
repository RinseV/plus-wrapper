import { PlusObject } from '../base/plusObject';
import { AdditionalRequestOptions } from '../plus';
import { PromotionQueryModel } from './promotionModel';

export class Promotion extends PlusObject {
    async getPromotionsFromStore(
        storeId: number,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<PromotionQueryModel> {
        return await this.plus.get(`proxy/v3/promotions`, {
            query: {
                storeId: storeId.toString()
            },
            ...additionalRequestOptions
        });
    }
}
