var sund3r = {
	document: {
		//add CDN Repos?
		body: function(){return document.body},
		head: function(){return document.head},
		appendAll: function(parent, domSet){
			parent.innerHTML = '';
			for(e in domSet){
				parent.appendChild(domSet[e]);
			}
		},
		append: function(parent, e){
			parent.appendChild(e);
		}
	},
	html: {
		generate: function(tag, text){
				var tag = document.createElement(tag);
				if (text!==undefined && typeof text === "string"){
					tag.innerHTML = text;
				}
				return tag;
			}
	},
	svg: {

	}
};