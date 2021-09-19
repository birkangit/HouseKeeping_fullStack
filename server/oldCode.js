const http = require("http");
const express = require("express");
const app = express();
const config = require("./config");
const hostname = "127.0.0.1";
const port = process.env.PORT || 3001;
const nodemailer = require("nodemailer");
//this is Log Library will be used later.
const winston = require("winston");

//This module help us walk on files
//to lean more visit : https://github.com/mihneadb/node-directory-tree
const dirTree = require("directory-tree");
//this module used to delete picked files.
const fs = require("fs");
//system information module for more info visit: https://systeminformation.io/filesystem.html
const si = require("systeminformation");
const readline = require("readline");

// my Modules
const diskCheck = require("./diskCheck");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//$$$$$$$$$$ ** important!**  add a function to detect either the file is deleted in the second attempt or not if yes take it out of the array  **important! ** $$$$$$$$$$

// ## same Disk scenario  ##
// analyze each path by it self and add all the files to the same array
// do array sorting
// control hard disk usage and start deleting depending on the requested area.

// ## Different Disks scenario ##

//1 show how many disks their numbers & percentage.
//2 ask the user wich disk to control:
//3 ask the user how many pathes required.
//4 show the pathes.
//5 ask the user if there's disk to edit if so repeat above.
//6 launch.

// take the path
// analayz the first 2 index of each path.
// then prepare a function to use as component.
// prepare 2 arrays
// now hook the first path as settimeout.

//1
// startMe = () => {
//   si.fsSize().then((data) => {
//     //we can change i to 1 if we don't want to include disk C:/
//     filesList.length = 0;
//     let i = 0;
//     while (data[i]) {
//       console.log(data);
//       console.log(data[i].mount + " is " + data[i].use);

//       i = i + 1;
//       if (!data[i]) {
//         console.log("All connected disk are checked");
//       }
//     }
//   });
// };
// startMe();
//end 1

//##################### >DO NOT CHANGE< #####################
const ONE_DAY = 1000 * 60 * 60 * 24;
//const toDelete = [];
const filesList = [];
const ignoreList = [];

//##################### >DO NOT CHANGE< #####################
//-------------------------------------------------------------

dline end
//##################### >Control Panel< #####################
// const path = path_; // this should be able to take more than on path...
// //const maxFileAge = config.maxFileAge; //we can add protecting shield the recent files.
// const minRequiredSpace = minRequiredSpace_; //Disk space in %
// const maxRequiredSpace = maxRequiredSpace_;
//##################### >Control Panel< #####################
//-------------------------------------------------------------

//This function search all the connected disks and give info about them.
startFunc = () => {
  si.fsSize().then((data) => {
    //we can change i to 1 if we don't want to include disk C:/
    filesList.length = 0;
    let i = 1;
    if (data[i]) {
      console.log(data[i].mount + " is " + data[i].use + "% ");
      if (data[i].use > minRequiredSpace) {
        scanDisk(data[i].mount, i);
      } else
        console.log(data[i].mount + " This disk doesn't need optimisation");
      //i = i + 1;
      // if (!data[i]) {
      //   console.log("All connected disk are checked");
      // }
    }
    setTimeout(startFunc, 30000);
    console.log("will restart in 30 second");
  });
};

//Check again Function

checkDiskAgain = (list, diskNumber, i) => {
  si.fsSize().then((data) => {
    if (data[diskNumber].use > maxRequiredSpace) {
      takeAction(list, diskNumber, i);
    } else {
      startFunc();
    }
  });
};

//walking on the choosen directory and pushing the data to the array.
//use { exclude: /some_path_to_exclude/ } to aviod specific folders
//use { extensions: /\.(md|js|html|java|py|rb)$/} to craw only specific extensions
scanDisk = (diskName, diskNumber, i) => {
  dirTree(
    path,
    {
      attributes: ["mtime"],
      extensions: /\.(txt|png|jpg|mp4|avi|db|pdf|mxf)$/,
    },
    (item) => {
      if (
        ignoreList.length !== 0 &&
        ignoreList.includes(item.path.toString())
      ) {
        null;
      } else {
        filesList.push(item);
        //console.log(ignoreList, item.path.toString());
      }
    }
  );
  if (filesList.length !== 0) {
    console.log("Deletation list is ready");
    orderdList = filesList.sort((a, b) => (a.mtime > b.mtime ? 1 : -1));
    console.log("deletion list ordered Ascending successfully");
    takeAction(orderdList, diskNumber, (i = 0));
  } else {
    console.log("Bad news! there are no files to delete in the selected paths");
  }
};

takeAction = (list, diskNumber, i) => {
  if (i < list.length) {
    cleanDisk((m = [list[i].path]));
    i = i + 1;
    checkDiskAgain(list, diskNumber, i);
  } else {
    //run scan disk again with i = i +1
    //scanDisk(i);i = i+1
  }
};

//this function is made especially to delete each item by itself
//to be able to control the harddisk drive whenever it is free enough or not.
cleanDisk = (url) => {
  try {
    fs.unlinkSync(url[0]);
    console.log("Delete success : " + url[0]);
    fs.appendFile(
      __dirname +
        `/log/${
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
        } Success.txt`,
      `File path : ${url[0]} , Date : ${new Date()} \n`,
      function (err) {
        if (err) throw err;
        //console.log("a file has been reported");
      }
    );
  } catch (err) {
    ignoreList.push(url[0]);
    console.log(err.path);
    console.log(
      "We cannot delete this file: " +
        err.path +
        " will try later in 10 seconds..."
    );
    setTimeout(secondAttemp.bind(null, url[0]), 10000);
  }
};

secondAttemp = (fileToDelete) => {
  console.log("Second attemp of deletion is running...");
  if (fileToDelete.length !== 0) {
    try {
      fs.unlinkSync(fileToDelete);
      console.log("deleted in the second attemp : " + fileToDelete);
      ignoreList.splice(ignoreList.indexOf(fileToDelete), 1);
      fs.appendFile(
        __dirname +
          `/log/${
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate()
          } Success.txt`,
        `File path : ${fileToDelete} , Date : ${new Date()} \n`,
        function (err) {
          if (err) throw err;
          //console.log("a file has been reported");
        }
      );
    } catch (err) {
      console.log(
        "We cannot delete this file: " +
          err.path +
          " will try later in 10 seconds..."
      );
      setTimeout(thirdAttemp.bind(null, fileToDelete), 10000);
    }
  } //check if the log.text exists and then send log.
};

thirdAttemp = (fileToDelete) => {
  console.log("Third attemp of deletion is running...");
  if (fileToDelete.length !== 0) {
    try {

      fs.unlinkSync(fileToDelete);
      console.log("deleted in the Third attemp : " + fileToDelete);
      ignoreList.splice(ignoreList.indexOf(fileToDelete), 1);
      fs.appendFile(
        __dirname +
          `/log/${
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate()
          } Success.txt`,
        `File path : ${fileToDelete} , Date : ${new Date()} \n`,
        function (err) {
          if (err) throw err;
          //console.log("a file has been reported");
        }
      );
    } catch (err) {
      console.log("failed to delete " + err.path + " initializing a report...");
      fs.appendFile(
        __dirname +
          `/log/${
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate()
          }.txt`,
        ` File path : ${fileToDelete} \n ${err} \n Date : ${new Date()}\n Next.. \n >>>`,
        function (err) {
          if (err) throw err;
          console.log("a file has been reported");
        } //a new function with a timer set to sceduale a new delete for the file after that send a mail with the path & disk capacity
      );
    }
  } //check if the log.text exists and then send log.

  // if (fs.existsSync(__dirname + `/log/${new Date().getFullYear() +
  //   "-" +
  //   (new Date().getMonth() + 1) +
  //   "-" +
  //   new Date().getDate()}.txt`)) {
  //   setTimeout(sendReport.bind(null, fileToDelete), 1000);
  //   //console.log(fileToDelete);
  // } else null;
};

//send email function //
sendReport = (fileToDelete) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testbaranco@gmail.com",
      pass: "Testbaranco1@!",
    },
  });

  let mailOptions = {
    from: "testbaranco@gmail.com",
    to: config.sendLogTo,
    subject: "Error report",
    text: `This file could not be deleted : ${fileToDelete}`,
    attachments: [
      {
        filename: `${
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
        }.txt`,
        path:
          __dirname +
          `/log/${
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate()
          }.txt`,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log("sending...");
};

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!", info: "hiiii" });
});

app.listen(port, () => {
  //console.log(`Server listening on http://${hostname}:${port}/`);
});
