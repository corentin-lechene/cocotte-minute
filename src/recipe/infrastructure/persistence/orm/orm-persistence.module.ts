import {Module} from "@nestjs/common";
import {RecipeWriteRepository} from "../../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../../domain/repository/recipe-read.repository";
import {OrmRecipeRepository} from "./repositories/orm-recipe.repository";

@Module({
    providers: [
        OrmRecipeRepository,
        {
            provide: RecipeWriteRepository,
            useExisting: OrmRecipeRepository,
        },
        {
            provide: RecipeReadRepository,
            useExisting: OrmRecipeRepository,
        },
    ],
    exports: [
        RecipeWriteRepository,
        RecipeReadRepository,
    ],
})
export class OrmPersistenceModule {}