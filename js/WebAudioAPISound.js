
try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new window.AudioContext();
} catch (e) {
    //console.log("No Web Audio API support");
}

/*
 * WebAudioAPISoundManager Constructor
 */
var WebAudioAPISoundManager = function (context) {
    this.context = context;
    this.bufferList = {};
    this.playingSounds = {};
};

/*
 * WebAudioAPISoundManager Prototype
 */
WebAudioAPISoundManager.prototype = {
    loadedCallback : null,
    addSound: function (url) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        var self = this;
        this.loaded = false;

        request.onload = function () {
            // Asynchronously decode the audio file data in request.response
            self.context.decodeAudioData(
                request.response,

                function (buffer) {
                    if (!buffer) {
                        //console.log('error decoding file data: ' + url);
                        return;
                    }
                    self.bufferList[url] = buffer;
                    self.loaded = true;
                    if (self.loadedCallback instanceof Function) self.loadedCallback(url);
                });
        };

        request.onerror = function () {
            //console.log('BufferLoader: XHR error');
        };

        request.send();
    },
    stopSoundWithUrl: function (url) {
        if (this.playingSounds.hasOwnProperty(url)) {
            for (var i in this.playingSounds[url]) {
                if (this.playingSounds[url].hasOwnProperty(i)) {
                    try {
                        if (this.playingSounds[url][i].noteOff) this.playingSounds[url][i].noteOff(0);
                    } catch (e){
                        //console.log(e);
                    }
                }
            }
        }
    }
};

/*
 * WebAudioAPISound Constructor
 */
var WebAudioAPISound = function (url, options) {
    this.settings = {
        loop: false,
        autoload: false
    };

    for (var i in options) {
        if (options.hasOwnProperty(i))
            this.settings[i] = options[i];
    }

    this.url = url;// + '.mp3';
    window.webAudioAPISoundManager = window.webAudioAPISoundManager || new WebAudioAPISoundManager(window.audioContext);
    this.manager = window.webAudioAPISoundManager;
    this.manager.addSound(this.url);
};

/*
 * WebAudioAPISound Prototype
 */
WebAudioAPISound.prototype = {
    volume: 1,
    volumeOnLoad: 0.0,
    play: function () {
        var buffer = this.manager.bufferList[this.url];
        //Only play if it's loaded yet
        var self = this;
        if (typeof buffer !== "undefined") {
            /*
            var source = null;
            if (this.manager.playingSounds[this.url] && this.manager.playingSounds[this.url].length > 0) {
                source = this.manager.playingSounds[this.url][0];
            } else {
                source = this.makeSource(buffer);
            }
            */

            var source = this.makeSource(buffer);
            source.loop = this.settings.loop;
            if (source.noteOn) {
                source.noteOn(0);
            } else {
                source.start(0);
            }

            if (!this.manager.playingSounds.hasOwnProperty(this.url))
                this.manager.playingSounds[this.url] = [];

            this.manager.playingSounds[this.url].push(source);
        } else {
            //console.log("Sound [" + this.url + "] still loading...");
            this.manager.loadedCallback = function(url){
                //console.log("Sound loaded: " + url);
                if (url == self.url) {
                    var currentVolume = self.getVolume();
                    self.setVolume(self.volumeOnLoad);
                    self.play();
                    self.setVolume(currentVolume);
                }
            }
        }
    },
    stop: function () {
        this.manager.stopSoundWithUrl(this.url);
    },
    load: function(){
        this.setVolume(0);
        this.play();
        this.stop();
        this.setVolume(100);
    },
    pause: function(time) {
        this.currentTime = time;
        this.manager.stopSoundWithUrl(this.url);
    },
    getVolume: function () {
        return this.translateVolume(this.volume, true);
    },
    //Expect to receive in range 0-100
    setVolume: function (volume) {
        this.volume = this.translateVolume(volume);
    },
    translateVolume: function (volume, inverse) {
        return inverse ? volume * 100 : volume / 100;
    },
    makeSource: function (buffer) {
        var source = this.manager.context.createBufferSource();
        var gainNode = null;
        if (this.manager.context.CreateGainNod) {
            gainNode = this.manager.context.createGainNode();
        } else {
            gainNode = this.manager.context.createGain();
        }
        gainNode.gain.value = this.volume;
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(this.manager.context.destination);

        return source;
    }
};