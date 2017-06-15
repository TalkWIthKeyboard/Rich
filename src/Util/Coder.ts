class Coder {
    public static SERVER = 'http://localhost:5000';
    public static API_LOGIN = Coder.SERVER + '/api/login';
    public static API_REGISTER = '/api/user';
    public static API_ROOM = '/api/room';


    public static SCENE_TYPE = {
        LOGIN: 'Login',
        REGISTER: 'Register',
        HALL: 'Hall', 
        ROOM: 'Room',
        PLAY: 'Play'
    }


    public static ROLE_TYPE = {
        ASSASSIN: {
           name: 'Assassin',
           cn_name: '刺客',
           path: '',
           number: 1 
        },
        THIEF: {
            name: 'Thief',
            cn_name: '盗贼',
            path: '',
            number: 2
        },
        MAGICIAN: {
            name: 'Magician',
            cn_name: '魔法师',
            path: '',
            number: 3
        },
        KING: {
            name: 'King',
            cn_name: '国王',
            path: '',
            number: 4
        },
        BISHOP: {
            name: 'Bishop',
            cn_name: '主教',
            path: '',
            number: 5
        },
        BUSINESSMAN: {
            name: 'Businessman',
            cn_name: '商人',
            path: '',
            number: 6
        },
        ARCHITECT: {
            name: 'Architect',
            cn_name: '建筑师',
            path: '',
            number: 7
        },
        WARLORD: {
            name: 'Warlord',
            cn_name: '军阀',
            path: '',
            number: 8
        }

    }
}