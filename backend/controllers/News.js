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
console.log("tetet");

console.log("Received data:");
console.log(req.body); 
console.log(req.file);
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


module.exports.sort = async (req, res, next) => {
  try {
    const category = req.query.category; 
    const limit = parseInt(req.query.limit, 10); 
    const pipeline = [
      { $match: { category: category } },
      { $sort: { date: -1 } } 
    ];
    
    if (limit) {
      pipeline.push({ $limit: limit }); 
    }

    const news = await newsModel.aggregate(pipeline);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.searchNews = async (req, res) => {

  try {
    const news = await newsModel.find({
      $or: [
        { title: new RegExp('i') },
        { des: new RegExp('i') },
        { story: new RegExp('i') },
        { category: new RegExp('i') }
      ]
    });
    if (!news) {
      return res.status(400).json({error: 'enter proper search'})
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




 

