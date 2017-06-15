class Coder {
    public static SERVER = 'http://localhost:5000';
    public static API_LOGIN = Coder.SERVER + '/api/login';
    public static API_REGISTER = Coder.SERVER + '/api/user';
    public static API_ROOM = Coder.SERVER + '/api/room';


    public static SCENE_TYPE = {
        LOGIN: 'Login',
        REGISTER: 'Register',
        HALL: 'Hall', 
        ROOM: 'Room',
        PLAY: 'Play'
    }
}