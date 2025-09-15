import {Module} from "@nestjs/common";
import {TokenService} from "../../domain/services/token.service";
import {JwtTokenService} from "./jwt-token.service";

@Module({
    providers: [
        {
            provide: TokenService,
            useFactory: () =>
                new JwtTokenService(
                    process.env.JWT_SECRET!,
                ),
        },
    ],
    exports: [TokenService],
})
export class JwtModule {}