(function(window, document, $, undefined){

	var imageFilenames = ["dsc_6001.jpg", "dsc_6081.jpg", "dsc_6013.jpg", "dsc_6268.jpg", "dsc_6397.jpg", "dsc_6345.jpg", "dsc_6378.jpg", "dsc_6413.jpg", "dsc_6417.jpg"],
		dragSourceElement;


	function loadImageElements(){

		$.each(imageFilenames, function(index, image){
			var imageElement = $('<img/>').attr('class', 'col-4 s-padding round-10').attr('src', 'assets/images/' + image)
				.attr('draggable', 'true').attr('alt', 'Image #' + (index + 1));
		
			if(index < 3)
				$('#row-one').append(imageElement);

			else if( 3 <= index < 6)
				$('#row-two').append(imageElement);

			else
				$('#row-three').append(imageElement);


		});
	}

	function dragStartHandler(e){
		this.style.opacity = .4;

		dragSourceElement = this;

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/uri-list', this.src);

	}

	function dragEndHandler(e){
		this.style.opacity = 1;

		var images = document.querySelectorAll('img');

		[].forEach.call(images, function(image){
			image.classList.remove('over');
		});
	}

	function dragOverHandler(e){
		if(e.preventDefault){
			e.preventDefault();
		}

		e.dataTransfer.dropEffect = 'move';

		return false;
	}

	function dragEnterHandler(e){
		e.preventDefault();
		this.classList.add('over');
	}

	function dragLeaveHandler(e){
		this.classList.remove('over');
	}

	function dropHandler(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}

		if(dragSourceElement != this){

			dragSourceElement.src = this.src;
			this.src = e.dataTransfer.getData('text/uri-list');
		}

		return false;
	}

	window.onload = function(){
		loadImageElements();

		var images = document.querySelectorAll('img');
		[].forEach.call( images, function(image){
			image.addEventListener('dragstart', dragStartHandler, false);
			image.addEventListener('dragover', dragOverHandler, false);
			image.addEventListener('dragenter', dragEnterHandler, false);
			image.addEventListener('dragleave', dragLeaveHandler, false);
			image.addEventListener('drop', dropHandler, false);
			image.addEventListener('dragend', dragEndHandler, false);
		})
	};

})(window, document, jQuery);