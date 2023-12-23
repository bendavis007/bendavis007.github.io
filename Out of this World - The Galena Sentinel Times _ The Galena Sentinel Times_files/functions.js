function initFacebook(appId, channelUrl, getPhotos) {
	window.fbAsyncInit = function() {
		FB.init({
			appId: appId,
			channelUrl: channelUrl,
			cookie: true,
			xfbml: true,
			oauth: true
		});
		
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			if(response.status === 'connected')
		    	runApp();
			else if(response.status === 'not_authorized')
		    	FB.login();
			else
		    	FB.login();
		});
		
		if(true) {
			$('.facebookGallery').each(function() {
				var thePhotos = $(this).html();
				var photosFQL = encodeURIComponent('SELECT src_height, src_width, src, src_big FROM photo WHERE object_id IN (' + thePhotos + ')');
				var $gallery = $(this);
				var theGalID = $(this).attr('data-gallery-id');
				
				FB.api('/fql?q=' + photosFQL, function(photos) {
					$gallery.html('').show();
					
					$.each(photos.data, function(index, value) {
						var marginTop = -1*(value.src_height/2);
						var marginLeft = -1*(value.src_width/2);
						
						$gallery.append("<li><a href='" + value.src_big + "' rel='" + theGalID + "'><img src='" + value.src_big + "' style='margin-top: " + marginTop + "px; margin-left: " + marginLeft + "px;'></a></li>");
					});
				});
			});
		}
	};
	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));
	
	function runApp() {
		$('.token').html(FB.getAuthResponse()['accessToken']);
		$('.loginButton').hide();
		
		FB.api('/me', function(response) {
			$('.albumSelector').append('<option value="' + response.id + '">' + response.name + '</option>');
		});
		
		FB.api('/me/accounts', function(response) {
			for(var i = 0; i < response['data'].length; i++) {
				$('.albumSelector').append('<option value="' + response['data'][i].id + '">' + response['data'][i].name + '</option>');
			}
		});
	}
}

var $ = jQuery;

$(document).on('click', '.images li', function() {
	var myLoop = $('.images li');
	
	if(event.shiftKey) {
		var theIndex = $(this).index();
		var anySelected = -1;
		
		myLoop.each(function() {
			if($(this).hasClass('selected'))
				anySelected = $(this).index();
		});
		
		if(anySelected != -1) {
			myLoop.each(function() {
				var myIndex = $(this).index();
				if((myIndex >= theIndex && myIndex <= anySelected) || (myIndex <= theIndex && myIndex >= anySelected))
					$(this).addClass('selected');
			});
		}
		else
			$(this).addClass('selected');
	}
	else {
		$(this).toggleClass('selected');
	}
	
	var $newGal = $('.theNewGallery');
	var newGalVal = $newGal.val();
	var temp = new Array();
	
	myLoop.each(function() {
		if($(this).hasClass('selected'))
			temp.push($(this).attr('data-photoid'));
	});
	
	newGalVal = temp.join();
	
	if(newGalVal.charAt(0) == ",")
		newGalVal = newGalVal.substr(1);
	
	$newGal.val(newGalVal);
});

$(document).on('change', '.albumSelector', function() {
	var theValue = $(this).val();
	var accessToken = $('.token').text();
	var $photos = $('.photos');
	
	$('.theNewGallery').val('');
	$('.createGalleryHold').addClass('hidden');
	$photos.fadeOut(250).html("").append('<ul class="images">');
	
	var $images = $photos.find('.images');
	var albumFQL = encodeURIComponent('SELECT object_id FROM album WHERE owner = "' + theValue + '" ORDER BY created DESC LIMIT 0,20');
	
	FB.api('/fql?q=' + albumFQL + '&access_token=' + accessToken, function(albums) {
		console.log(albums);
		$.each(albums.data, function(index, value) {
			var photoFQL = encodeURIComponent('SELECT src_height, src_width, object_id, src FROM photo WHERE album_object_id = "' + value.object_id + '" ORDER BY created DESC LIMIT 0,200');
			
			FB.api('/fql?q=' + photoFQL + '&access_token=' + accessToken, function(photos) {
				console.log(photos);
				$.each(photos.data, function(index, value) {
					var ratio = value.src_height/value.src_width;
					
					if(ratio < 1) {
						var marginTop = (130-(ratio*130))/2;
						$images.append("<li data-photoID='" + value.object_id + "'><img src='" + value.src + "' style='margin-top: " + marginTop + "px;' alt='" + value.name + "'></li>");
					}
					else
						$images.append("<li data-photoID='" + value.object_id + "'><img src='" + value.src + "' alt='" + value.name + "'></li>");
				});
			});
		});
	});
	
	$photos.append('</ul>').fadeIn(250, function() {
		$('.createGalleryHold.hidden').removeClass('hidden');
	});
});

var deselect = true;

$(document).on('click', '.selDesel', function() {
	var $newGal = $('.theNewGallery');
	var newGalVal = $newGal.val();
	var temp = new Array();
	
	if(deselect) {
		$('.images li').each(function() {
			deselect = false;
			$(this).addClass('selected');
			temp.push($(this).attr('data-photoid'));
		});
	}
	else {
		$('.images li').each(function() {
			deselect = true;
			$(this).removeClass('selected');
			temp.pop();
		});
	}
	
	newGalVal = temp.join();
	
	if(newGalVal.charAt(0) == ",")
		newGalVal = newGalVal.substr(1);
	
	$newGal.val(newGalVal);
	
	event.preventDefault();
});