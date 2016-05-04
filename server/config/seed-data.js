/*
* @Author: yglin
* @Date:   2016-04-25 14:35:53
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 13:32:02
*/

'use strict';
var _ = require('lodash');

var data = module.exports = {
    mainDB: {},
    channelDBs: {}
};

data.mainDB = {
    users: [
        {
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        }, 
        {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
        }
    ],
    channels: [
        {
            id: 'nuclear-test-field',
            title: '核子試爆場',
            description: '測試新功能，以及給使用者隨便亂搞，資料不定時會清除',
            'logo-url': 'https://i.warosu.org/data/sci/img/0073/32/1434439598515.jpg',
            'categories': {
                1: {
                    title: 'sweat',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/sweat.png'
                    }
                },
                2: {
                    title: '哭哭',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/cry.png'
                    }
                },
                3: {
                    title: 'love',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/love.png'
                    }
                },
                4: {
                    title: 'startle',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/startle.png'
                    }
                },
                5: {
                    title: '龜藍波火',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/fire.png'
                    }
                }
            },
            owner_id: 1,
            state: 'public'
        }
    ],
    things: [
        {
            name: 'Development Tools',
            info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
                         'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
                         'Stylus, Sass, and Less.'
        }, {
            name: 'Server and Client integration',
            info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
                         'AngularJS, and Node.'
        }, {
            name: 'Smart Build System',
            info: 'Build system ignores `spec` files, allowing you to keep ' +
                         'tests alongside code. Automatic injection of scripts and ' +
                         'styles into your index.html'
        }, {
            name: 'Modular Structure',
            info: 'Best practice client and server structures allow for more ' +
                         'code reusability and maximum scalability'
        }, {
            name: 'Optimized Build',
            info: 'Build process packs up your templates as a single JavaScript ' +
                         'payload, minifies your scripts/css/images, and rewrites asset ' +
                         'names for caching.'
        }, {
            name: 'Deployment Ready',
            info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
                         'and openshift subgenerators'
        }
    ]
}

data.mainDB.users = data.mainDB.users.concat(genUsers({count: 30}));

data.channelDBs['nuclear-test-field'] = {
    post: genPosts(data.mainDB.channels[0], {count: 100}),
    comment: genComment(data.mainDB.channels[0], {count: 100, post_id_range: [1, 100]})
}

function genUsers(options) {
    options = typeof options === 'undefined' ? {} : options;
    options.count = typeof options.count === 'undefined' ? 10 : options.count;
    var count = Math.min(options.count, 100);
    var users = [];
    var _fakeUsers = fakeUsers();
    for (var i = 0; i < count; i++) {
        var user = {};
        var fakeUser = _fakeUsers[i];
        user.provider = 'local';
        user.name = fakeUser.name.first + ' ' + fakeUser.name.last;
        user.email = fakeUser.email;
        user.password = 'ygggyy';
        users.push(user);
    }
    return users;
}

function genPosts(channel, options) {
    options = typeof options === 'undefined' ? {} : options;
    options.count = typeof options.count === 'undefined' ? 10 : options.count;
    var count = Math.min(options.count, 100);
    var categoryIDs = Object.keys(channel.categories);
    var thumbnails = fakeThumbnails();
    var titles = fakeTitles();
    var descriptions = fakeDescriptions();
    var _fakeUsers = fakeUsers();
    var posts = [];

    var radius = 0.0;
    var radius_increment = 2.0 / count;
    var angle = 0.0;
    var angle_increment = Math.PI / 2;
    for (var i = 0; i < count; i++) {
        radius += radius_increment;
        angle += angle_increment;
        angle_increment *= 0.9;
        var post = {};
        post.title = _.sample(titles);
        post.content = _.sample(descriptions);
        post.latitude = 23.973875 + radius * Math.sin(angle);
        post.longitude = 120.982024 + radius * Math.cos(angle);
        post.author = _.sample(_fakeUsers).email;
        post.owner_id = 1;
        post.createdAt = pickDateInTurn();
        if(Math.random() > 0.2){
            post.category = _.sample(categoryIDs);
        }
        if(Math.random() > 0.2){
            post.thumbnail = _.sample(thumbnails);
        }
        posts.push(post);
    };
    return posts;
}

function genComment(channel, options) {
    options = typeof options === 'undefined' ? {} : options;
    options.count = typeof options.count === 'undefined' ? 10 : options.count;
    options.post_id_range = typeof options.post_id_range === 'undefined' ? [1, 100] : options.post_id_range;
    var count = Math.min(options.count, 100);
    var descriptions = fakeDescriptions();
    var _fakeUsers = fakeUsers();
    var comments = [];
    for (var i = 0; i < count; i++) {
        var comment = {};
        comment.content = _.sample(descriptions);
        comment.author = _.sample(_fakeUsers).email;
        comment.post_id = _.random(options.post_id_range[0], options.post_id_range[1]);
        comments.push(comment);
    }
    return comments    
}

function fakeTitles(count) {
    return ["天哪，可是已經晚了……請你以後不要在我面前說英文了，OK？","呼嘯過，然後這麼說：「那未知的擦身而過，天空要狩獵海洋。","第2，又，當然有不方便的地方，地方制度法是相對的特別法耶！","3，《傳產》華航攜手淡大，鋼琴16隻手聯彈，養雞場淪陷！","請允許我，我什麼都不要，我希望老的時候可以牽著妳的手散步。","3，2，中和某國中，臺中好好玩中市推出全新智慧型旅遊平台。","生，年輕的時候，懷才就像懷孕，錢對你來說真的就那麼重要嗎？","最痛的紀念品逆風的方向，cha你在泛舟，改變既有的模式！","!，阿....不會吧???iPad，傳陳冠希示愛，比較對？","做戰略最忌諱的是面面俱到，什麼是團隊呢？","還不賴，還不賴，還不賴，還不賴，還不賴？","看是要停止，標準普爾把我們財政展望，妳也要讓我說明一下啊！","秋奈婆婆，真是太好了對吧，本官正在做新發售的MG吉翁是也。","人生中最重要的問題是：你有沒有讓這個世界變得比你出生時更好？","乾眼症嚴重可致失明，6旬病翁撞火車亡，低級趣味難笑。","Pro，Mark，張德正恐嚇案開庭前妻庭中淚訴：放過我吧！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","基本面強勁，中國遊客巴基斯坦遭綁架塔利班一分支宣布負責。","一封簡訊，早晨七點，买好咖啡，一冰一热，你们就没有糖浆吗？","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","不運動，台北，AV女優大學開講，壽司和蒼井空的關連在哪裡？","創業要找最適合的人，也要注重過程，就怕不在社會上讀書。","参和，重點是我現在這麼累要是抽下去就ㄎㄧㄤ掉，可樂，不賴！","現在我不敢肯定，那麼餘下四分之三的時光請讓我來守護你好嗎？","oh，快活的魂魄，就深藏在心我好想你，安睡在天地的大房間。","奉行正朔，雖亦有人反對，一到過年，我的意見，老不死的混蛋！","感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","羅宋湯配肉丸我站在終點的面前，我都要給你一個讚殊途同歸？","還不賴，還不賴，還不賴。","已習慣忽略，我不怕千萬人阻擋，你會在哪裡，改變既有的模式！","感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","還不賴，還不賴，還不賴，還不賴！","感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","我什麼都不要，我誰都不要，我願用一萬次去換與你的相遇。","感謝上師，感謝上師，感謝上師，讚嘆師父！","愛情，退一步海闊天空，女孩富著養，不吃飽哪有力氣減肥啊？","喝了杯咖啡，一封簡訊，新機車！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","我們有揭露，講得不對，至於他們與哪個部會相關，哪一樣？","等一會，翌日，愈著急愈覺得金錢的寶貴，只是望面的所向而行。","多一點委屈，現在你需要踏踏實實，什麼是團隊呢？","我的小彼得，扮一個漁翁，花草的顏色與香息裡尋得？","晚餐時，但長期卻會讓你窒息，你要我怎樣去改變別的人的人生？","如果是真的，那麼餘下四分之三的時光請讓我來守護你好嗎？","其次，我說我們有這麼多的席次，我們絕對不會辜負你的期待。","感謝上師，感謝上師，讚嘆師父！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","沒有權，懷才就像懷孕，一旦累死了，在哪裡跌倒就在哪裡躺下。","蘋果日報，好心乘客讓出肩膀，.......他就是林書豪！","還不賴，還不賴，還不賴！","），好啊，向面的所向，和純真的孩童們，是怎樣生竟不如其死？","愛情，女人之美，你們快點出名吧，沒有權，男人之美，不容易。","好，一樣呻吟於不幸的人們，總在等待過年的快樂，險些兒跌倒。","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","但無論如何，有孩子，他拍拍我的背，因為他們的書實在太重了！","蘋果日報，調查顯示多數民眾希望停建核四，你們還記得她嗎？","雨真的很大，裸少年抓青蛙雕像被嫌礙眼，這不是教學，比較對？","還不賴，還不賴，還不賴！","最近的天氣教會我，就好像咖啡，一杯咖啡不夠喝，無瑕。","在遜中又流露了點，這幾片如何，尾巴？","強盛到肉體的增長，接著又說，我們婦女竟是消遣品，是妄是愚？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","有的人，他的伴侶，禮這一字是很可利用的東西，這有什麼含義？","感謝上師，感謝上師，感謝上師，感謝上師，…","濛迷地濃結起來，使人們沒有年歲的感覺，就有這樣的不同？","太好笑了，有偽善者的味道喔。","還不賴，還不賴，還不賴，還不賴！","過了些時，這一句千古名言，故過年的規定遂各不同，就和解去。","什麼都別說了，那麼餘下四分之三的時光請讓我來守護你好嗎？","而是要跟未來，關係特別不可靠，永遠要把對手想得非常強大，…","I，叔叔、阿姨，救救長毛驢，荒唐警瘋SM，大家都沒事吧！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","我想早戀，沒有錢，想起來還是幼兒園比較好混！","生性如此，這是經過科學的證明，他就發出歡喜的呼喊，丙問。","希望保持距離，我爸在也在醫科教書，並真正開始改善日常情況。","我和我的倔強長大後發現，撇開日子的奔忙，改變既有的模式！","那麼餘下四分之三的時光請讓我來守護你好嗎？","任誰都想侵略看看的行星，很好，價格，那是他製造出來的模型。","換，水餃25顆、川燙地瓜葉、蝦仁烘蛋、酸辣湯，还是有点晕！","雪西裡與普陀山，她的忍耐，他們的獨子，我只是悵惘我只能問。","我們尊重您的權利，國會監督是指國會通過就過關生效，啦！","這點，因為人家有可能會來挖角，可是我尊重主張台獨的朋友啊！","網路封鎖失靈，陶冬：希債稍緩，美就業成長驚豔失業率回升。","第一次喝就愛上那個味，幾年來，灌了果汁和咖啡，最是寂寞。","感謝上師，感謝上師，感謝上師，感謝上師，感謝師父。","我什麼都不要，跟我生可愛的孩子吧！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","有人說，然而被騷擾的不悅感與日俱增，NBA總裁不邀林書豪。","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","愛你，認識你，比如去一果子園，只許你，我只是悵惘我只能問。","水手官網專訪，紙張可以丟了！","呂明賜帶中華隊，中和某國中，學運害今年取消夫妻懲罰稅沒了？","理念很難考量，現在你需要踏踏實實，你的路可能就走偏掉。","如果是真的，什麼都別說了，我什麼都不要，嫁給我就對了！","我不提，我可能瞭解高雄市，如果加上特別預算，我能夠阻止嗎？","猶不能放他們一刻空閒，現在不是糴不到半斗米？","你應該做的不是去挑戰它，品質不僅僅是團隊，什麼是團隊呢？","我們也樂得輕鬆，別逗了啦，默示錄擊，看起來感覺挺好的說。"];
}

function fakeDescriptions() {
    return ["沒有突破，做小了，永遠要把對手想得非常強大，然後再去找相關的技術解決方案，做生意不能憑關係，承擔責任的時候，但它只是一環，如果你看了很多書，小公司的戰略就是兩個詞：活下來，最核心的問題是根據市場去製定你的產品，不管做任何事，不能拷貝我的苦難，只有在逆境的時候才是真正的領導力。","調查顯示多數民眾希望停建核四，地震，網友們，若不在意牠是老鼠，為了65萬考生的人生幸福，你們罵我腦殘，媽媽和姊姊有被嚇到，超人車窗外問路短片，嗯，陳奕迅搓胸何韻詩，今晚娛樂ONLINE和我們一起搶先看吧。","80年代的人不要跟70年代，80年代的人不要跟70年代，別人一定會聽你，包括你請來MBA，而是自己太貪，年代的人還需要摔打，但也不是不可能，每次失敗好好接受教訓，創業時期千萬不要找明星團隊，什麼是團隊呢？","我誰都不要，請允許我，如果是真的，但我可以肯定地告訴你，請允許我，ㄟ那就結婚吧我沒有妳會死，ㄟ那就結婚吧我沒有妳會死，在我消失在這個世界之前，現在已經過了人生的四分之一，現在已經過了人生的四分之一，前世的五百次回眸，現在我不敢肯定，那麼餘下四分之三的時光請讓我來守護你好嗎？","是的，你会如此处理？","與自然同在一個脈搏裡跳動，裝一個獵戶；你再不必提心整理你的領結，與你一撮的遺灰，不如意的人生，你已經去了不再回來，這樣的玩頂好是不要約伴，我們見小孩子在草裡在沙堆裡在淺水裡打滾作樂，又教命運無情的腳根踏倒，連著一息滋潤的水氣，你也不必帶書。","如果是真的，但我可以肯定地告訴你，前世的五百次回眸，如果是真的，如果是真的，我什麼都不要，前世的五百次回眸，你是世界上最幸福的人，前世的五百次回眸，請允許我，照顧你生命中的每一天，我誰都不要，如果是真的，請允許我，在我消失在這個世界之前，我什麼都不要，讓我的存在帶給你快樂。","可是已經晚了……請你以後不要在我面前說英文了，沒有權，不然不曉得奮鬥，珍惜生活上帝還讓你活著，樹不要皮，沒有權，住你的房，睡你的老公，可是已經晚了……請你以後不要在我面前說英文了，容易；生活，年輕的時候，那麼你至少得吃一對兒鯨魚……我身邊的朋友們啊，退一步海闊天空，問題是沒錢！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴。","羅宋湯配肉丸我站在終點的面前，最怕突然，羅宋湯配肉丸我站在終點的面前，一起留念擁有再多也會太難耐擁有再多也會太難耐散場，闖入無人婚紗店，看到了我的翅膀，我也不能原諒當，我和我的倔強不能在shopping時候想你在路上會­遇見怎樣的穹蒼？","念了十幾年書，前途一片光明，.人怕出名豬怕壯，.人怕出名豬怕壯，樹不要皮，但又找不到出路．如果多吃魚可以補腦讓人變聰明的話，再不對你好點，睡你的老公，珍惜生活上帝還讓你活著，不然不曉得奮鬥，喝醉了我誰也不服,我就扶牆!我就像一隻趴在玻璃上的蒼蠅，講了三個多小時了一分錢都不降？","最難堪是逐步相追的嘲諷，你一個人漫遊的時候，你愛好音樂的故事，日子雖短，這才覺著父性的愛像泉眼似的在性靈裏汩汩的流出：只可惜是遲了，因為前途還是不減啟程時的渺茫，打攪你的清聽！","許是怨，極端的自私，那是最危險最專制不過的旅伴，何嘗不赤心的愛我；但他們的愛卻正是造成我痛苦的原因；我自己也何嘗不篤愛我的親親，她們也使我，他就捲了起來，不止是苦，我們真的羡慕，那太可愛，我說我要借這機會稍稍爬梳我年來的鬱積；但那也不見得容易：要說的話彷彿就在口邊，一起安眠。","發高燒了，耳朵，兩回構成，要上了嗎，大家都靜止不動，有悲傷的故事，不會錯，快樂大結局，吸血鬼女王，這是仲夏烈火，Keroro，你知道嗎，我去救妳了，另外，跟我來吧，妳是在問我嗎，有什麼藉口，給我出來，隨便剪一根吧，遭遇暴風雪時，現在要來？","要以慰安他倆途中的寂寞，看見映在地上自己的影，體軀支持不住了，就一味地吶喊著，說是沒有法子的事，在這次血祭壇上，依然向著夢之國的路，將腦髓裡驅逐，又復濃濃密密屯集起來，愈會賺錢，不知橫亙到何處。","愛你，陽光正好暖和，但你應得帶書，窮困時不窮困，因為道旁樹木的陰影在他們紆徐的婆娑裡暗示你舞蹈的快樂；你也會得信口的歌唱，單是活著的快樂是怎樣的，他的恣態是自然的，我敢相信，講，決意不讓無意味的鑼鼓，因為在幾分鐘內我們已經是很好的朋友，那是最危險最專制不過的旅伴，打攪你的清聽！","譬如，有好的，我們是對立法院負責，如果沒有烘乾的設備，我們為什麼選擇修總統副總統選舉罷免法，在軍營是否投票這部分，關於農業的部分，委員也知道這牽涉專業及很多名詞和內容，還有範疇更廣未來應給付而未給付的，這一句話讓人聽了會覺得不是那麼有同理心，經立法院決議，會針對那部分表示抗議！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝師父。","現在我不敢肯定，但我可以肯定地告訴你，我誰都不要，我只要妳。","你不要規定我們幾月幾日……你不是攀岩選手，特別請我的同事去購買泡麵，因為我想看看他們是否有自覺心，如果沒有這樣的危險，競爭的國家中，這是還不錯的語句，我的態度很誠懇，還往北到左營，我到立法院備詢能穿襯衫嗎？","經過幾許途程，也是不受後母教訓，說我乖巧識禮，甲說，以為是他的同伴跟在後頭，團團地坐著，我記得還似昨天，特別為他倆合奏著進行曲；只有這樂聲在這黑暗中歌唱著，是怎樣生竟不如其死？","但我可以肯定地告訴你，什麼都別說了，前世的五百次回眸，照顧你生命中的每一天，你是世界上最幸福的人，如果是真的，什麼都別說了，在我消失在這個世界之前，我們一輩子都來談戀愛吧！","劇場無聊戲碼偌大的房，經過了冷言熱捧，最美殘缺一步步走過，你卻佔據了每一條街皮膚像冰雪將融，眼神越是發光我，一條孤單的走廊，你們怎麼分手了但是在泰國我ok月光找到了海­洋月光找到了海­洋月光找到了海­洋烏雲的背後幻­生出了太陽烏雲的背後幻­生出了太陽你的心，改變既有的模式！","請妳諒解，你說什麼，129，當然要，別輸了，我們投注的心血，地球首見，你們在幹嘛，Nyororo烘乾衣服，好好吃喔，數量那麼多，第四個項目，日向同學要走了！","三星很知名的一點是每年都會出現在前十名的商學院，我希望，我在2011年春天被調去上海前曾在這裡住過一年，聽著，我們為什麼念醫科？","笑掉了齒牙，是一曲極盡悲壯的進行曲，街上看鬧熱的人，忽然地顛蹶，現在只有覺悟，聽說路關鐘鼓，金錢的問題，這些談論的人，可能成功嗎？","AV版《神鬼奇航》，這是我們地球曾經有過的瞬間啊......水利署：北市、新北市一級淹水警戒。","而且炒高房地產造成不正常的波動，我非常欽佩田委員對小兒科醫師缺乏的重視，發現有這種產品出來，尤其是永久屋的選擇、有關地點及相關辦法，這次總統特邀佳賓，今天早上原能會才報告，而楊署長志良的使命感很強，我沒有說過委員方才說的話，該去的我也會去啊！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","可是歹徒己經認得我們了，拜託您了，妳怎麼了，什麼，入侵者，講到火鍋，這次的比賽，我想起來了，再不行的話，最近突然變老，報告，現在順著風，我們是朋友啊，兒子啊，你們快點站住啦。","辱檢沒屁眼，其實我覺得我很強壯，好心乘客讓出肩膀，亞職熱身賽，亞職熱身賽，65萬人大考，有人說，法拉利時速300km撞毀，AV女優大學開講，這不是教學，終身成就獎漏掉鳳飛飛，當絕大多數國家主人主張停建核四，不只是上班族女孩，鋼鐵車??3人清理化糞池，你/妳們可以接受這個數據嗎？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","結果被數落了一下，Sake鍋、水果魚、蒸鮮蝦、辣椒螃蟹都不賴，一是中學的時候背著家長半夜爬起來畫畫碼字趕作業，喝喝咖啡，每天都是牙痛鬧鐘吵醒我，口渴時想喝的應該是水，鍋子有破洞嗎？","亞洲父母總是說要他們想要移民到美國或加拿大，我整個晚上都會聽你說話，他們的兒子實現了99％台灣父母的夢想，但是，沒錯！","微軟發表12吋高效能Surface，網路封鎖失靈，LG，賞櫻瘋，菊分身乏術，8位老師完成創舉，北捷招考筆試，烏坎村選舉落幕，《藝術家》向好萊塢致敬，國銀跨國債權，金正恩:如敵人膽敢絲毫侵犯朝鮮領海，日職／林威助敲2安，in，歐巴馬Google+，林來瘋看不膩！","手抖，焉知非福，Hadlousymovie(fistofdragon)+2hoursThaimassage+Dinnercrayfish，再花₩900買麵包，520這種日子，早上喝著咖啡，最近的天氣教會我，就好像咖啡，反正他喜歡，像阿不思一樣不喝咖啡，然后发现忘记带USB线了。","男人之美，就會有別的女人花你的錢，但又找不到出路．如果多吃魚可以補腦讓人變聰明的話，睡你的老公，沒有錢，沒有錢，你們快點出名吧，然後選中一張百元大鈔，就會有別的女人花你的錢，沒有錢，我想早戀，樹不要皮，.人怕出名豬怕壯，年輕的時候，工作，我的衣服又瘦了！","換，OnshowAD'sArtPS：採用高通芯片的設備在這裡不作推薦，塞翁失馬，別人可以回答雀巢，可以回答卡布奇諾，另一本都市的書，或者是说我没有闻过花香這一兩個月，尷尬啊拓海家聊八卦，塞翁失馬，本來雄心勃勃躊躇滿志，刻著生命的線用它下棋吧；吃掉我再換吃掉你不正是更好的世界吧？","右邊用咖啡機煮了檸檬紅茶，要好好記得，0522試賣活動開跑，昨天煮水餃，喝喝咖啡，早上花₩2750買咖啡，加太多就膩，灌了果汁和咖啡，刻著生命的線用它下棋吧；吃掉我再換吃掉你不正是更好的世界吧？","餵毒燒陰毛逼少女賣淫，天哪.........!!!，嘖嘖~，!，無誤！","神馬狀況，還是開一間有氣氛的咖啡店，一早喝了两大杯咖啡，Hadlousymovie(fistofdragon)+2hoursThaimassage+Dinnercrayfish，現任雲嘉南濱海國家風景區管理處長張政源接任市府交通局長，大概今天咖啡是太浓了……我看等下要泡咖啡了。","短，呂明賜帶中華隊，亞當山德勒破紀錄，東京馬拉松，流感病毒攻心，最佳外語片，遍地烽火，鄧志偉揮巨炮，短，菊分身乏術，聯想控股董事長柳傳志，火場濃煙密布，17號果然殺楊玉明奪MVP，怕曬愛喝咖啡，3，預拌車偷捲電纜，水手官網專訪，在春風裏失去一代散文大師，菊分身乏術，養雞場淪陷！","正是因為有這麼多台灣人不知道或是不想要接受，在過去10年，探索其他國際市場，全都是在工程方面競爭，許多方面來說，當我們開始走向外灘，我們走到街上時，沒有什麼是永恆的，新創公司比在畢業後單單加入Dell或惠普好多了，我們為什麼念醫科？","老闆，喝醉了我誰也不服,我就扶牆!我就像一隻趴在玻璃上的蒼蠅，我們常常衝著鏡子做鬼臉，珍惜生活上帝還讓你活著，天哪，念了十幾年書，愛情就像二個拉著橡皮筋的人，年輕的時候，一旦累死了，老闆，生，我希望有一天能用鼠標雙擊我的錢包，懷才就像懷孕，如果有錢也是一種錯，就怕豬一樣的隊友。","全民大追緝，近兩年最大，華為發布Ascend，主人惡作劇，全民大追緝，入圍11金酸莓，HBL》16分大勝治平淡商奪季。","現在我不敢肯定，在我消失在這個世界之前，ㄟ那就結婚吧我沒有妳會死，你是世界上最幸福的人，才換來今生的擦肩而過。","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","我在蘆洲，更適合飛翔，突然翻滾絞痛著不平息，遠離了世界塵垢，突然鋒利的回憶，誰會記得起我那天當生存是規則不是你的選擇當生存是規則，控制不住的狂放，每天重複在同個地點，隨白髮老去若世界說穿了只剩下噓寒問暖若世界說穿了只剩下春去秋來蛻變的生命，我很好，知我慢慢走，會走到什麼地方？","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","容易；生活，我想早戀，愛情，年輕的時候，早起的鳥兒有蟲吃，男人之美，.人怕出名豬怕壯，必死無疑；人不要臉，就會有別的女人花你的錢，那麼你至少得吃一對兒鯨魚……我身邊的朋友們啊，男人之美，懷才就像懷孕，愛情就像二個拉著橡皮筋的人，珍惜生活上帝還讓你活著，想起來還是幼兒園比較好混！","昨天我是個孩子，雲彩裡，去時自去：正如你生前我不知欣喜，也不能給我們利益，就這悲哀的人生也是因人差異，誰沒有怨，在這裏，同是一個碎心，有時激起成章的波動，杭州西溪的蘆雪與威尼市夕照的紅潮，他音樂的興趣已經很深：他比著手勢告我他也有一張提琴，只能在他紀念日的周遭永遠無聲的流轉。","教官，第13名，他說的沒錯喔，Taruru報告，才不是呢，我是29號，現在下班了，是也，各位再見了，真的，盡妳的全力投球吧，排好，你們來這裡做什麼，在這裡的話，編劇，導演，怎麼這樣嘛，沒，好狡猾的說，快追，聽好了，想醒就醒，你把夏美帶去哪兒了，快點放馬過來，自從他被烏奇打敗後。","再不對你好點，天哪，珍惜生活上帝還讓你活著，年輕的時候，講了三個多小時了一分錢都不降？","品質不僅僅是團隊，然後再去找相關的技術解決方案，不管做任何事，沒有突破，別人的表揚，這兩個字強調既要追求結果，上當不是別人太狡猾，什麼是團隊呢？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝師父。","薄熙來棄紅，3，短，一日3杯咖啡，Canon，蒙地卡羅網賽／苦吞19記ACE，參訪中小企，松山-金浦航權，兩會前夕，山里隧道貫通，默多克辦新報，系列手機，從《小學堂》畢業，組合Super，陸房市交易量暴跌，入圍11金酸莓，小燕姐：可不可以後悔？","現在的我，一周7天都沒有休息的時候，喝完热咖啡，Hadlousymovie(fistofdragon)+2hoursThaimassage+Dinnercrayfish，昨晚酒后被朋友拉去喝了一杯咖啡，結果被數落了一下，自从海处开始煮咖啡以后，好好的滤纸包装给我扯坏了，是過多。","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，萬能的師父。","有你就不愁跟著逃學的宇宙，水果甜甜帶走你給的所有所有心裡的傷，就算失望不能絕望下一站是不是天堂，挺胸，時間不肯快走，改變既有的模式！","一條孤單的走廊，我都要給你一個讚殊途同歸？","可是已經晚了……請你以後不要在我面前說英文了，工作，老闆，.人怕出名豬怕壯，一旦累死了，早起的鳥兒有蟲吃，然後選中一張百元大鈔，必死無疑；人不要臉，退一步海闊天空，愛情，年老的時候，一旦累死了，天哪，睡你的老公，早起的鳥兒有蟲吃，愛情就像二個拉著橡皮筋的人，天哪，OK？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","在我消失在這個世界之前，請允許我，現在我不敢肯定，照顧你生命中的每一天，ㄟ那就結婚吧我沒有妳會死，前世的五百次回眸，如果是真的，我要照顧和負責妳一輩子。","不然不曉得奮鬥，住你的房，念了十幾年書，老闆，年老的時候，念了十幾年書，年老的時候，愛情，念了十幾年書，女孩富著養，容易；活，不然不曉得奮鬥，懷才就像懷孕，懷才就像懷孕，容易；生活，不然人家一塊蛋糕就哄走了。","奇蹟，可怕，恭喜恭喜，解散，好吃，公家的，超讚喔，編劇，聽我說完嘛，要買便當嗎，大樂透，如果置之不理，這樣我們也很難找到他，橋歸橋，怎樣啦，汗水，Daddy呢，因此，寶寶睡，本官還有事情要忙，不會吧，由在下來交涉，然後是假設理論三，再，十三號星期一，那妳來地球到底是為了什麼？","和純真的孩童們，中等學校卒業生和保正，忽起眩暈，忽從風雨合奏的進行曲中，來浪費有用的金錢，此刻，但現在的曆法，看見鮮紅的血，來和他們一拚！","店舖簷前的天燈，他就發出歡喜的呼喊，丙說，在這樣黑暗之下，且中曆我也在書本上，過了些時，說了不少好話，不見得人們就活不下去，誰都有義務分擔，所有無謂的損失，只有乘這履端初吉，容得我們耕種居住？","他高興的時候，生的糧食儘管豐富，卻不能稍超興奮，不知行有多少時刻，想因為在夢之國的遊行，沒有年歲，現在不高興了，所以窮的人，我們婦女竟是消遣品，似是受到較多的勞苦的一人，休怕他毒氣、機關鎗！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，萬能的師父。","看這張照片，一直按重播，【更多鴨鴨資訊在這裡】鴨鴨復活了，辱檢沒屁眼，台北，法拉利時速300km撞毀，以後拜師學藝找名嘴可能會比較快，北中南都有零星災情傳出，AV女優大學開講，我可以自豪地說，ent.appledaily.com.tw/on...究竟是哪位火辣女星復仇成功了呢。","最喜歡的一句話，還沒啦，就連妳也是，你平安無事嗎，等我啦，快給我說明你的作戰計畫！","當然要，只要本官認真去做，原來四處放話，我願意，這個很讚耶，這個，不要輸喔，叉燒，這是秘密，謝謝妳的邀約，明年也請多關照，有啊，真的是真的，泡菜鍋，金星女神，真羨慕妳，Garuru中尉，三，開始打掃了。","也不是什麼大不了的事，鑼聲亦不響了，天體的現象嗎，不曉得是追慕不返母親的慈愛，還有我們生的樂趣？","捧出滿腔誠意，擋不住大的拳頭，所以那邊的街市，鬧出什麼事來？","一雙眼和一雙眼短暫的交會擦身而過，經過了冷言熱捧，還騙不過自己最怕回憶，或痛，ya，在我活的地方為什麼你，笑了，有沒有什麼好預兆你說鬥牛脾氣非常差，啦啦啦...就算失望，已習慣忽略，鎖上的軀殼捕捉水中的月亮，我和世界不一樣，你在睡覺我做白日夢你說凱薩是一種沙拉，改變既有的模式！","看起來十分硬朗!要衝了嗎?父決定搬出台大宿舍，行兇學弟被帶到警局時，Air展示機，這起地震是板塊碰撞擠壓所致，以後拜師學藝找名嘴可能會比較快，女愛吃青蛙鍋，真有心...世界最矮的男人，女搭機未保濕，有人說，不只是上班族女孩，山獅被看門狗追，的行為，有瘦肉精，反宵夜文！","ㄟ那就結婚吧我沒有妳會死，前世的五百次回眸，但我可以肯定地告訴你，照顧你生命中的每一天，你是世界上最幸福的人，請允許我，你是世界上最幸福的人，什麼都別說了，請允許我，那麼餘下四分之三的時光請讓我來守護你好嗎？","昨晚喝了杯咖啡，看來又得喝杯咖啡，最近快把星巴克變圖書館了啊，從迷你吧的酒精飲品、朱古力、乾果，真是太看得起我了，反正他喜歡，很沒有尊嚴嗎？","而你、配我、才幸福餓死了，最近沒時間整理推特.....每天都好忙，好天氣不等人，我對你，神馬狀況，你家音響好像不賴，透理血气，結果一晚上睡不著，中午連瞇一會的地方都沒有，好果斷啊，手抖，这么高大上的东东，【今日午餐】韓式辣味水餃+特調？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴。","我想早戀，年輕的時候，天哪，愛情，念了十幾年書，我想早戀，男孩窮著養，退一步海闊天空，女人之美，年老的時候，我想早戀，OK？","也希望我能夠讓行政院的版本早一點通過、早一點實施，這三者應該是主軸，我大體了解，如果不喊卡，尤其民生與工業都還面臨一些外在因素的衝擊時，特別預算覈實開支後，我們警察不是專門開罰單的，勞保不同意，包括整體開發、聯合開發、經費分配、分擔的事情。","在我消失在這個世界之前，什麼都別說了，ㄟ那就結婚吧我沒有妳會死，但我可以肯定地告訴你，沒有妳我的人生沒有意義。","謝謝你，我們已經懲處了機場公司，我們尊重且信任中央銀行為匯率的主管機關，不過……由於最後是我處理的，所以還沒有完全……很久一段時間，你沒有注意到，我覺得我們中央政府沒有提供更周延的土石流、雨量資料給宜蘭縣政府，我一定會把剛才黃委員所提的事記住，但是到了民國九十幾年還是沒有下文！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","ㄟ那就結婚吧我沒有妳會死，現在已經過了人生的四分之一，我誰都不要，現在我不敢肯定，前世的五百次回眸，照顧你生命中的每一天，現在已經過了人生的四分之一，如果是真的，什麼都別說了，ㄟ那就結婚吧我沒有妳會死，我想現在、馬上、立刻跟妳結婚。","給他們一年的時間用比較低的風險去嘗試商業模式是否可行，我們很謹慎，3個月前，沒錯！","國家的慶典、國家的體育贊助，這些都是小事，這裡面的確有我們在重建後發現很大困難的地點，我怎麼會希望它創新高呢？","臭猴子，要說到侵略藍星，你在胡說什麼，真是沒禮貌耶，真的是辛苦你了，對決的時刻終於來臨了啊，你先等等，第14名，年輕人，神秘巨大生物？","春電展將登場，醫訊／長者快樂生活，醫訊／長者快樂生活，終場前0.5秒，追憶黃昭堂，遊民喪命地下道，星女子高球賽，開推土機衝火場，兩會來臨，星女子高球賽，警調監視畫面，短，營建業結合電信商，一人分飾男女二角，蘇打綠連兩天破蛋，開放還是保守？","好心乘客讓出肩膀，血友病男童絕食，吃東西不小心不行啊...金氏紀錄整形最多，公家機關和企業延至10時才上班，祈禱這健康的女娃兒手術順利成功，尼克大勝12分，真有心...世界最矮的男人，我錯了！","噢，有時候，上床再躺会头还是有点晕難得單品手沖咖啡比義式咖啡便宜，Hadlousymovie(fistofdragon)+2hoursThaimassage+Dinnercrayfish，可是那脆皮烤鴨真的好~好~~吃~~~筷子一夾，於是面談時忘了該講的內容，就算在生活中，哇！","快滾出去啦，快點進行下集預告，喬治嗎，不過夏美大人，隊長所需要的，其四，夏美同學，不可思議的少女，快逃啊，這個我要，是啊，真受不了，要不要，妳不要管我，你怎麼有這個東西，等等我，肩膀痛，了解，妳有事嗎，好了嗎，最近關心的事，小熊熊，GO，不只是人而己。","地震，張鈞甯說，台北，女搭機未保濕，調查顯示多數民眾希望停建核四，這個副教授~~~還有臉為人師表嗎?廠商是怎樣~~把台灣球迷當凱子削喔!手段使盡卻判13年~~衝衝衝，【更多鴨鴨資訊在這裡】鴨鴨復活了，是好還是壞!?有誰能列出蘋果、三星、hTC、SONY......等的爆炸史嗎？","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","金錢的慾念，覺悟把臉皮張緊一些，小子不長進，就使我發生了許多疑問，現在想沒得再一個，在這樣黑暗之下，他媽的，街上看鬧熱的人，在這時候，燈火星星地，地球繞著太陽，生的糧食儘管豐富，一個年輕的稀奇地問。","林委員，黃委員，那應該是九二一地震之後政府提供的農村住宅標準圖，陳副院長是總召集人，不會如此，這一項很重要，政府的政策是我的訊息，我了解都會區年輕人望屋興嘆的苦悶，而撥給他們的統籌款遠大於其欠費數字，至於詳細的情形，放眼全球各地，因為新聞記者朋友基於敬業，很清楚，當然不正確啊！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴。"];
}

function fakeUsers() {
    return [{"name":{"title":"mr","first":"umut","last":"aclan"},"email":"umut.aclan@example.com"},{"name":{"title":"monsieur","first":"aloïs","last":"blanc"},"email":"aloïs.blanc@example.com"},{"name":{"title":"mrs","first":"yasemin","last":"süleymanoğlu"},"email":"yasemin.süleymanoğlu@example.com"},{"name":{"title":"mr","first":"leo","last":"westphal"},"email":"leo.westphal@example.com"},{"name":{"title":"ms","first":"sofie","last":"braun"},"email":"sofie.braun@example.com"},{"name":{"title":"mr","first":"gökhan","last":"sadıklar"},"email":"gökhan.sadıklar@example.com"},{"name":{"title":"mrs","first":"mélina","last":"renaud"},"email":"mélina.renaud@example.com"},{"name":{"title":"ms","first":"marsha","last":"fisher"},"email":"marsha.fisher@example.com"},{"name":{"title":"mr","first":"bent","last":"van eijsden"},"email":"bent.vaneijsden@example.com"},{"name":{"title":"ms","first":"josefine","last":"pedersen"},"email":"josefine.pedersen@example.com"},{"name":{"title":"miss","first":"johanne","last":"johansen"},"email":"johanne.johansen@example.com"},{"name":{"title":"miss","first":"یاسمین","last":"جعفری"},"email":"یاسمین.جعفری@example.com"},{"name":{"title":"mrs","first":"meghan","last":"reed"},"email":"meghan.reed@example.com"},{"name":{"title":"miss","first":"jen","last":"ford"},"email":"jen.ford@example.com"},{"name":{"title":"mr","first":"lucien","last":"guerin"},"email":"lucien.guerin@example.com"},{"name":{"title":"mr","first":"jimi","last":"lepisto"},"email":"jimi.lepisto@example.com"},{"name":{"title":"ms","first":"viridiana","last":"dias"},"email":"viridiana.dias@example.com"},{"name":{"title":"mrs","first":"sam","last":"russell"},"email":"sam.russell@example.com"},{"name":{"title":"mr","first":"koray","last":"karaböcek"},"email":"koray.karaböcek@example.com"},{"name":{"title":"ms","first":"فاطمه","last":"كامياران"},"email":"فاطمه.كامياران@example.com"},{"name":{"title":"miss","first":"jacomina","last":"aardenburg"},"email":"jacomina.aardenburg@example.com"},{"name":{"title":"mr","first":"leroy","last":"arnold"},"email":"leroy.arnold@example.com"},{"name":{"title":"mr","first":"julian","last":"omahony"},"email":"julian.omahony@example.com"},{"name":{"title":"mr","first":"eduardo","last":"gil"},"email":"eduardo.gil@example.com"},{"name":{"title":"mr","first":"nicolas","last":"bélanger"},"email":"nicolas.bélanger@example.com"},{"name":{"title":"mrs","first":"alexis","last":"foster"},"email":"alexis.foster@example.com"},{"name":{"title":"mrs","first":"kaitlin","last":"moore"},"email":"kaitlin.moore@example.com"},{"name":{"title":"mr","first":"chad","last":"richards"},"email":"chad.richards@example.com"},{"name":{"title":"mr","first":"valdemar","last":"møller"},"email":"valdemar.møller@example.com"},{"name":{"title":"mr","first":"jerôme","last":"beijersbergen"},"email":"jerôme.beijersbergen@example.com"},{"name":{"title":"mr","first":"téo","last":"clement"},"email":"téo.clement@example.com"},{"name":{"title":"mr","first":"william","last":"singh"},"email":"william.singh@example.com"},{"name":{"title":"miss","first":"sara","last":"morrison"},"email":"sara.morrison@example.com"},{"name":{"title":"miss","first":"maia","last":"chen"},"email":"maia.chen@example.com"},{"name":{"title":"mr","first":"daryl","last":"hanson"},"email":"daryl.hanson@example.com"},{"name":{"title":"mr","first":"benjamin","last":"kumar"},"email":"benjamin.kumar@example.com"},{"name":{"title":"ms","first":"elsa","last":"kivisto"},"email":"elsa.kivisto@example.com"},{"name":{"title":"mademoiselle","first":"amélie","last":"jean"},"email":"amélie.jean@example.com"},{"name":{"title":"mr","first":"barry","last":"kuhn"},"email":"barry.kuhn@example.com"},{"name":{"title":"mrs","first":"phoebe","last":"kumar"},"email":"phoebe.kumar@example.com"},{"name":{"title":"mrs","first":"kathy","last":"evans"},"email":"kathy.evans@example.com"},{"name":{"title":"mr","first":"konsta","last":"pollari"},"email":"konsta.pollari@example.com"},{"name":{"title":"mrs","first":"minttu","last":"pakkala"},"email":"minttu.pakkala@example.com"},{"name":{"title":"ms","first":"sienna","last":"walker"},"email":"sienna.walker@example.com"},{"name":{"title":"mr","first":"alexander","last":"ambrose"},"email":"alexander.ambrose@example.com"},{"name":{"title":"mr","first":"leo","last":"fink"},"email":"leo.fink@example.com"},{"name":{"title":"mr","first":"sebastian","last":"andersen"},"email":"sebastian.andersen@example.com"},{"name":{"title":"mr","first":"aaron","last":"cruz"},"email":"aaron.cruz@example.com"},{"name":{"title":"ms","first":"غزل","last":"پارسا"},"email":"غزل.پارسا@example.com"},{"name":{"title":"miss","first":"gül","last":"beşerler"},"email":"gül.beşerler@example.com"},{"name":{"title":"miss","first":"susie","last":"ryan"},"email":"susie.ryan@example.com"},{"name":{"title":"mr","first":"anton","last":"zimmer"},"email":"anton.zimmer@example.com"},{"name":{"title":"mr","first":"mikail","last":"blokzijl"},"email":"mikail.blokzijl@example.com"},{"name":{"title":"mr","first":"joseph","last":"chavez"},"email":"joseph.chavez@example.com"},{"name":{"title":"mr","first":"ruben","last":"sanders"},"email":"ruben.sanders@example.com"},{"name":{"title":"miss","first":"sarah","last":"lee"},"email":"sarah.lee@example.com"},{"name":{"title":"mr","first":"andreas","last":"pedersen"},"email":"andreas.pedersen@example.com"},{"name":{"title":"mr","first":"sebastian","last":"petersen"},"email":"sebastian.petersen@example.com"},{"name":{"title":"miss","first":"bella","last":"fuller"},"email":"bella.fuller@example.com"},{"name":{"title":"mrs","first":"tanise","last":"rezende"},"email":"tanise.rezende@example.com"},{"name":{"title":"mrs","first":"olivia","last":"li"},"email":"olivia.li@example.com"},{"name":{"title":"miss","first":"sadie","last":"smith"},"email":"sadie.smith@example.com"},{"name":{"title":"mrs","first":"giulia","last":"sanchez"},"email":"giulia.sanchez@example.com"},{"name":{"title":"mr","first":"joel","last":"patterson"},"email":"joel.patterson@example.com"},{"name":{"title":"mrs","first":"jasmine","last":"walker"},"email":"jasmine.walker@example.com"},{"name":{"title":"mademoiselle","first":"kiara","last":"nicolas"},"email":"kiara.nicolas@example.com"},{"name":{"title":"mr","first":"دانیال","last":"موسوی"},"email":"دانیال.موسوی@example.com"},{"name":{"title":"miss","first":"gracielen","last":"barros"},"email":"gracielen.barros@example.com"},{"name":{"title":"ms","first":"lotta","last":"hannula"},"email":"lotta.hannula@example.com"},{"name":{"title":"mr","first":"viljami","last":"valli"},"email":"viljami.valli@example.com"},{"name":{"title":"mr","first":"villads","last":"johansen"},"email":"villads.johansen@example.com"},{"name":{"title":"mr","first":"albert","last":"olsen"},"email":"albert.olsen@example.com"},{"name":{"title":"mrs","first":"avery","last":"bouchard"},"email":"avery.bouchard@example.com"},{"name":{"title":"mr","first":"dylan","last":"smith"},"email":"dylan.smith@example.com"},{"name":{"title":"mr","first":"luukas","last":"waisanen"},"email":"luukas.waisanen@example.com"},{"name":{"title":"ms","first":"miriam","last":"rubio"},"email":"miriam.rubio@example.com"},{"name":{"title":"mr","first":"jimmy","last":"harvey"},"email":"jimmy.harvey@example.com"},{"name":{"title":"mrs","first":"katie","last":"taylor"},"email":"katie.taylor@example.com"},{"name":{"title":"mr","first":"nathaniel","last":"walker"},"email":"nathaniel.walker@example.com"},{"name":{"title":"mrs","first":"ege","last":"alpuğan"},"email":"ege.alpuğan@example.com"},{"name":{"title":"mr","first":"siem","last":"slijkhuis"},"email":"siem.slijkhuis@example.com"},{"name":{"title":"ms","first":"elizabeth","last":"thomas"},"email":"elizabeth.thomas@example.com"},{"name":{"title":"miss","first":"clémentine","last":"menard"},"email":"clémentine.menard@example.com"},{"name":{"title":"mr","first":"matias","last":"kalas"},"email":"matias.kalas@example.com"},{"name":{"title":"mr","first":"olindo","last":"sales"},"email":"olindo.sales@example.com"},{"name":{"title":"mr","first":"samuel","last":"soler"},"email":"samuel.soler@example.com"},{"name":{"title":"mr","first":"luukas","last":"koivisto"},"email":"luukas.koivisto@example.com"},{"name":{"title":"mrs","first":"savana","last":"zitter"},"email":"savana.zitter@example.com"},{"name":{"title":"ms","first":"miriam","last":"perez"},"email":"miriam.perez@example.com"},{"name":{"title":"mr","first":"bruno","last":"hein"},"email":"bruno.hein@example.com"},{"name":{"title":"ms","first":"بهار","last":"پارسا"},"email":"بهار.پارسا@example.com"},{"name":{"title":"miss","first":"بیتا","last":"کوتی"},"email":"بیتا.کوتی@example.com"},{"name":{"title":"miss","first":"rose","last":"smith"},"email":"rose.smith@example.com"},{"name":{"title":"madame","first":"eléna","last":"guillaume"},"email":"eléna.guillaume@example.com"},{"name":{"title":"mr","first":"mathias","last":"pedersen"},"email":"mathias.pedersen@example.com"},{"name":{"title":"mrs","first":"minea","last":"maijala"},"email":"minea.maijala@example.com"},{"name":{"title":"mrs","first":"suzy","last":"chapman"},"email":"suzy.chapman@example.com"},{"name":{"title":"miss","first":"jeanette","last":"washington"},"email":"jeanette.washington@example.com"},{"name":{"title":"mrs","first":"asta","last":"andersen"},"email":"asta.andersen@example.com"},{"name":{"title":"mr","first":"eric","last":"fields"},"email":"eric.fields@example.com"}];
}

function fakeThumbnails () {
    return [
        'http://orig15.deviantart.net/e5f7/f/2011/133/1/2/female_cockatail_by_mana_l-d3g8p4i.jpg',
        'https://s-media-cache-ak0.pinimg.com/736x/d0/81/27/d0812729279f317934e1f6607fea02b7.jpg',
        'http://i.imgur.com/pF5IDtF.gif',
        'http://i.imgur.com/10o5PVn.jpg',
        'http://c.share.photo.xuite.net/paling/1c293bb/19749972/1113796711_o.jpg',
        'http://c.share.photo.xuite.net/paling/1c29380/19749972/1113692204_o.jpg',
        'http://c.share.photo.xuite.net/paling/1c29336/19749972/1113694946_o.jpg',
    ];
}

var datePresets, turn;
function pickDateInTurn () {
    if(!datePresets){
        var dateObj = new Date();
        datePresets = [0];
        // a year ago
        dateObj.setFullYear(dateObj.getFullYear()-1);
        datePresets.push(dateObj.getTime());
        // a month ago
        dateObj.setTime(Date.now());
        dateObj.setMonth(dateObj.getMonth()-1);
        datePresets.push(dateObj.getTime());
        // a week ago
        dateObj.setTime(Date.now());
        dateObj.setDate(dateObj.getDate()-7);
        datePresets.push(dateObj.getTime());
        // today
        dateObj.setTime(Date.now());
        dateObj.setHours(0, 0, 0, 0);
        datePresets.push(dateObj.getTime());  
    }

    if (!turn) {
        turn = 0;
    }

    var start = datePresets[turn];
    var end = (turn + 1) >= datePresets.length ? Date.now() : datePresets[turn + 1];
    turn = (turn + 1) % datePresets.length;
    var offset = Math.floor((0.1 + 0.8 * Math.random()) * (end - start));
    return start + offset;
}

