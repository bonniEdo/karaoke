
//假清單
const songList = [
    { "song.id": "bad day", "author": "bonnie" },
    { "song.id": "bad day2", "author": "bonnie2" },
    { "song.id": "bad day3", "author": "bonnie3" },
    { "song.id": "bad day4", "author": "bonnie4" }
];

const songSample = { "song.id": "bad day" };

const song = (req, res) => {
    res.status(200).json(songList)
}

const songOrder = (req, res) => {
    res.status(200).send(songSample)
}


const songCut = (req, res) => {
    res.status(200).send(songSample)
}

const songPut = (req, res) => {
    res.status(200).send(songSample)
}

const songSearch = (req, res) => {
    res.status(200).json(songList)
}

module.exports = { song, songOrder, songCut, songSearch, songPut }