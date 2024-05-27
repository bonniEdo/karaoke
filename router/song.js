// 取得 已點歌曲
const express = require("express");
const router = express.Router();
const { songList, songOrder, songCut, songPut, songSearch } = require("../controllers/songController")

//取得已點清單
router.route("/list").get(songList)

//點歌取消歌
router.route("/order").post(songOrder).delete(songCut)

//插歌
router.route("/put").post(songPut)


//搜尋歌
router.route("/search").get(songSearch)

module.exports = router
