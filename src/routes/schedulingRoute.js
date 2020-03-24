const { Router } = require('express');
const router = Router();

const { getSchedulings, createScheduling, getSchedulingById, updateScheduling, deleteScheduling } = require('../controllers/schedulingController');

router.get('/scheduling', getSchedulings);
router.get('/scheduling/:id', getSchedulingById);
router.post('/scheduling', createScheduling);
router.put('/scheduling/:id', updateScheduling)
router.delete('/scheduling/:id', deleteScheduling);

module.exports = router;