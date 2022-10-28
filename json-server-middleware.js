/* eslint-disable no-undef */
module.exports = (req, res, next) => {
    setTimeout(() => next(), parseInt(Math.random() * 1000));
}