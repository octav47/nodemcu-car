(function (document) {
	var isBusy = false
	var prevDirection = 's'

	var b = 'button'
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
				setTimeout(function () {
					isBusy = false

					cbComplete()
				}, 1000)
				// isBusy = false
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

		if (!isBusy && prevDirection !== d) {
			prevDirection = d

			r(d, function () {
				$(b + '[d="' + d + '"]').addClass('a')
			})
		}
	})

	$(document).keyup(function (e) {
		r('s', function () {
			$(b + '[d="' + prevDirection + '"]').removeClass('a')
		}, function () {
			prevDirection = 's'
		})
	})
})(document)