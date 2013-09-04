/*sunder should know what elements you have and render them
need to make the context of objects dynamically figure out where they are so they can properly handle events
*/

sund3r.demo = {
	demoElements: {
		example: sund3r.html.generate("p","Here's an example:")
	},
	elements: {
		form: function(){
			var form = sund3r.html.generate("form");
			return form;
		},
		innerText: function(){
			var input = sund3r.html.generate("input");
			input.type = "text";
			input.name = "inner_text";
			return input;
		},
		select: function(opts){
			var items = sund3r.html.generate("select");
			items.name = "elements";
			for(opt in opts){
				items.appendChild(sund3r.html.generate("option",opt));
			}
			items.onchange = function(e){
				// console.log(e.target.value);
				var form = e.target.parentElement;
				form["inner_text"].value = sund3r.demo.demoElements[e.target.value].innerHTML;
			}
			return items;
		},
		input: function(){
			var input = sund3r.html.generate("input");
			input.type = "text";
			input.name = "tag_name";
			return input;
		},
		submitButton: function(){
			var submit = sund3r.html.generate("button");
			submit.innerHTML = "Generate Tag";
			return submit;
		},
		submit: function(e){
			var tag = e.target["tag_name"].value;
			var text = e.target["inner_text"].value;
			alert(tag);
			if(sund3r.demo.demoElements.hasOwnProperty(tag)){
				alert("hey");
				sund3r.demo.demoElements[tag] = text;
			}
			else{
				sund3r.demo.demoElements[tag] = sund3r.html.generate(tag,text);
			}

			e.target["tag_name"].value = '';
			e.target["elements"].innerHTML = "";
			var opts = sund3r.demo.demoElements;
			for(opt in opts){
				e.target["elements"].appendChild(sund3r.html.generate("option",opt));
			};
			console.log(sund3r.demo.demoElements);

			return false;
		},
		render: function(){
			var form = sund3r.demo.elements.form();
			form.onsubmit = sund3r.demo.elements.submit;
			form.appendChild(sund3r.demo.elements.select(sund3r.demo.demoElements));
			form.appendChild(sund3r.demo.elements.innerText());
			form.appendChild(sund3r.demo.elements.input());
			form.appendChild(sund3r.demo.elements.submitButton());
			var text = sund3r.demo.demoElements[form["elements"].value].innerHTML;
			form["inner_text"].value = text;
			return form;
		}

	}
}

window.onload=function(){
	sund3r.homepage={};
	var generate = sund3r.html.generate;
	page = sund3r.homepage;
	page.title = generate("h1","sund3r");
	page.intro = generate("p","This project is an experiment to create object oriented HTML.  We're wrapping HTML elements in JavaScript so that we can build more complicated objects out of simpler ones.");
	exampleButton = generate("button","Example");
	exampleButton.onclick = function(){
		example = {
			text: generate("p","Here's an example:"),
			form: sund3r.demo.elements.render()
		};
		page.example = example;

		sund3r.document.append(sund3r.document.body(),page.example.text);
		sund3r.document.append(sund3r.document.body(),page.example.form);

	}
	page.exampleButton = exampleButton;
	sund3r.document.appendAll(sund3r.document.body(),page);
}