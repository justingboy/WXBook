// pages/movie/more-movie/more-movie.js
var util = require("../../../utils/util.js");
var datas = require("../../../data/data.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  //处理数据
  processDoubanData: function (moviesDouban) {
    console.log(moviesDouban)
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
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
    var totalMovies = []
    totalMovies = this.data.movies.concat(movies);
    this.setData({
      movies: movies
    });
    wx.stopPullDownRefresh();
    // //隐藏loading状态
    wx.hideNavigationBarLoading();

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    //本地数据测试
    var localdataMovie = {};
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        localdataMovie = datas.moreInTheaters;
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        localdataMovie = datas.moreComingSoon;
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        localdataMovie = datas.moreTop250;
        break;
    }
    // this.data.requestUrl = dataUrl;
    // util.http(dataUrl, this.processDoubanData)
    this.processDoubanData(localdataMovie);
  },

  //电影详情
  onMovieTab: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    console.log("打开电影详情：onMovieTab");
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id=" + movieId
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
    //显示loading状态
    wx.showNavigationBarLoading();
    console.log("刷新数据：onPullDownRefresh");
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    //刷新页面后将页面所有初始化参数恢复到初始值
    this.data.movies = [];
    // util.http(refreshUrl, this.processDoubanData);
    //本地测试刷新
    this.processDoubanData(datas.refreshMovieDatas);


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