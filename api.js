const express = require('express');
const Submission = require('./submission');
const multer = require('multer')
const router = express.Router();
const path = require('path');


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extname = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + extname);
        },
    })
});



router.get('/countries', (req, res) => {
    const countries = require('./countries.json');
    res.json(countries);
});

router.post('/submissions', upload.single('resumePath'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const { name, dateOfBirth, country } = req.body;
    const resumePath = req.file.path;
    Submission.create({ name, dateOfBirth, country, resumePath })
        .then((submission) => {
            console.log(submission);
            res.json(submission);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Failed to submit the form' });
        });
});

router.get('/submissions', (req, res) => {
    Submission.findAll()
        .then((submissions) => {
            res.json(submissions);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch submissions' });
        });
});
router.delete('/submissions/:id', (req, res) => {
    const submissionId = req.params.id;

    Submission.destroy({
        where: {
            id: submissionId
        }
    })
        .then((numAffectedRows) => {
            if (numAffectedRows === 1) {
                res.json({ message: 'Submission removed successfully' });
            } else {
                res.status(404).json({ error: 'Submission not found' });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Failed to remove submission' });
        });
});


router.get('/resume/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.sendFile(filePath);
});
module.exports = router;
