export default function pagination(model) {
    return async (req, res, next) => {

        // Define el tamaño de página (número de elementos por página) y la página actual. Si no se especifican, usa valores predeterminados.
        const pageSize = parseInt(req.query.pageSize) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = ((page - 1) * pageSize);  // Calcula cuántos documentos saltar según la página actual

        const results = {};  // Objeto para almacenar los resultados paginados

        try {
            // Cuenta el total de documentos en la colección para determinar el número de páginas
            results.total = await model.countDocuments().exec();

            // Ejecuta la consulta en base al filtro (si está presente) y realiza el salto y límite según paginación
            results.results = await model.find(req.filter)
                .skip(skip)
                .limit(pageSize)
                .exec();

            // Calcula el total de páginas y define la página actual
            results.page = Math.ceil(results.total / pageSize);
            results.currentPage = page;
            
            // Asigna los resultados paginados a la solicitud para que puedan usarse en el controlador
            req.paginatedResults = results;
            next();  // Llama a la siguiente función de middleware
            
        } catch (error) {
            // Si hay un error, responde con un código 500 y el mensaje del error
            res.status(500).json({ message: error.message });
        }
    }
}
