
exports.get404page = (req, res, next) => {
    res.render('404', {pageTitle : 'page Not found'});
}