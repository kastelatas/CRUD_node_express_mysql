const {Images, Profile, Blog} = require('../database')


exports.index = function (req, res) {
    Blog.findAll({
        order: [
            ['id', 'DESC'],
        ],
    }).then(posts => {
        res.render('index', {posts: posts})
    })
};

exports.single = (req, res) => {
    if (!req.params.id) return res.render('post', {message: 'NO ID'})
    Blog.findOne({
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.render('post', {post: post})
    })
}

exports.add_postPage = (req, res) => {
    res.render('add-post')
}

exports.updateGetPost = async (req, res) => {
    await Blog.findOne({
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.render('edit-post', {post: post})
    })
}

exports.updatePost = async (req, res) => {
    const {title, content} = req.body;
    console.log( req.body)
    await Blog.update({title,content }, {
        where: {
            id: req.params.id
        }
    })
    res.redirect('/')
}

exports.add_post = async (req, res) => {
    const {title, content} = req.body;

    await Blog.create({
        title: title,
        content: content,
    })

    res.redirect('/', )
}

exports.deletePost = async (req, res) => {
    const {id} = req.params
    console.log(id)

    await Blog.destroy({
        where: {
            id: id
        }
    }).then(post => {
        console.log(post)
    })

    res.redirect('/')
}




exports.upload = (req, res, next) => {
    let filedata = req.files;
    filedata.forEach(item => {
        Images.create({
            path: item.path,
            usersId: 4
        }).then(succ => {
            // console.log(succ)
        })
    })
    if (!filedata) res.send("ERROR")

    else {
        res.send("File upload")
    }
}

exports.profile = async (req, res) => {
    await Profile.create({
        title: "Title 2",
        usersId: 4
    }).then(suc => {
        res.json(suc)
    })
}