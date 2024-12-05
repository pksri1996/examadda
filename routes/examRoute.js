
const express = require('express');
const router = express.Router();
const Exam = require('../models/Newfile.js');
const Organization = require('../models/Organization.js');


router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.find(); 
    res.render('index', { organizations });
} catch (err) {
    console.error('Error fetching organizations:', err);
    res.status(500).send('An error occurred while fetching organizations');
}
});

router.post('/', async(req, res) => {
  const newExam = new Exam({
    examName: req.body.examName,
    description: req.body.description,
    eligibility: req.body.eligibility,
    syllabus: req.body.syllabus,
    pyq: req.body.pyq,
    format: req.body.format,
    organization: req.body.organization
  });
  await newExam.save()
  .then((data)=>{
    console.log(data);
    res.redirect('/');
  })
  .catch((err)=>{
  console.log("Error is" +err)});
});


router.get('/readExamList', async(req,res) =>{
  await Exam.find()
  .then((data)=>{
    res.render('secondpage',{data});
  })
  .catch((err)=>{
    console.log(err);
  })
    
});

router.get('/exam/:id', async (req, res) => {
  try {
      const examId = req.params.id; 
      const exam = await Exam.findById(examId).populate('organization'); 
      console.log(exam);

      if (!exam) {
          return res.status(404).send('Exam not found');
      }

      res.render('detailpage', { exam });
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  }
});

router.get('/exam/edit/:id', async (req, res) => {
  try {
      const examId = req.params.id; 
      const organization = await Organization.find();
      const exam = await Exam.findById(examId).populate('organization'); 
      if (!exam) {
          return res.status(404).send('Exam not found');
      }
      res.render('editPage', { exam , organization});
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  }
});

router.post('/exam/edit/:id', async (req, res) => {
  try {
      const examId = req.params.id; 
      console.log(req.body);
      await Exam.findByIdAndUpdate(
        examId,
        { 
            examName: req.body.examName,
            description: req.body.description,
            eligibility: req.body.eligibility,
            syllabus: req.body.syllabus,
            pyq: req.body.pyq,
            format: req.body.format,
            organization:req.body.organization
        });

      res.redirect('/readExamList');
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  }
});

router.post('/exam/delete/:id', async (req, res) => {
  try {
      const examId = req.params.id; 
      await Exam.findByIdAndDelete(examId);
      res.redirect('/readExamList');
    } 
    catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  }
});


module.exports = router;