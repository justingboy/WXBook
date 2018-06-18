// pages/movie/movie.js
var util = require('../../utils/util.js');
var datas = require("../../data/data.js");

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,

  },

  //点击更多
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    console.log("category=" + category);
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },

  getMovieListData: function (url, key, categoryTitle) {
    var that = this;
    // wx.request({
    //   url: url,
    //   method: 'GET',
    //   header: {
    //     "content-type": "json"
    //   },
    //   success: function (res) {
    //     that.processDouBanData(res, key, categoryTitle);
    //   },
    //   fail: function (error) {
    //     console.log(error);
    //   }
    // })
    var res = {};
    if (key == "inTheaters") {
      res = datas.inTheaters;
    } else if (key == "comingSoon") {
      res = datas.comingSoon;
    } else {
      res = datas.top250;
    }
    this.processDouBanData(res, key, categoryTitle);


  },
  //处理豆瓣返回的数据
  processDouBanData: function (res, key, categoryTitle) {
    var movies = [];
    for (var index in res.subjects) {
      var subject = res.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        starts: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[key] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  onMovieTab: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    console.log("打开电影详情：onMovieTab");
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})