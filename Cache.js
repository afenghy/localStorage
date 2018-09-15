/***
 * cache.js 
 * Author by:kevin
 * Email: afenghy@qq.com
*/

;(function(win){
	var timestr = new Date().getTime();
	var daytime = 24*60*60*1000;
	function init(name,tags,days){
		var expires = parseInt(timestr)+(daytime*days);
		var nameArr = {};
		var tagsArr = {};
		var that = this;

		this.name=name;
		this.exp=expires;
		this.tags=tags;
		//初始化
		this.each(function(res){
			if(timestr > res.exp){
				that.remove(res.name);
			}else{
				nameArr[res.name] = res;
			}
		});
		this.keys=nameArr;
	}
	//方法
	init.prototype = {
		//设置过期天数
		days:function(exp){
			if(exp)this.exp=timestr+(daytime*exp);
			return this;
		},
		//设置Tag
		tag:function(tags){
			if(tags)this.tags=tags;
			return this;
		},
		//设置值
		set:function(value){
			this.remove(this.name);
			var rename='{cache:'+this.name+';exp:'+this.exp+';'+(this.tags?'tag:'+this.tags+';':'')+'}';
			localStorage.setItem(rename,value);
				console.log('delete:',rename);
			return this;
		},
		//删除单条
		remove:function(nms){
			var nms=nms||this.name;
			if(this.keys && this.keys[nms]){
				localStorage.removeItem(this.keys[nms]['key']);
				console.log('delete:',this.keys[nms]['key']);
			}
			return this;
		},
		//清除
		clear:function(tags){
			tags=tags||this.tags;
			for(k in this.keys){
				var item=this.keys[k];
				if(tags == undefined || tags == item['tag']){
					this.remove(item['name']);
				}
			}
		},
		//遍历Name
		each:function(callback){
			for(var i=0; i<localStorage.length; i++){
				var key=localStorage.key(i),reg=/^\{cache:(.+?)\}$/g;
				if(reg.test(key)){
					var name=key.match(/cache:(.+?);/);
					var exp=key.match(/exp:(.+?);/);
					var tag=key.match(/tag:(.+?);/);
					callback({name:name[1],exp:exp[1],tag:tag?tag[1]:'',key:key});
				}
			}
		}
	}

	win.cache=function(name,tags,days=365){
		return new init(name,tags,days);
	}
}(window));
