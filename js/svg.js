(function() {

	var
	svg = {
		version: "1.0",
		createElement: function(type, attr) {
			var
			shapeMap = {
				"circle": "circle",
				"ellipse": "ellipse",
				"line": "line",
				"polygon": "polygon",
				"square": "rect",
				"polyline": "polyline",
				"path": "path",
				"svg": "svg",
				"rect": "rect",
				"feBlend": "feBlend",
				"feColorMatrix": "feColorMatrix",
				"feComponentTransfer": "feComponentTransfer",
				"feComposite": "feComposite",
				"feConvolveMatrix": "feConvolveMatrix",
				"feDiffuseLighting": "feDiffuseLighting",
				"feDisplacementMap": "feDisplacementMap",
				"feFlood": "feFlood",
				"feGaussianBlur": "feGaussianBlur",
				"feImage": "feImage",
				"feMerge": "feMerge",
				"feMorphology": "feMorphology",
				"feOffset": "feOffset",
				"feSpecularLighting": "feSpecularLighting",
				"feTile": "feTile",
				"feTurbulence": "feTurbulence",
				"feDistantLight": "feDistantLight",
				"fePointLight": "fePointLight",
				"feSpotLight": "feSpotLight",
				"blend": "feBlend",
				"colorMatrix": "feColorMatrix",
				"componentTransfer": "feComponentTransfer",
				"composite": "feComposite",
				"convolveMatrix": "feConvolveMatrix",
				"diffuseLighting": "feDiffuseLighting",
				"displacementMap": "feDisplacementMap",
				"flood": "feFlood",
				"gaussianBlur": "feGaussianBlur",
				"image": "feImage",
				"merge": "feMerge",
				"morphology": "feMorphology",
				"offset": "feOffset",
				"specularLighting": "feSpecularLighting",
				"tile": "feTile",
				"turbulence": "feTurbulence",
				"distantLight": "feDistantLight",
				"pointLight": "fePointLight",
				"spotLight": "feSpotLight",
				"filter": "filter",
				"defs": "defs",
				"linearGradient": "linearGradient",
				"radialGradient": "radialGradient",
				"linear": "linearGradient",
				"radial": "radialGradient",
				"stop": "stop",
				"text": "text",
				"group": "g"
			},
			svgElement = document.createElementNS("http://www.w3.org/2000/svg", shapeMap[type]);

			for(var x in attr) {
				if(type==="square" && x==="r") {
					svgElement.setAttribute("width", attr[x]);
					svgElement.setAttribute("height", attr[x]);
				}
				else {
					svgElement.setAttribute(x, attr[x]);
				};
			};
			return svgElement;
		},
		appendTo: function(elm, toAppendTo) {
			if(elm.length) {
				for(var p in elm) {
					toAppendTo.appendChild(elm[p]);
				};
			}
			else {
				toAppendTo.appendChild(elm);
			};
			return toAppendTo;
		},
		applyFilter: function(toApplyTo, idOfFilterToApply) {
			toApplyTo.style.setProperty("filter", "url(#" + idOfFilterToApply +  ")", null);
		},
		create: {
			stop: function(attr) {
				return svg.createElement("stop", attr);
			},
			circle: function(attr) {
				return svg.createElement("circle", attr);
			},
			ellipse: function(attr) {
				return svg.createElement("ellipse", attr);
			},
			line: function(attr) {
				return svg.createElement("line", attr);
			},
			polygon: function(attr) {
				return svg.createElement("polygon", attr);
			},
			square: function(attr) {
				return svg.createElement("square", attr);
			},
			polyline: function(attr) {
				return svg.createElement("polyline", attr);
			},
			group: function(attr) {
				return svg.createElement("group", attr);
			},
			path: function(attr) {
				return svg.createElement("path", attr);
			},
			stage: function(attr) {

				var
				wrap = document.createElement("div"),
				stage = svg.createElement("svg", attr);
				stage.svg = {
					defsElement: svg.createElement("defs")
				};
				svg.appendTo(stage.svg.defsElement, stage);
				return stage;

			},
			rect: function(attr) {

				return svg.createElement("rect", attr);

			},
			filter: function(stage, type, attr, id) {

				var filter = svg.createElement("filter", {"id": id});
				svg.appendTo(svg.createElement(type, attr), filter);
				svg.appendTo(filter, stage.svg.defsElement);

			},
			gradient: function(stage, type, stops, id) {

				var gradient = svg.createElement(type, {"id":id});
				for(var i=0;i<stops.length;i++) {
					svg.appendTo(stops[i], gradient);
				};
				svg.appendTo(gradient, stage.svg.defsElement);

			},
			textBox: function(value, width, height, x, y, backgroundColor, borderColor, strokeWidth, borderRadius) {

				var
				grouper = svg.create.stage({x:x, y:y}),
				border = svg.create.rect({width:width, height:height, style:"fill:" + backgroundColor +  "; stroke:" + borderColor + "; stroke-width:" + strokeWidth, x:strokeWidth, y:strokeWidth, rx:borderRadius, ry:borderRadius}),
				//text = svg.create.text({fill:"black", x:10, y:15, "font-family":"Verdana", "font-size":12, onclick:"editText(evt)"}),
				text = document.createElement("input");
				text.setAttribute("type", "text");
				//text.textContent = value;

				svg.appendTo([border, text], grouper);

				return grouper;

			},
			text: function(attr) {

				return svg.createElement("text", attr);

			}
		}

	};

	window.svg = svg;

})();
