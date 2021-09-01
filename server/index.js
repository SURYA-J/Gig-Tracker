const express = require("express");
const app = express();
const cors = require("cors");
let fs = require("fs");
const removeEmptyLines = require("remove-blank-lines");
app.use(cors());
app.use(express.json());

app.post("/create/:id", (req, res) => {
  const user = req.params.id;
  const uid = req.body.uid;
  const companyName = req.body.companyName;
  const note = req.body.note;
  const perDiem = req.body.perDiem;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  fs.appendFile(
    user + "_details.txt",
    `\n${uid}|${companyName}|${note}|${perDiem}|${startDate}|${endDate}`,
    // `"uid":"${uid}"|"companyName":"${companyName}"|"note":"${note}"|"perDiem":${perDiem}|"startDate":${startDate}|"endDate":${endDate}\n`,
    function (err) {
      if (err) throw err;
    }
  );
});

app.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  fs.appendFile(
    "userDetails.txt",
    `${userName}|${password}|${email}\n`,
    function (err) {
      if (err) throw err;
    }
  );
  fs.appendFile(email + "_details.txt","", function (err) {
    if (err) throw err;
  });
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let login = 1;
  let newData = removeEmptyLines(fs.readFileSync("userDetails.txt", "utf-8"));
  newData = newData.split(/\r?\n/);
  for (let i = 0; i < newData.length; i++) {
    let rsl1 = newData[i].split("|");
    if (rsl1[0] == userName) {
      login = 1;
      if (rsl1[1] == password) {
        console.log("login success");
        return res.json(rsl1[2]);
      } else {
        login = 0;
        return res.json("error");
      }
    } else {
      login = 0;
    }
  }
  if(login==0){
    return res.json("error");
  }
});

app.get("/show/:id", (req, res) => {
  const user = req.params.id;
  fs.readFile(user + "_details.txt", "utf8", function (err, data) {
    const newData = removeEmptyLines(data);
    if (err) {
      res.status(200).send(err);
      return;
    }
    if (newData.length) {
      let details = [];
      newData.split(/\r?\n/).forEach(function (li) {
        rsl1 = li.split("|");
        details.push(rsl1);
      });
      res.json(details);
    } else res.json();
  });
});

app.post("/edit/:user", (req, res) => {
  const user = req.params.user;
  const uid = req.body.uid;
  const companyName = req.body.companyName;
  const note = req.body.note;
  const perDiem = req.body.perDiem;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  fs.readFile(
    user + "_details.txt",
    { encoding: "utf-8" },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let dataArray = data.split("\n");
        let lastIndex = -1;
        for (let i = 0; i <= dataArray.length; i++) {
          if (dataArray[i].includes(uid)) {
            lastIndex = i;
            break;
          }
        }
        dataArray[
          lastIndex
        ] = `${uid}|${companyName}|${note}|${perDiem}|${startDate}|${endDate}`;
        const updatedData = dataArray.join("\n");
        fs.writeFile(user + "_details.txt", updatedData, (err) => {
          if (err) throw err;
        });
        res.send("success");
      }
    }
  );
});

app.delete("/delete/:user/:id", (req, res) => {
  const id = req.params.id;
  const user = req.params.user;
  fs.readFile(
    user + "_details.txt",
    { encoding: "utf-8" },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let dataArray = data.split("\n");
        let lastIndex = -1;
        for (let i = 0; i <= dataArray.length; i++) {
          if (dataArray[i].includes(id)) {
            lastIndex = i;
            break;
          }
        }
        dataArray.splice(lastIndex, 1);
        const updatedData = dataArray.join("\n");
        fs.writeFile(user + "_details.txt", updatedData, (err) => {
          if (err) throw err;
        });
        res.send("success");
      }
    }
  );
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
