const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async(req, res) => {
    let page = req.query.page
    let articles = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()
    res.render(`home/default`, {
            articles: articles,
            pages: articles.pages,
            page: articles.page,
        })
        // res.send(articles.pages)
}