const express = require("express");
const app = express();
const cors = require("cors");
let fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

app.use(cors());
app.use(express.json());

app.post("/create", (req, res) => {
  const uid=req.body.uid;
  const  companyName= req.body.companyName;
  const  description= req.body.description;
  const  perDiem= req.body.perDiem;
  const  startDate= req.body.startDate;
  const  endDate= req.body.endDate;
  fs.appendFile(
    "details.txt",
    `${uid}/${companyName}/${description}/${perDiem}/${startDate}/${endDate}\n`,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
});

app.get("/show", (req, res) => {
  fs.readFile("details.txt", "utf8", function (err, data) {
    if (err) {
      res.status(200).send(err);
      return;
    }
    if (data.length) {
      let details = [];
      fs.readFileSync("details.txt", "utf-8")
        .split(/\r?\n/)
        .forEach(function (li) {
          rsl1 = li.split("|");
          details.push(rsl1);
        });
      res.json(details);
    } else res.json({});
  });
});

// app.get('/show',(req,res) =>{
//     rl.question("What is your name ? ", function(name) {
//         rl.question("password ? ", function(psw) {
//             fs.readFileSync('details.txt', 'utf-8').split(/\r?\n/).forEach(function(li){
//                 rsl1=li.split('|')
//                 console.log(rsl1)
//                 if (rsl1[0]==name )
//                     if (rsl1[1]==psw){
//                         console.log("login success(call a function)")
//                         return
//                     }

//                     else {
//                          console.log('incorrect password(alert wp)')
//                         return
//                         }
//                 else{
//                     console.log('User dosent exist');
//                     return
//                 }

//         })
// rl.close();
//         });
//     });

// })

app.listen(3002, () => {
  console.log("hey your port is running on 3002");
});
