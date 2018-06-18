// pages/post-comment/post-comment.js
import { DBPost } from '../../db/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag: true,
    keyboardInputValue: ""
  },

  //预览图片
  previewImg: function (event) {
    //评论组序号
    var commentIdx = event.currentTarget.dataset.commentIdx;
    //图片序号
    var imgIdx = event.currentTarget.dataset.imgIdx;
    //获取评论的全部图片
    var imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      urls: imgs,
      current: imgs[imgIdx]
    })
  },


  //切换输入方式
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  //获取输入内容
  bindCommentInput: function (event) {
    var content = event.detail.value;
    console.log("content = " + content);
    this.data.keyboardInputValue = content;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.postId;
    console.log("post-comment:postId = " + postId);
    //获取模拟的评论数据
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();
    console.log(comments);
    //绑定数据
    this.setData({
      postId: postId,
      comments: comments
    });
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