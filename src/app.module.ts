import {DynamicModule, Module} from '@nestjs/common';
import { RecipeModule } from "./recipe/infrastructure/nest/recipe.module";
import {ApplicationBootstrapOptions} from "./common/interfaces/application-bootstrap-options.interface";
import {RecipeInfrastructureModule} from "./recipe/infrastructure/recipe-infrastructure.module";
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./auth/infrastructure/nest/auth.module";
import {AuthInfrastructureModule} from "./auth/infrastructure/auth-infrastructure.module";

@Module({
    imports: [RecipeModule],
})
export class AppModule {
    static register(options: ApplicationBootstrapOptions): DynamicModule {
        return {
            module: AppModule,
            imports: [
                CoreModule.forRoot(options),
                AuthModule.withInfrastructure(
                    AuthInfrastructureModule.use(options.driver)
                ),
                RecipeModule.withInfrastructure(
                    RecipeInfrastructureModule.use(options.driver)
                ),
            ],
        };
    }
}
