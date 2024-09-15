export function soloAdmin(req, res, next) {
    if (req.user.rol === "admin") {
        next();
    } else {
        res.status(403).json({ error: "No autorizado" });
    }
}

export function soloUser(req, res, next) {
    if (req.user.rol === "user") {
        next();
    } else {
        res.status(403).json({ error: "No autorizado" });
    }
}