// 未定義錯誤

//* callback function，接收 req, res, next，並回傳一個 Promise 物件，若發生錯誤，則呼叫 next() 並傳入錯誤物件，否則呼叫 next()。
//* func 先將async function(req, res, next)包裝成一個 Promise 物件，再使用.catch()捕捉錯誤的middleware。
//* 這樣就不用在每個 async function 裡面都寫 try catch 了。
//! 這裡的func是一個async function （func 自定義名稱，在上一層傳入async），所以可以用.catch()來捕捉錯誤（也就是透過promise鏈式的.catch）

const handleErrorAsync = func => (req, res, next) => { 
    func(req, res, next)
        .catch(error => next(error));
};

module.exports = handleErrorAsync;