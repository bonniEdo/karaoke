const Song = require("../models/songModels")
const playerService = require('../services/playerService');

//假清單
// const songLists = [
//     { "song.id": "bad day", "author": "bonnie" },
//     { "song.id": "bad day2", "author": "bonnie2" },
//     { "song.id": "bad day3", "author": "bonnie3" },
//     { "song.id": "bad day4", "author": "bonnie4" }
// ];

const songSample = { "song.id": "bad day" };

// 新增歌曲到資料庫
const addSong = async (req, res) => {
    // try {
    //     const { name, artist, url, language } = req.body;

    //     if (!name || !artist || !url || !language) {
    //         console.log('Missing required fields');
    //         return res.status(400).json({ message: 'Missing required fields' });
    //     }
    //     const newSong = new Song({ name, artist, url, language });
    //     await newSong.save();

    //     res.status(201).json({ message: 'Song added successfully', song: newSong });
    // } catch (error) {
    //     console.error('Error adding song:', error);
    //     res.status(500).json({ message: 'Server error', error });
    // }
    try {
        const { name, artist, url, language } = req.body;

        if (!name || !artist || !url || !language) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSong = new Song({ name, artist, url, language });
        await newSong.save();

        playerService.addSongToQueue(newSong);

        res.status(201).json({ message: 'Song added successfully', song: newSong });
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// 列出資料庫歌曲
const songList = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// 點歌
const songOrder = async (req, res) => {
    try {
        const { name, artist } = req.query;

        // 構建查詢條件
        let query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // 大小寫不敏感
        }
        if (artist) {
            query.artist = { $regex: artist, $options: 'i' }; // 大小寫不敏感
        }

        //     const songs = await Song.find(query);
        //     res.status(200).json(songs);
        // } catch (error) {
        //     console.error('Error searching for songs:', error);
        //     res.status(500).json({ message: 'Server error', error });
        // }
        const songs = await Song.find(query);

        if (songs.length === 0) {
            return res.status(404).json({ message: 'No songs found matching the criteria' });
        }

        // 將找到的歌曲添加到播放隊列
        songs.forEach(song => playerService.addSongToQueue(song));

        res.status(200).json({ message: 'Songs added to queue', songs });
    } catch (error) {
        console.error('Error searching for songs:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// 列出已點歌曲
const getSongOrder = async (req, res) => {
    try {
        const queue = playerService.getPlayQueue();
        res.status(200).json(queue);
    } catch (error) {
        console.error('Error fetching song order:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// 切歌
const songCut = (req, res) => {
    try {
        playerService.clearCurrentSong();
        const nextSong = playerService.getNextSong();

        if (nextSong) {
            res.status(200).json({ message: 'Playing next song', song: nextSong });
        } else {
            res.status(200).json({ message: 'No more songs in the queue' });
        }
    } catch (error) {
        console.error('Error cutting song:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}


const songPut = (req, res) => {
    res.status(200).send(songSample)
}

const songSearch = (req, res) => {
    res.status(200).json(songLists)
}

module.exports = { addSong, songList, songOrder, getSongOrder, songCut, songSearch, songPut }