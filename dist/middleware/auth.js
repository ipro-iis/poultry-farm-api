import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { config } from "../config/index.js";
import { prisma } from "../prisma/client.js";
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
}, async (payload, done) => {
    try {
        const user = await prisma.company.findUnique({ where: { id: String(payload.sub) } });
        if (!user)
            return done(null, false);
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
}));
export const requireAuth = passport.authenticate("jwt", { session: false });
export { passport };
//# sourceMappingURL=auth.js.map