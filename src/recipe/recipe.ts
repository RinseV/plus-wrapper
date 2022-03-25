import { PlusObject } from '../base/plusObject';
import { AdditionalRequestOptions } from '../plus';
import { RecipeModel, RecipeQueryModel } from './recipeModel';

export interface RecipeOptions {
    sort?: string;
    type?: RecipeType[];
    cookingTime?: RecipeCookingTime[];
}

export class Recipe extends PlusObject {
    async getRecipeFromId(recipeId: string, additionalRequestOptions?: AdditionalRequestOptions): Promise<RecipeModel> {
        return await this.plus.get(`proxy/recipes/${recipeId}`, additionalRequestOptions);
    }

    async getRecipesFromName(
        recipeName: string,
        options?: RecipeOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<RecipeQueryModel> {
        return await this.plus.get(`proxy/recipes/search`, {
            query: {
                q: recipeName,
                sort: (options?.sort ?? 'dateStart_desc').toString(),
                type: (options?.type?.join('|') ?? '').toString(),
                cookingTime: (options?.cookingTime?.join('|') ?? '').toString()
            },
            ...additionalRequestOptions
        });
    }
}

export enum RecipeType {
    Dessert = 'nagerecht',
    Snack = 'tussendoortje',
    SideDish = 'bijgerecht',
    Appetizer = 'voorgerecht',
    Breakfast = 'ontbijtgerecht',
    MainDish = 'hoofdgerecht',
    Lunch = 'Lunch',
    Drink = 'Drankje',
    Soup = 'soep',
    Brunch = 'Brunch',
    Bite = 'Hapje'
}

export enum RecipeCookingTime {
    ZeroToFifteenMinutes = '0-15',
    FifteenToThirtyMinutes = '15-30',
    ThirtyToSixtyMinutes = '30-60',
    MoreThanSixtyMinutes = '60-999'
}
