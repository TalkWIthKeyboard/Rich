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

    public static CARD_INFO = {
        Laboratory: {
            name: 'Laboratory',
            cn_name: '实验室',
            color: 'purple',
            cost: 5,
            num: 1,
            skill_info: '你可以从手牌中丢弃一张地区牌来获得1枚金币'
        },
        Library: {
            name: 'library',
            cn_name: '图书馆',
            color: 'purple',
            cost: 6,
            num: 1,
            skill_info: '当你选择抽地区牌作为一次行动时你可以保留2张'
        },
        Fortress: {
            name: 'Fortress',
            cn_name: '要塞',
            color: 'purple',
            cost: 3,
            num: 2,
            skill_info: '要塞不会被军阀摧毁'
        },
        University: {
            name: 'University',
            cn_name: '大学',
            color: 'purple',
            cost: 8,
            num: 1,
            skill_info: '建造此地区需要6枚金币，但是在计分时值8分'
        },
        GhostTown: {
            name: 'GhostTown',
            cn_name: '鬼城',
            color: 'purple',
            cost: 2,
            num: 1,
            skill_info: '当计分时，鬼城可被视为任一个你指定的颜色，当鬼城是你最后一轮建造的地区时，不可使用它的能力（仍然是紫色）'
        },
        Smithy: {
            name: 'Smithy',
            cn_name: '铁匠铺',
            color: 'purple',
            cost: 5,
            num: 1,
            skill_info: '你可以付2枚金币来抽3张地区牌'
        },
        Observatory: {
            name: 'Observatory',
            cn_name: '天文台',
            color: 'purple',
            cost: 5,
            num: 1,
            skill_info: '当你选抽地区牌作为一次行动时，可抽3张地区牌并选1张加到手牌中，剩余2张放回牌堆最下层'
        },
        MagicSchool: {
            name: 'MagicSchool',
            cn_name: '魔法学校',
            color: 'purple',
            cost: 6,
            num: 1,
            skill_info: '当你获得收入时，魔法学校可被视为任何一种指定的颜色，例如如果你是国王，你可以把它视为一个贵族（黄色）地区'
        },
        Cemetery: {
            name: 'Cemetery',
            cn_name: '坟地',
            color: 'purple',
            cost: 5,
            num: 1,
            skill_info: '要塞不会被军阀摧毁每当军阀摧毁一个地区,你可付出1枚金币给银行,将此地区牌加入手牌中,如果你是军阀就不可使用它的能力'
        },
        Wall: {
            name: 'Wall',
            cn_name: '城墙',
            color: 'purple',
            cost: 6,
            num: 1,
            skill_info: '当军阀要摧毁你的其他地区时需要多付出1枚金币'
        },
        DragonDoor: {
            name: 'DragonDoor',
            cn_name: '龙门',
            color: 'purple',
            cost: 8,
            num: 1,
            skill_info: '建造此地区需要6枚金币，但是在计分时值8分'
        },
        Harbour: {
            name: 'Harbour',
            cn_name: '海港',
            color: 'green',
            cost: 4,
            num: 3,
            skill_info: null
        },
        Pub: {
            name: 'Pub',
            cn_name: '酒馆',
            color: 'green',
            cost: 1,
            num: 5,
            skill_info: null
        },
        Market: {
            name: 'Market',
            cn_name: '市场',
            color: 'green',
            cost: 2,
            num: 5,
            skill_info: null
        },
        TradingPost: {
            name: 'TradingPost',
            cn_name: '贸易站',
            color: 'green',
            cost: 2,
            num: 2,
            skill_info: null
        },
        Wharf: {
            name: 'Wharf',
            cn_name: '码头',
            color: 'green',
            cost: 3,
            num: 3,
            skill_info: null
        },
        CityHall: {
            name: 'CityHall',
            cn_name: '市政厅',
            color: 'green',
            cost: 5,
            num: 2,
            skill_info: null
        },
        Church: {
            name: 'Church',
            cn_name: '教堂',
            color: 'blue',
            cost: 2,
            num: 3,
            skill_info: null
        },
        Temple: {
            name: 'Temple',
            cn_name: '神殿',
            color: 'blue',
            cost: 1,
            num: 3,
            skill_info: null
        },
        Cathedral: {
            name: 'Cathedral',
            cn_name: '大教堂',
            color: 'blue',
            cost: 5,
            num: 2,
            skill_info: null
        },
        Monastery: {
            name: 'Monastery',
            cn_name: '修道院',
            color: 'blue',
            cost: 3,
            num: 3,
            skill_info: null
        },
        Manor: {
            name: 'Manor',
            cn_name: '庄园',
            color: 'blue',
            cost: 3,
            num: 4,
            skill_info: null
        },
        Palace: {
            name: 'Palace',
            cn_name: '皇宫',
            color: 'yellow',
            cost: 5,
            num: 3,
            skill_info: null
        },
        Castle: {
            name: 'Castle',
            cn_name: '城堡',
            color: 'yellow',
            cost: 4,
            num: 4,
            skill_info: null
        },
        LookoutTower: {
            name: 'LookoutTower',
            cn_name: '瞭望台',
            color: 'red',
            cost: 1,
            num: 3,
            skill_info: null
        },
        Prison: {
            name: 'Prison',
            cn_name: '监狱',
            color: 'red',
            cost: 2,
            num: 3,
            skill_info: null
        },
        Battlefield: {
            name: 'Battlefield',
            cn_name: '战场',
            color: 'red',
            cost: 3,
            num: 3,
            skill_info: null
        },
        Bastion: {
            name: 'Bastion',
            cn_name: '堡垒',
            color: 'red',
            cost: 5,
            num: 2,
            skill_info: null
        }
    }

    public static ROLE_TYPE = {
        ASSASSIN: {
           name: 'Assassin',
           cn_name: '刺客',
           path: '',
           number: 1,
           skill_info: '说出一位你想暗杀的角色（该角色必须保持沉默），该角色不可翻开角色牌并直接失去他的回合。'
        },
        THIEF: {
            name: 'Thief',
            cn_name: '盗贼',
            path: '',
            number: 2,
            skill_info: '说出一位你想偷取的角色，该角色拥有者进行回合前，取走他所有的金币（不可偷取刺客以及被暗杀的角色）'
        },
        MAGICIAN: {
            name: 'Magician',
            cn_name: '魔法师',
            path: '',
            number: 3,
            skill_info: '回合内可执行下列两种能力之一：1.将你的手牌与某为玩家交换；2.弃手中任意张数的地区牌至牌堆底并从牌堆上方拿回相同张数地区牌'
        },
        KING: {
            name: 'King',
            cn_name: '国王',
            path: '',
            number: 4,
            skill_info: '每有一个贵族（黄色）地区便可以获得1枚金币。当国王被叫到时，拥有国王的玩家立刻获得皇冠。'
        },
        BISHOP: {
            name: 'Bishop',
            cn_name: '主教',
            path: '',
            number: 5,
            skill_info: '每有一个宗教（蓝色）地区便可以获得1枚金币。你的地区不会被军阀摧毁'
        },
        BUSINESSMAN: {
            name: 'Businessman',
            cn_name: '商人',
            path: '',
            number: 6,
            skill_info: '每有一个商业（绿色）地区便可以获得1枚金币。在你执行一次行动后可以额外获得1枚金币。'
        },
        ARCHITECT: {
            name: 'Architect',
            cn_name: '建筑师',
            path: '',
            number: 7,
            skill_info: '在执行一次行动之后可以额外抽取2张地区牌加到你的手牌中。在你的回合最多可以建造3个地区'
        },
        WARLORD: {
            name: 'Warlord',
            cn_name: '军阀',
            path: '',
            number: 8,
            skill_info: '每有一个军事（红色）地区便可以获得1枚金币。回合结束时，你可以支付某一地区的建造费用减少1枚金币来摧毁它。'
        }
    }
}