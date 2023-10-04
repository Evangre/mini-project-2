# Mini-Project 4: Async Programming

[![Maintainability](https://api.codeclimate.com/v1/badges/df7d557610ea4dfcb364/maintainability)](https://codeclimate.com/github/Evangre/Project1NodeBasics/maintainability)

## Features:

- Use of Promises to replace traditional callbacks in RESTful API.
- Utilization of `async/await` for more readable asynchronous code.
- Example demonstrating the traditional use of callbacks.
- Understanding of the Node.js event loop.
- Enhanced error handling for asynchronous operations.

## How to run:

1. Start the server using `node server.js`.
2. Access the API at `http://localhost:3000/api/users`.
3. Check the console to see a message showcasing the use of callbacks after a delay.

## Node.js Event Loop:

Node.js operates on a single-threaded event loop which uses non-blocking I/O calls. This architecture allows it to handle multiple concurrent operations efficiently. The event loop is the heart of Node.js, ensuring that asynchronous operations, like reading a file or making an HTTP request, don't block the execution of other operations. Instead of waiting for an operation to complete, Node.js registers a callback and continues the execution, coming back when the operation is done and the callback is ready to be invoked.
