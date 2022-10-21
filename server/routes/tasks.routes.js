import { Router } from 'express'
import { 
    getProductos,
    getLocales,
    createTask,
    deleteTask,
    updateTask,
    getTask} from '../controllers/tasks.controllers.js'

const router = Router();


router.get('/productos', getProductos);

router.get('/locales', getLocales);

router.get('/tasks/:nombreTienda', getTask);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);





export default router;