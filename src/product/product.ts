import { PaginationOptions, PlusObject } from '../base/plusObject';
import { AdditionalRequestOptions, Query } from '../plus';
import { ProductQueryModel, ProductModel } from './productModel';

export interface ProductOptions extends PaginationOptions {
    storeId?: number;
    cId?: number;
    sort?: ProductSortOptions;
    ps?: number;
    parameters?: string;
    nutriscore?: Nutriscore[];
    qualityLabel?: QualityLabel[];
    diet?: DietFilter[];
    brands?: string[];
}

export class Product extends PlusObject {
    async getProductFromId(
        productId: number,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<ProductModel> {
        return await this.plus.get(`product/${productId}`, additionalRequestOptions);
    }

    async getProductsFromName(
        productName: string,
        options?: ProductOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<ProductQueryModel> {
        const totalQuery: Query = {
            tn_q: productName,
            tn_cid: (options?.cId ?? '').toString(),
            tn_sort: (options?.sort ?? '').toString(),
            tn_ps: (options?.ps ?? '').toString(),
            tn_parameters: (options?.parameters ?? '').toString(),
            tn_maxresults: (options?.limit ?? '20').toString()
        };
        if (options?.storeId) {
            totalQuery['tn_fk_storeid'] = options.storeId.toString();
        }
        if (options?.nutriscore) {
            totalQuery['tn_fk_ae-nutriscore'] = options.nutriscore.map((n) => n.toString()).join('|');
        }
        if (options?.qualityLabel) {
            totalQuery['tn_fk_ae-keurmerken'] = options.qualityLabel.map((ql) => ql.toString()).join('|');
        }
        if (options?.diet) {
            totalQuery['tn_fk_ae-dieet'] = options.diet.map((d) => d.toString()).join('|');
        }
        if (options?.brands) {
            totalQuery['tn_fk_merk'] = options.brands.join('|');
        }
        return await this.plus.get('navigation-search', {
            query: totalQuery,
            ...additionalRequestOptions
        });
    }
}

export enum ProductSortOptions {
    Relevance = 'Sorteeroptie Zoeken',
    Sales = 'Aanbiedingen',
    PriceDesc = 'Prijs aflopend',
    PriceAsc = 'Prijs oplopend'
}

export enum Nutriscore {
    A = 'Score A',
    B = 'Score B',
    C = 'Score C',
    D = 'Score D',
    E = 'Score E'
}

export enum QualityLabel {
    Fairtrade = 'Fairtrade',
    Organic = 'Biologisch',
    MSC = 'MSC',
    BeterLeven1Star = 'Beter Leven 1 Ster',
    ASC = 'ASC',
    BeterLeven2Star = 'Beter Leven 2 sterren',
    BeterLeven3Star = 'Beter Leven 3 sterren',
    Planetproof = 'Planetproof'
}

export enum DietFilter {
    Vegan = 'Vegan',
    Vegetarian = 'Vegetarisch'
}
