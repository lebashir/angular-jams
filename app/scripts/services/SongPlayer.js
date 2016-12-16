(function() {
    function SongPlayer(Fixtures) {
        var songPlayer = ();
        
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
/**
@function getSongIndex
@desc gets the index of a song
@param {Object} song
*/
        var getSongIndex = function(song) {
            return currentALbum.songs.indexOf(song);
        }
/**
@desc Active song object from list of songs
@type {Object}
*/
        SongPlayer.currentSong = null;
/**
* @function playSong
* @desc play the current audio file (currentBuzzObject) and sets song.playing to true
*/
        var playSong = function(){
            currentBuzzObject.play();
            song.playing = true;
        }
/**
*/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song){
                
                setSong(song);
                playSong();
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            }
        };
/**
@function 
*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
/**
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentALbum.song[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();