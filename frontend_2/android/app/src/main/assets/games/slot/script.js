/**
 * Array prototype
 * Shuffles array in place.
 */
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

/**
 * Number prototype
 * Generate random integer
 */
Number.prototype.randTo = function (max) {
    let min = this;
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
* Create sequence generator from to
*/

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

/**
 * Array prototype Empty
*/
Array.prototype.empty = function () {
    return this.length === 0 ? !0 : !!0;
}

Array.prototype.closest = function (num) {
    let currVal = this[0], currIndex = 0;
    this.forEach((val, i) => {
        if (Math.abs(num - val) < Math.abs(num - currVal)) {
            currVal = val;
            currIndex = i;
        }
    });

    return {
        val: currVal,
        index: currIndex
    };
};

/*element selector*/
let find = function (e) {
    switch (true) {
        case typeof e === "string":
            return document.querySelector(e);
        default:
            return e;
    }
};

//get random element
Array.prototype.rnd = function () {
    return this[Math.floor(Math.random() * this.length)];
};

//resource loader.js

const Resources = (function (loader, global) {
    if (global.document) {

        return (...resources) => new loader(resources);
    }
})(function (resources) {
    const IMG_ALLOWED_TYPES = ['png', 'jpg', 'jpeg'];
    let loadCallbacks = [], $resources = [], $imgs = [];

    //extension black listing
    resources.forEach(resource => {
        let splited = resource.split('.'),
            extension = splited[splited.length - 1];

        if (IMG_ALLOWED_TYPES.includes(extension)) {
            $resources.push(resource);
        }
    });

    this.onLoad = function (fns) {
        if (typeof fns === 'function') {
            loadCallbacks.push(fns);
        }

        return this;
    };

    (function loadImage(index = 0) {
        if (undefined === $resources[index]) {
            //exec callbacks
            loadCallbacks.forEach(f => f.call(this, $imgs, $resources));

            return;
        }
        let img = new Image();
        img.src = $resources[index];
        img.addEventListener('load', function () {
            $imgs.push(img);
            loadImage(++index);
        });
    })(0);

}, this);

//reel.js
const Reel = function (canvas, offsetX = 0) {

    //generate img objects for a reel
    this.reelMap = conf.imgMap.shuffle()
        .map((text, index) => ({
            offsetY: conf.reel.height * conf.imgStartPts[index],
            key: text
        })
        );
    this.fnc = null;
    this.spinning = false;
    this.finalAnimation = false;
    this.clickTime = 0;
    this.showedLastAnim = false;
    this.clicked = false;
    this.mode = 'random';
    this.fixedPlace = 'top';
    this.fixedImg = 'BAR';
    this.finalShapes = [];
    //clear whole reel
    const clear = function () {
        canvas.clearRect(
            offsetX,
            conf.height,
            conf.reel.width,
            conf.height
        );
    };

    //draw image to specific point 
    const draw = function (key = 'BAR', offsetY = 0, blur = 0) {
        if (conf.img.hasOwnProperty(key)) {
            clear();

            canvas.strokeStyle = '#000';
            canvas.filter = `blur(${blur}px)`;
            canvas.lineWidth = 4;
            canvas.fillRect(offsetX, offsetY, conf.reel.width, conf.reel.height);
            canvas.strokeRect(offsetX, offsetY, conf.reel.width, conf.reel.height);
            canvas.drawImage(conf.img[key], offsetX, offsetY);
            canvas.filter = 'none';
        }
    };

    this.spinAnimation = function (skip) {
        if (!this.spinning) return;

        this.reelMap.forEach(img => {

            img.offsetY += conf.pSkip;

            //reset prev and jump very top
            if (img.offsetY >= conf.height) {
                img.offsetY = conf.reel.height * -3;
            }

            //draw img object
            draw(img.key, img.offsetY, 4);
        });
    };

    this.generateReelShapesFixed = function () {
        let imgMp = conf.imgMap.filter(x => x !== this.fixedImg);
        let rndImg2 = imgMp.rnd();
        imgMp.splice(imgMp.indexOf(rndImg2), 1);
        let rndImg3 = imgMp.rnd();
        switch (this.fixedPlace) {
            case 'top':
                return [
                    {
                        offsetY: -60,
                        key: this.fixedImg,
                        stop: 0
                    }, {
                        offsetY: 60,
                        key: rndImg2,
                        stop: 120
                    }, {
                        offsetY: 180,
                        key: rndImg3,
                        stop: 240
                    }
                ];
            case 'middle':
                return [
                    {
                        offsetY: -120,
                        key: rndImg2,
                        stop: -60
                    }, {
                        offsetY: 0,
                        key: this.fixedImg,
                        stop: 60
                    }, {
                        offsetY: 120,
                        key: rndImg3,
                        stop: 180
                    }
                ];
            default:
                return [
                    {
                        offsetY: -180,
                        key: rndImg2,
                        stop: -120
                    }, {
                        offsetY: -60,
                        key: rndImg3,
                        stop: 0
                    }, {
                        offsetY: 60,
                        key: this.fixedImg,
                        stop: 120
                    }
                ];
        }
    };

    this.generateReelShapesRandom = function () {
        let imgMp = conf.imgMap.map(x => x);
        let rndImg1 = imgMp.rnd();
        imgMp.splice(imgMp.indexOf(rndImg1), 1);
        let rndImg2 = imgMp.rnd();
        imgMp.splice(imgMp.indexOf(rndImg2), 1);
        let rndImg3 = imgMp.rnd();

        let rnd = [0, 60].rnd();
        return [
            {
                offsetY: -120 + rnd,
                key: rndImg1,
                stop: -60 + rnd
            }, {
                offsetY: 0 + rnd,
                key: rndImg2,
                stop: 60 + rnd
            }, {
                offsetY: 120 + rnd,
                key: rndImg3,
                stop: 180 + rnd
            }
        ];
    };

    this.setFinalShapes = function () {
        switch (this.mode) {
            case 'fixed':
                return this.generateReelShapesFixed();
                break;
            default:
                return this.generateReelShapesRandom();
        }
    };

    this.spin2point = function () {
        if (!this.finalAnimation) {
            if (typeof this.fnc === 'function') {
                this.fnc();
                this.fnc = null;
            }

            return;
        }

        let stopPt;
        this.finalShapes.forEach(img => {
            if (img.hasOwnProperty('stop')) {
                stopPt = img.stop;
            }
            let inx = 6;
            if (img.offsetY + inx === stopPt) {
                this.finalAnimation = false;
            }
            img.offsetY += inx;

            //draw img object
            draw(img.key, img.offsetY);
        });
    };

    this.done = function (fn) {
        this.fnc = fn;
    }

};


//slot.js

const Slot = function (canvas) {

    this.canvas = canvas;
    let auto = false;
    let reels = [...range(1, 3)]
        .map(i => new Reel(canvas, conf.reel.xOffsets[i - 1]));

    let delta = 0;
    let currentSpin = [];

    this.checkout = function () {
        if (confirm('Are you sure? We can keep your money better!')) {
            conf.player.money = 0;
            conf.balance.value = conf.player.money;
            conf.win.classList.remove('blink');
            auto = false;
            alert('Your operation has been made successfully');
        }
    };

    this.setCredits = function () {
        conf.player.money = conf.balance.value;

        return this;
    };

    this.spin = function () {
        conf.win.value = 0;
        conf.sound.spin.play();
        if (conf.player.money - conf.bet.value * 1 < 0) {
            conf.sound.spin.currentTime = 0;
            conf.sound.spin.pause();
            alert('You dont have enough credits!');
            auto = false;

            return;
        }
        conf.player.money -= conf.bet.value * 1;
        conf.balance.value = conf.player.money;
        currentSpin = [];
        reels.forEach(reel => {
            reel.clicked = true;
            reel.finalAnimation = false;
            reel.finalShapes = reel.setFinalShapes();
            currentSpin.push(reel.finalShapes);
        });
        conf.spinBtn.setAttribute('disabled', 'disabled');
        conf.what.setAttribute('disabled', 'disabled');
        conf.where.setAttribute('disabled', 'disabled');
        conf.bet.setAttribute('disabled', 'disabled');
        conf.balance.setAttribute('disabled', 'disabled');
        conf.mode.setAttribute('disabled', 'disabled');
        conf.checkout.setAttribute('disabled', 'disabled');
        conf.win.classList.remove('blink');
    };

    this.setMode = function () {
        reels.forEach(reel => {
            reel.mode = conf.mode.value;
            reel.fixedPlace = conf.where.value;
            reel.fixedImg = conf.what.value;
        });
    };

    this.loop = function (now) {
        reels.forEach((reel, i) => {
            this.drawStopPoints();
            //init spin animation
            reel.spinAnimation();
            reel.spin2point();

            if (reel.clicked) {
                reel.clicked = false;
                reel.clickTime = now;
                reel.spinning = true;
            }

            delta = now - reel.clickTime;
            if (delta > conf.reel.animTimes[i] && reel.spinning) {
                reel.finalAnimation = true;
                reel.spinning = false;

                if (i === 2) {
                    conf.spinBtn.removeAttribute('disabled');
                    conf.what.removeAttribute('disabled');
                    conf.where.removeAttribute('disabled');
                    conf.bet.removeAttribute('disabled');
                    conf.balance.removeAttribute('disabled');
                    conf.mode.removeAttribute('disabled');
                    conf.checkout.removeAttribute('disabled');
                    reel.done(() => {
                        //reset sound and stop
                        conf.sound.spin.currentTime = 0;
                        conf.sound.spin.pause();
                        let won = check(currentSpin);
                        if (auto) {
                            setTimeout(function () {
                                conf.spinBtn.click();
                            }, won ? conf.autoModeDelay : 300);
                        }
                    });
                }
            }
        });
    };

    this.start = function () {
        conf.sound.win.volume = 1.0;
        conf.sound.spin.volume = 0.03;
        reels.forEach(reel => {
            reel.clicked = true;
            reel.finalAnimation = false;
            reel.finalShapes = reel.setFinalShapes();
        });
        reels.forEach((reel, i) => {
            reel.clicked = false;
            reel.finalAnimation = true;
            reel.spinning = false;
        });
        return this;
    };

    this.drawStopPoints = function () {
        this.canvas.strokeStyle = '#121212';
        [60, 120, 180].forEach(x => {
            this.canvas.strokeRect(0, x - 2, 5, 0);
            this.canvas.strokeRect(conf.width - 5, x - 2, 5, 0);
        });
    };

    let check = function (reels) {
        if (reels[0][0].stop !== reels[1][0].stop || reels[1][0].stop !== reels[2][0].stop) {
            //no win
            return;
        }

        let sum = {
            top: 0,
            middle: 0,
            bottom: 0
        };

        //coefficient - custom added.
        let bet = conf.bet.value * 1;

        let highlightPts = [];
        //all reels are aligned in one line
        for (let r = 0; r < reels.length; r++) {
            let reel1 = reels[0][r],
                reel2 = reels[1][r],
                reel3 = reels[2][r];
            let reelsStr = reel1.key + reel2.key + reel3.key;
            //top line
            if (reel1.stop === 0) {
                if (reelsStr.match(/(Cherry){3}/g)) sum.top += bet * 2000;
                else if (reelsStr.match(/(7){3}/g)) sum.top += bet * 150;
                else if (reelsStr.match(/(7|Cherry){3}/g)) sum.top += bet * 75;
                else if (reelsStr.match(/(3xBAR){3}/g)) sum.top += bet * 50;
                else if (reelsStr.match(/(2xBAR){3}/g)) sum.top += bet * 20;
                else if (reelsStr.match(/(BAR){3}/g)) sum.top += bet * 10;
                else if (reelsStr.match(/(BAR|2xBAR|3xBAR){3}/g)) sum.top += bet * 5;
                if (sum.top !== 0) {
                    highlightPts.push(0 + conf.reel.height / 2);
                }

            }
            //middle line
            if (reel1.stop === 60) {
                if (reelsStr.match(/(Cherry){3}/g)) sum.middle += bet * 1000;
                else if (reelsStr.match(/(7){3}/g)) sum.middle += bet * 150;
                else if (reelsStr.match(/(7|Cherry){3}/g)) sum.middle += bet * 75;
                else if (reelsStr.match(/(3xBAR){3}/g)) sum.middle += bet * 50;
                else if (reelsStr.match(/(2xBAR){3}/g)) sum.middle += bet * 20;
                else if (reelsStr.match(/(BAR){3}/g)) sum.middle += bet * 10;
                else if (reelsStr.match(/(BAR|2xBAR|3xBAR){3}/g)) sum.middle += bet * 5;
                if (sum.middle !== 0) {
                    highlightPts.push(60 + conf.reel.height / 2);
                }
            }
            //bottom line
            if (reel1.stop === 120) {
                if (reelsStr.match(/(Cherry){3}/g)) sum.bottom += bet * 4000;
                else if (reelsStr.match(/(7){3}/g)) sum.bottom += bet * 150;
                else if (reelsStr.match(/(7|Cherry){3}/g)) sum.bottom += bet * 75;
                else if (reelsStr.match(/(3xBAR){3}/g)) sum.bottom += bet * 50;
                else if (reelsStr.match(/(2xBAR){3}/g)) sum.bottom += bet * 20;
                else if (reelsStr.match(/(BAR){3}/g)) sum.bottom += bet * 10;
                else if (reelsStr.match(/(BAR|2xBAR|3xBAR){3}/g)) sum.bottom += bet * 5;
                if (sum.bottom !== 0) {
                    highlightPts.push(120 + conf.reel.height / 2);
                }
            }
        }

        //heightlight winner row
        let margin = 10;
        highlightPts.forEach(i => {
            canvas.beginPath();
            canvas.moveTo(margin, i - 2);
            canvas.lineTo(conf.width - margin, i - 2);
            canvas.strokeStyle = "#FF0000";
            canvas.stroke();
        });

        let totalSum = sum.top + sum.middle + sum.bottom;
        conf.player.money += totalSum;
        conf.balance.value = conf.player.money;
        if (totalSum !== 0) {
            conf.sound.win.play();
            conf.win.classList.add('blink');
            conf.win.value = totalSum;
            console.log(sum)
            return true;
        }
        return false;
    };

    this.autoToggle = function () {
        auto = !auto;
        let mode = auto === true ? 'ON' : 'OFF';
        conf.autoBtn.innerHTML = conf.autoBtn.innerHTML.replace(/ON|OFF/g, mode);

        conf.spinBtn.click();
    };
};




//gamejs
let conf = {
    fps: 60,
    img: [],
    width: 420 + 20,
    height: 240,
    canvas: find('#slot'),
    spinBtn: find('#spin'),
    autoBtn: find('#auto'),
    mode: find('#mode'),
    where: find('#where'),
    what: find('#what'),
    balance: find('#balance'),
    bet: find('#bet'),
    win: find('#cwin'),
    checkout: find('#checkout'),
    reel: {
        width: 140,
        height: 120,
        xOffsets: [0, 140, 280].map(x => x + 10),
        animTimes: [20, 25, 30].map(x => x * 100)
    },
    pSkip: 40,
    imgMap: ['BAR', '2xBAR', '3xBAR', '7', 'Cherry'],
    imgStartPts: [...range(-2, 2)],
    player: {
        money: 10
    },
    imgDot: null,
    autoModeDelay: 3000,
    sound: {
        win: new Audio('https://n1md7.github.io/slot-game/sound/win.mp3'),
        spin: new Audio('https://n1md7.github.io/slot-game/sound/spin.mp3')
    }
};
//Resource loader
Resources(
    'https://n1md7.github.io/slot-game/img/BAR.png',
    'https://n1md7.github.io/slot-game/img/2xBAR.png',
    'https://n1md7.github.io/slot-game/img/3xBAR.png',
    'https://n1md7.github.io/slot-game/img/7.png',
    'https://n1md7.github.io/slot-game/img/Cherry.png'
)
    .onLoad(function (resources, names) {
        document.querySelector('.preview').parentNode.
            removeChild(document.querySelector('.preview'));
        //loading done and ready to go
        //save loaded resources to conf.img 
        if (resources instanceof Array) {
            conf.imgMap.forEach((i, j) => conf.img[i] = resources[j]);
        }
        //add options to select
        names.forEach(function (name) {
            let key = name.replace(new RegExp('^(https://n1md7.github.io/slot-game/img/)|(.png|.jpg|.jpeg)$', 'ig'), ''),
                option = document.createElement('option');
            option.value = key;
            option.innerText = key;
            conf.what.appendChild(option);
        });

        //sounds load
        conf.sound.win.load();
        conf.sound.spin.load();
        //instantiation the game
        (function (slot) {
            let fps = conf.fps,
                interval = 1000 / fps,
                delta,
                lastpUpdate = 0;
            //bind click events
            conf.spinBtn.onclick = slot.spin;
            conf.checkout.onclick = slot.checkout;
            conf.mode.onchange = slot.setMode;
            conf.where.onchange = slot.setMode;
            conf.what.onchange = slot.setMode;
            conf.balance.onchange = slot.setCredits;
            conf.balance.value = conf.player.money;
            conf.autoBtn.onclick = slot.autoToggle;
            //init game
            slot.start();
            //core function of the game
            (function update(now) {
                delta = now - lastpUpdate;
                if (delta > interval) {
                    lastpUpdate = now - (delta % interval);
                    slot.loop(now);
                }
                window.requestAnimationFrame(update);
            })();
        })(new Slot(conf.canvas.getContext('2d')));
    });