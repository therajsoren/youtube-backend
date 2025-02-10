// An asyncHandler is a function that handles asynchronous route handlers in Express.js.
// It ensures that any errors thrown within asynchronous functions are caught and forwarded to the error handling middleware.

// {asyncHandler ensures krte hai ki kuch asynchronous functions me kuch errors hota ha tu usko caught kro aur forward kro error handler middleware ko}
// { simple term me bole tu ye error ko point out krta hai aur resolve krne ke liye use error handler middleware ko pass krta hai}

//  Async utility to handle asynchronous Express route handlers using Promises and async/await

// https://gist.github.com/ZeeshanMukhtar1/ae9e046241a29f4d2d2ed86a5df94ccc

// 1 through promises
const asyncHandler = (requestHandler) => {
    return(req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err));
    }
};

// 2 through try/catch { async / awai}

// const asyncHandler = (fn) => (req,res,next) => {
//     try {
//         return fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//         })
//     }
// }
export {asyncHandler} 