const newsModel = require('../models/newsmodel')

module.exports.newscreat = async (req, res, next) => {
   const imageName = req.file.filename;
   try {
      

       const newsData = {
           ...req.body,
           img: imageName
       };
console.log(newsData);
       const news = await newsModel.create(newsData);
       res.json(news);
   } catch (err) {
       res.json(err);
   }
}



module.exports.shownews = async (req, res, next) => {
   try {
     const news = await newsModel.find({});
     res.json(news);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };

 module.exports.single = (req, res, next) => {
     const id = req.params.id;
   //   console.log('id'+id)
     newsModel.findById({_id:id})
     .then(news=>{res.json(news)})
     .catch (err=>res.json(err))
   
 };

 module.exports.addnews = (req, res, next) => {
console.log("tetet",req.body);

  const id = req.params.id;
  newsModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        des: req.body.des,
        story: req.body.story,
        img: req.file ? req.file.filename : req.body.img,
        date: req.body.date,
        category: req.body.category
      },
      { new: true }
    )
    .then((news) => {
      res.json(news);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports.deletenews = (req, res, next) => {
   const id = req.params.id;
 //   console.log('id'+id)
   newsModel.findByIdAndDelete({_id:id})
   .then(news=>{res.json(news)})
   .catch (err=>res.json(err))
 
};

module.exports.breaking = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.$limit, 10);
    
    const pipeline = [
      { $match: { category: "breaking" } },
      { $project: { date: 1, title: 1, des: 1, story: 1, category: 1, img: 1 } }
    ];
    
    if (!limit) {
      pipeline.push({ $sort: { date: -1 } });
    } else {
      pipeline.push(
        { $sort: { date: -1 } },
        { $limit: limit }
      );
    
    }
    
    const news = await newsModel.aggregate(pipeline);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.sports = async (req, res, next) => {
  try { 
    const news = await newsModel.aggregate([
      { $match: { category: "sports" } },
      { $project: { date: 1, title: 1, des: 1, story: 1, category: 1, img: 1 } }]);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.business = async (req, res, next) => {
  try { 
    const news = await newsModel.aggregate([
      { $match: { category: "business" } },
      { $project: { date: 1, title: 1, des: 1, story: 1, category: 1, img: 1 } }]);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.Local = async (req, res, next) => {
  try { 
    const news = await newsModel.aggregate([
      { $match: { category: "Local" } },
      { $project: { date: 1, title: 1, des: 1, story: 1, category: 1, img: 1 } }]);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





 

