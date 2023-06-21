import * as usersDao from "./users-dao.js";

var currentUserVar;

const AuthController = (app) => {

    app.post("/api/auth/register", register);
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.put("/api/auth/:uid", update);
    app.get("/api/auth", getUsers)
};

const getUsers = async (req, res) => {
    res.json(usersDao.findAllUsers());
}

const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
        res.sendStatus(403);
        return;
    }
    const newUser = await userDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
};


const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
};

const profile = async (req, res) => {
    // const currentUser = req.session["currentUser"];
    const currentUser = currentUserVar
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
    res.json(currentUser);
};
const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

const update = (req, res) => {

    const userId = req.params.uid;
    const updates = req.body;
    var user = usersDao.findUserById(userId);

    if (user) {
        user = { ...user, ...updates };
        usersDao.updateUser(userId, user);
    }
    res.sendStatus(200);
};

export default AuthController;