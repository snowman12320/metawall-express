// 未定義錯誤
const handleErrorAsync = func => (req, res, next) => { // callback
    func(req, res, next)
        .catch(error => next(error));
};

module.exports = handleErrorAsync;