import {Module} from "@nestjs/common";
import {InMemoryRecipeRepository} from "./repositories/in-memory-recipe.repository";
import {RecipeWriteRepository} from "../../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../../domain/repository/recipe-read.repository";

@Module({
    providers: [
        InMemoryRecipeRepository,
        {
            provide: RecipeWriteRepository,
            useExisting: InMemoryRecipeRepository,
        },
        {
            provide: RecipeReadRepository,
            useExisting: InMemoryRecipeRepository,
        },
    ],
    exports: [
        RecipeWriteRepository,
        RecipeReadRepository,
    ],
})
export class InMemoryPersistenceModule {}