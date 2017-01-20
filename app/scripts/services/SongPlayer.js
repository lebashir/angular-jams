(function() {
    function SongPlayer($rootScope, Fixtures) {
        var songPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            git 
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
/**
@function getSongIndex
@desc gets the index of a song
@param {Object} song
*/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }
/**
@desc Active song object from list of songs
@type {Object}
*/
        SongPlayer.currentSong = null;
/**
@desc Current Playback time (in seconds) of currently playing song
@type (Number)
*/
        SongPlayer.currentTime = null;
/**
@Desc Current Volume of player
@type (number) (0-100)
*/
        SongPlayer.volume = null;
/**        
* @function playSong
* @desc play the current audio file (currentBuzzObject) and sets song.playing to true
*/
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
/**
@function stopSong
@desc stop the current audio file (currentBuzzObject) and set song.playing to null
*/
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
            
        }

/**
@function SongPlayer.play
@desc plays the song
@param {Object} song
*/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song){
                
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject && currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
/**
@function SongPlayer.pause
@desc pauses the song
@param {Object} song
*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
/**
@function SongPlayer.previous
@desc goes to previous song
@param {Object} song
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentALbum.song[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
/**
*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex > currentAlbum.song.length -1) {
                currentSongIndex = 0;
            }
            
        }
/**
@function setCurrentTime
@desc set current time (in seconds) of currently playing song
@param {Number} time
*/
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();