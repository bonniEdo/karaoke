let playQueue = [];
let currentSong = null;

const addSongToQueue = (song) => {
    // 添加 timestamp 屬性以表示點歌時間
    song.timestamp = new Date();
    playQueue.push(song);
    // 根據 timestamp 進行排序
    playQueue.sort((a, b) => a.timestamp - b.timestamp);
};

const getNextSong = () => {
    if (playQueue.length > 0) {
        currentSong = playQueue.shift();
        return currentSong;
    } else {
        currentSong = null;
        return null;
    }
};

const getCurrentSong = () => {
    return currentSong;
};

const clearCurrentSong = () => {
    currentSong = null;
};
const getPlayQueue = () => {
    return playQueue;
};

module.exports = {
    addSongToQueue,
    getNextSong,
    getCurrentSong,
    clearCurrentSong,
    getPlayQueue
};