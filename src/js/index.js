(function (document) {
	var isBusy = false
	var prevDirection = 's'
	var isKeyPressed = false

	var b = '[d]'
	var c = 'click'
	var keyMap = {
		'ArrowUp': 'f',
		'ArrowDown': 'b',
		'ArrowLeft': 'l',
		'ArrowRight': 'r',
		' ': 's',
	}

	function emptyFunction () {

	}

	function r (direction, cbBefore, cbComplete) {
		cbBefore = cbBefore || emptyFunction
		cbComplete = cbComplete || emptyFunction

		cbBefore()

		isBusy = true

		$.ajax({
			url: direction,
			complete: function () {
				isBusy = false

				cbComplete()
			}
		})
	}

	$(b).each(function (_, v) {
		v = $(v)

		v.mousedown(c, function () {
			r(v.attr('d'))
		})

		v.mouseup(c, function () {
			r('s', null, function () {
				prevDirection = 's'
			})
		})
	})

	$(document).keydown(function (e) {
		var d = keyMap[e.key]

		if (!isKeyPressed && !isBusy) {
			prevDirection = d

			r(d, function () {
				$(b + '[d="' + d + '"]').addClass('a')

				isKeyPressed = true
			})
		}
	})

	$(document).keyup(function (e) {
		r('s', function () {
			$(b + '[d="' + prevDirection + '"]').removeClass('a')
		}, function () {
			prevDirection = 's'

			isKeyPressed = false
		})
	})
})(document)