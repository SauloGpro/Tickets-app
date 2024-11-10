export default function buildFilter(req, res, next) {
    const { status, priority, search } = req.query;  // Obtiene parámetros de la URL
    let filter = {};  // Inicializa un objeto vacío para el filtro

    if (status) {
        filter.status = status;  // Filtra por estado si está presente
    }

    if (priority) {
        filter.priority = priority;  // Filtra por prioridad si está presente
    }

    if (search) {
        // Filtra por coincidencia en título o descripción usando regex (insensible a mayúsculas)
        filter.$or = [
            { tittle: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    req.filter = filter;  // Asigna el filtro a `req.filter` para usarlo en otros middlewares
    next();  // Pasa al siguiente middleware
}
