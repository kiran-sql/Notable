var ObjectId = require('mongodb').ObjectId;

module.exports = function(app,db) {
 /*** get the note ****/
app.get('/notes/:id', (req,res) => {
 const details = {'_id':new ObjectID(req.params.id)};
 db.collection('notes').findOne(details, (err,item) => {
  if(err){
    res.send({'error':'An error has occured'});
   }
   else{
    res.send(item);
   }
 });
});

/*** delete the note ****/
app.delete('/notes/:id', (req,res) => {
 const details = {'_id':new ObjectID(req.params.id)};
 db.collection('notes').remove(details, (err,item) => {
  if(err){
    res.send({'error':'An error has occured'});
   }
   else{
    res.send("notes"+req.params.id+"deleted");
   }
 });
});

/*** update the note ****/
app.put('/notes/:id', (req,res) => {
 const details = {'_id':new ObjectID(req.params.id)};
 const note = {
   text:req.body.body,
   title:req.body.title
  }
 db.collection('notes').update(details, note,(err,item) => {
  if(err){
    res.send({'error':'An error has occured'});
   }
   else{
    res.send(item);
   }
 });
});

/*** add the note ****/
 app.post('/notes',(req,res) => {
  // create the note
  // console.log(req.body);
  // res.send('hello');
  const note = {
   text:req.body.body,
   title:req.body.title
  }
  db.collection('notes').insert(note, (err,results) => {
   if(err){
    res.send({'error':'An error has occured'});
   }
   else{
    res.send(results.ops[0]);
   }
  });
 });
}