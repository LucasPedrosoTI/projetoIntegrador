module.exports = {
    index: (req, res, next) => res.render('index'),

    main: (req, res, next) => {
        res.render('main');
    },

    login: (req, res, next) => {
        res.render('login');
    },

    cadastroCpf: (req, res, next) => {
        res.render('cadastrocpf');
    },
    cadastroCnpj: (req, res, next) => {
        res.render('cadastrocnpj');
    }

}