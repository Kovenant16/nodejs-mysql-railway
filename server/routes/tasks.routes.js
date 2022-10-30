import { Router } from 'express'
import { 
    getProductos,
    getLocales,
    createTask,
    deleteTask,
    updateTask,
    getTask,
getCategories,
crearTipoProducto} from '../controllers/tasks.controllers.js'

const router = Router();


router.get('/productos', getProductos);

router.get('/locales', getLocales);

router.get('/tasks/:nombreTienda', getTask);

router.get('/categorias/:nombreTienda', getCategories)

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

router.post('/create/tipoproducto', crearTipoProducto);





export default router;