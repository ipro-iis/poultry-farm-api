import * as service from "./auth.service.js";
export async function register(req, res) {
    try {
        const result = await service.register(req.body);
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}
export async function login(req, res) {
    try {
        const result = await service.login(req.body.phoneNo, req.body.password);
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}
//# sourceMappingURL=auth.controller.js.map