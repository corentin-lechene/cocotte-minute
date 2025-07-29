import {DynamicModule, Module} from '@nestjs/common';
import { RecipeModule } from "./recipe/infrastructure/nest/recipe.module";
import {ApplicationBootstrapOptions} from "./common/interfaces/application-bootstrap-options.interface";
import {RecipeInfrastructureModule} from "./recipe/infrastructure/recipe-infrastructure.module";
import {CoreModule} from "./core/core.module";

@Module({
    imports: [RecipeModule],
})
export class AppModule {
    static register(options: ApplicationBootstrapOptions): DynamicModule {
        return {
            module: AppModule,
            imports: [
                CoreModule.forRoot(options),
                RecipeModule.withInfrastructure(
                    RecipeInfrastructureModule.use(options.driver)
                ),
            ],
        };
    }
}
