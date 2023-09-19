const fs = require("fs");

// Read a file
function readFile(filename) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    console.log("File content:", data);
  });
}

// Write content to a file
function writeFile(filename, content) {
  fs.writeFile(filename, content, "utf8", (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("File written successfully!");
  });
}

// Delete a file
function deleteFile(filename) {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error("Error deleting the file:", err);
      return;
    }
    console.log("File deleted successfully!");
  });
}

// Sample usage
readFile("example.txt"); // reads the content of example.txt
writeFile("test.txt", "Hello World"); // creates or overwrites test.txt with the content 'Hello World'
//deleteFile('test.txt'); // deletes test.txt (Be careful using this! Uncomment to run.)
