const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200);
    res.send("Hello, Im Ranjith testing GET in postman");
});
router.post('/', (req,res)=> {
    res.status(201);
    res.send("Hello, Im Ranjith testing POST in postman");
});
module.exports = router;