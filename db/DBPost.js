var util = require('../utils/util.js')
class DBPost {

  //构造函数
  constructor(postId) {
    this.storageKeyName = "postList";
    this.postId = postId;
  }

  //获取所有文章的列表
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require("../data/data.js").postList;
      this.execSetStorageSync(res)
    }
    return res;
  }

  //同步数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }

  //获取每个文章的内容
  getPostItemById() {
    var postData = this.getAllPostData();
    var len = postData.length;
    for (var i = 0; i < len; i++) {
      if (postData[i].postId == this.postId) {
        return {
          index: i,
          data: postData[i]
        }
      }
    }
  }

  //更新数据（收藏、点赞）
  updatePostData(category) {
    var itemData = this.getPostItemById();
    var postData = itemData.data;
    var allPostData = this.getAllPostData();
    switch (category) {
      case 'collect':
        //处理收藏
        if (!postData.collectStatus) {
          postData.collectNum++;
          postData.collectStatus = true;
        } else {
          postData.collectNum--;
          postData.collectStatus = false;
        }
        break;
      case 'up':
        //处理点赞
        if (!postData.upStatus) {
          postData.readingNum++;
          postData.upStatus = true;
        } else {
          postData.readingNum--;
          postData.upStatus = false;
        }
        break;
    }
    //更新缓存数据库
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;

  }

  //收藏文章
  collect() {
    return this.updatePostData('collect');
  }
  //点赞
  up() {
    return this.updatePostData('up');
  }

  //获取评论数据
  getCommentData() {
    var itemData = this.getPostItemById();
    var postData = itemData.data;
    postData.comments.sort(this.compareWithTime);
    var len = postData.comments.length;
    var comment;
    for (var i = 0; i < len; i++) {
      //转换时间
      comment = postData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return postData.comments;
  }

  //时间排序
  compareWithTime(com1, com2) {
    var flag = parseFloat(com1.create_time) - parseFloat(com2.create_time);
    if (flag < 0) {
      return 1;
    } else if (flag > 0) {
      return -1;
    } else {
      return 0;
    }
  }

};



export { DBPost }
