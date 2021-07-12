// 后台地址
//本地地址
// let urls="https://localhost:8091";

//局域网地址
// let urls="http://192.168.3.247:8091"

//线上地址
let urls = "https://www.qzys.art/ruoyi-admin";

// 垃圾张泽森的接口
/* let urls="http://192.168.3.215:8091"; */

// xs
/* let urls = "http://192.168.3.49:8091"; */

//授权，通过wxcode获取appid
export function getWxcode(wxcode) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/grant',
			method: 'GET',
			data: {
				"WxCode": wxcode,
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//保存用户信息到数据库
export function getUser_openid_Info(openid, province, sex, userImg, userName) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/hxgaddUser',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: {
				"avatarUrl": userImg,
				"city": "",
				"country": "",
				"gender": sex,
				"language": "",
				"nickName": userName,
				"openId": openid,
				"province": province,
				"wxCode": ""
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//GET
//获取轮播图接口数据
export function getLunboList() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getIndexBanner',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//查看轮播图的每一项
export function getLunboList_one(banSkipurl, banType) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/bannerSkip',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: {
				banSkipurl,
				banType
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取艺考动态列表数据
export function getyikaoDongtaiList() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getIndexArtexamdynamic',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//艺考动态列表搜索
export function getmoreList1(aedTitle, sousuoTyoe, currentPage, pageSize) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getArtexamdynamicList',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: {
				"ssTile": aedTitle,
				"sousuoTyoe": sousuoTyoe,
				"currentPage": currentPage,
				"pageSize": pageSize
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取艺考课程列表数据
export function getyikaoKechengList() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getArtExams',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取艺考课程列表数据
export function getyikaoKechengList_one(id) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getArtExamDetail',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			data: {
				id: id
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取艺考题库列表数据
export function getyikaoTikuList() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/exam/list',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取艺考题库列表数据,创建考试试卷
export function getyikaoTikuList_one(id) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/exam/create',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			data: {
				paperId: id,
				userId: 1
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取试卷id，获取考试所有题目
export function getyikaoTikuList_one_all(paper_id) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/qu/' + paper_id,
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			// data:{
			// 	paperId:id,
			// 	userId:1
			// },
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取艺考题库列表数据,创建考试试卷,获取下一题
export function getyikaoTikuList_one_one(quId) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/qu/' + quId,
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			// data:{
			// 	paperId:id,
			// 	userId:1
			// },
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}



//艺考动态列表查看更多
export function getmoreList(sousuoTyoe, currentPage, pageSize) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getArtexamdynamicList',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: {
				"sousuoTyoe": sousuoTyoe,
				"currentPage": currentPage,
				"pageSize": pageSize,
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}


//艺考动态列表,点击艺考动态列表的某一项
export function getyikaoDongtaiList_one(id) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getArtexamdynamic',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: {
				"id": id,
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取问学习，测试题
export function getWenxuexiTestList(id) {

	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/qlearn/' + id,
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取问学习，获取测试结果
export function getWenxuexiResuleList(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askStudy/getReportByAskStudy',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取问录取字段
export function getWenluquZiduan() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getAskAdmit',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			// data:datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//问录取，查询省份
export function getWenluquShengfeng() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getProvinces',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			// data:datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//问录取，通过输入学校获取专业
export function getZhuanhye(acName) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getAcademys?acName=' + acName,
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			// data:datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 查询用户课程评论列表
export function getCountComment(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/ht/comment/parent',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 查询二级评论
export function getCommentChildren(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/ht/comment/children',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//问报考 推荐学校名称
export function getWenbaokaoList(datas) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getLuQuBaoKaoAcademy',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}


// 问报考，获取关注学校
export function getSaveSchool(userOpenid) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/se/wx/saveSchool?userOpenid=' + userOpenid,
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			// data:datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//问录取，输入出概率结果
export function getWenluquList(datas) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getProbability3',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 艺考课程点赞(需要传用户openid与艺考课程id)
export function getLikeCountAdd(datas) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/likeArtExam',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 评论点赞 传入用户openid(字段likecount)与评论id(commentId)
export function addCommentLike(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/comment/likeComment',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 艺考课程收藏(需要传用户openid与艺考课程id)
export function addCollect(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/collArtExam',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 查看该课程该用户是否点赞收藏过
export function getLikeInfo(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/getUserIslikeAadColl',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 新增用户课程评论
export function addCourseComment(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/ht/comment',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//意见反馈接口
export function Yijianfankui(opOpenid, opContent, opType, opImg1, opImg2, opImg3) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/opinionFeedbackAndtupian',
			method: 'POST',
			data: {
				opOpenid,
				opContent,
				opType,
				opImg1,
				opImg2,
				opImg3
			},
			dataType: 'json', // 返回数据格式
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//获取用户openid方法封装
export function hasOpenid() {
	const openid = uni.getStorageSync('openid');
	if (openid === '') {
		return false
	} else {
		return openid
	}
}
//查询用户信息

export function getMemberInfo() {
	const openid = uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/selectUser',
			method: 'POST',
			data: {
				openid
			},
			success(res) {
				resolve(res.data)
			},
			fail(res) {
				console.log(res);
			}
		})
	})
}

// 问学习
export function getAskStudy() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askStudy/getAskStudy',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 获取答题纪律
export function getAskStudyRecord(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askStudy/getAskStudyRecord',
			method: 'POST',
			data: data,
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//上传图片接口

export function uploadPicture(filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: urls + '/hxg/upFile',
			filePath,
			name: 'file',
			success: (res) => {
				resolve(res)
			},
			fail(res) {
				reject(res)
			}
		})
	})
}

// 折线图
export function getReportByAskStudyCurve(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askStudy/getReportByAskStudyCurve',
			method: 'POST',
			data: data,
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}



// 问校考答题
export function getEnrollList() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/se/wx/list',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//问校考答题记录
export function getEnrollAnswers(openid) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/se/wx/userInfo',
			method: 'GET',
			contentType: 'application/json;charset=UTF-8',
			data: openid,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}
// 问校考提交答案
export function postEnrollAnswes(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/se/wx/userInfo',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 问校考保存学校
export function saveSchool(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/se/wx/saveSchool',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 问校考删除保存学校
export function deleteSchool(id) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/se/' + uni.getStorageSync('openid') + '/' + id ,
			method: 'DELETE',
			contentType: 'application/json;charset=UTF-8',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}


// 问录取，问概率输入学校名模糊查询学校
export function getSchoolName(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askLuqu/getAcademyByNameForAcademyLike',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 问录取，问概率输入学校名精确查询学校，获取专业
export function getMajorName(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askLuqu/getAcademyByNameForSure',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 问录取，问概率
export function getAskLuquProb(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askLuqu/getAskLuquProb',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 问录取，问报考
export function getAskLuquBaokao(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askLuqu/getAskLuquBaokao',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 问录取，问概率记录
export function getHistoryForUser(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/askLuqu/getHistoryForUser',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}
